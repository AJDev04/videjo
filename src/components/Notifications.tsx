import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

const NotifyContext = createContext<(message: string, type?: ToastType) => void>(
  () => {},
);

export const useNotify = () => useContext(NotifyContext);

const KEYFRAMES = `
@keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
@keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
`;

const bgFor = (type: ToastType) =>
  type === "success"
    ? "var(--color-web)"
    : type === "error"
      ? "var(--color-motion)"
      : "var(--color-primary)";

/**
 * Toast-notificaties — port van showNotification() uit legacy/js/scripts.js.
 * Eén toast tegelijk, auto-sluit na 5s, met dezelfde kleuren en slideIn/Out.
 */
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const autoTimer = useRef<ReturnType<typeof setTimeout>>();

  const close = useCallback(() => {
    setClosing(true);
    closeTimer.current = setTimeout(() => setToast(null), 300);
  }, []);

  const notify = useCallback(
    (message: string, type: ToastType = "info") => {
      clearTimeout(closeTimer.current);
      clearTimeout(autoTimer.current);
      setClosing(false);
      setToast({ id: Date.now(), message, type });
    },
    [],
  );

  useEffect(() => {
    if (!toast) return;
    autoTimer.current = setTimeout(close, 5000);
    return () => clearTimeout(autoTimer.current);
  }, [toast, close]);

  const style: CSSProperties = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    maxWidth: "400px",
    padding: "1rem 1.5rem",
    backgroundColor: toast ? bgFor(toast.type) : undefined,
    color: "var(--color-cream)",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    zIndex: 999,
    animation: `${closing ? "slideOut" : "slideIn"} 0.3s ease${closing ? " forwards" : ""}`,
  };

  return (
    <NotifyContext.Provider value={notify}>
      {children}
      <style>{KEYFRAMES}</style>
      {toast && (
        <div className={`notification notification-${toast.type}`} style={style}>
          <span className="notification-message">{toast.message}</span>
          <button
            className="notification-close"
            onClick={close}
            style={{
              background: "none",
              border: "none",
              color: "inherit",
              fontSize: "1.5rem",
              cursor: "pointer",
              opacity: 0.7,
              transition: "opacity 0.3s",
            }}
          >
            &times;
          </button>
        </div>
      )}
    </NotifyContext.Provider>
  );
}
