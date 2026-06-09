import { createScene } from "./scene-core.js";

createScene({
	canvasId: "film-canvas",
	modelPath: "../models/camera.glb",
	updateTargets(scrollProgress, t) {
		// Phase 1: 0% to 20% scroll - Appearance Phase
		if (scrollProgress < 0.39) {
			// 'p' goes from 0 to 1 as you scroll the first 20%
			const p = scrollProgress / 0.39;

			t.scale = p * 0; // Scales from 0 to 1.0
			t.positionX = 2.2; // Stays on the right
			t.positionY = p * 0.5; // Rises slightly
			t.rotationY = 3.14 + (p * Math.PI) / 4; // Gentle turn
			t.rotationX = 0;
		}
		// Phase 2: 20% to 40% scroll - Move to Left

		// ... keep your other else-if blocks for the rest of the scroll
		else if (scrollProgress < 0.4) {
			// 'p' goes from 0 to 1 as you scroll the first 20%
			const p = scrollProgress / 0.4;

			t.scale = 0.06; // Scales from 0 to 1.0
			t.positionX = 2.2; // Stays on the right
			t.positionY = p * 0.5; // Rises slightly
			t.rotationY = 3.14 + (p * Math.PI) / 4; // Gentle turn
			t.rotationX = 1;
		}
		// Phase 2: 20% to 40% scroll - Move to Left

		// ... keep your other else-if blocks for the rest of the scroll
		else if (scrollProgress < 0.6) {
			const p = scrollProgress - 0.6;
			t.scale = 0.06; // Scales from 0 to 1.0
			t.positionX = 2.2; // Stays on the right
			t.positionY = p * 0.5; // Rises slightly
			t.rotationY = 3.14 + (p * Math.PI) / 4; // Gentle turn
			t.rotationX = 1;
		} else if (scrollProgress < 0.7) {
			const p = scrollProgress - 0.7;
			t.positionX = -3;
			t.positionY = 0.5;
			t.rotationY = 1.4;
			t.rotationX = 0.3 + p * 0.3;
			t.scale = 0.03;
		} else if (scrollProgress < 0.9) {
			const p = scrollProgress - 0.9;
			t.positionX = -3;
			t.positionY = 0.5;
			t.rotationY = 1.4;
			t.rotationX = 0.3 + p * 0.3;
			t.scale = 0.03;
		} else if (scrollProgress < 1.2) {
			const p = scrollProgress - 1.2;
			t.positionX = 2.3;
			t.positionY = 0.6;
			t.rotationY = 2.3;
			t.rotationX = -0.3 + p * 0.3;
			t.scale = 0.05;
		} else {
			const p = scrollProgress - 0.7;
			t.positionX = 2.3;
			t.positionY = 0.6;
			t.rotationY = 2.3;
			t.rotationX = -0.3 + p * 0.3;
			t.scale = 0.05;
		}
	},
});
