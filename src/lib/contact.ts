import emailjs from "@emailjs/browser";

const PUBLIC_KEY = "wUePWDWhK8hurRVcU";
const SERVICE_ID = "service_p1xcqar";
const TEMPLATE_ID = "template_rfqih28";

let initialized = false;

export function initEmailJs() {
  if (!initialized) {
    emailjs.init(PUBLIC_KEY);
    initialized = true;
  }
}

export interface ContactData {
  name: string;
  company: string;
  email: string;
  message: string;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function sendContact(data: ContactData) {
  initEmailJs();
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, {
    to_email: "info@videjo.be",
    name: data.name,
    company: data.company || "Niet opgegeven",
    email: data.email,
    message: data.message,
  });
}
