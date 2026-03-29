/**
 * VIDEJO Drone 3D Scene
 * Interactive Three.js scene with scroll-based animations
 */

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

(function () {
	"use strict";

	let scene, camera, renderer, drone;
	let scrollProgress = 0;
	let targetRotationY = 0,
		targetRotationX = 0;
	let targetPositionY = 0,
		targetPositionX = 0;
	let targetScale = 1;
	let isLoaded = false;
	let propellers = [];

	const settings = {
		rotationSpeed: 0.08,
		positionSpeed: 0.06,
		scaleSpeed: 0.05, // Change this from 0 to 0.05 (or 0.1 for faster popping)
		floatAmplitude: 0.15,
		floatSpeed: 0.001,
		propellerSpeed: 0,
	};

	function init() {
		const canvas = document.getElementById("motion-canvas");
		if (!canvas) return;

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(
			45,
			window.innerWidth / window.innerHeight,
			0.01,
			1000,
		);
		camera.position.set(0, 0, 5);

		renderer = new THREE.WebGLRenderer({
			canvas,
			antialias: true,
			alpha: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.5;

		setupLighting();
		loadDroneModel();

		window.addEventListener("resize", onWindowResize);
		window.addEventListener("scroll", onScroll);

		animate();
	}

	function setupLighting() {
		scene.add(new THREE.AmbientLight(0xffffff, 1.0));

		const key = new THREE.DirectionalLight(0xffffff, 2.0);
		key.position.set(5, 5, 5);
		scene.add(key);

		const fill = new THREE.DirectionalLight(0x3974b7, 1.0);
		fill.position.set(-5, 0, 5);
		scene.add(fill);

		const back = new THREE.DirectionalLight(0xfaf8ce, 0.8);
		back.position.set(0, 5, -5);
		scene.add(back);

		const bottom = new THREE.DirectionalLight(0xffffff, 0.5);
		bottom.position.set(0, -5, 2);
		scene.add(bottom);

		const accent = new THREE.PointLight(0x3974b7, 1.0, 20);
		accent.position.set(2, -2, 3);
		scene.add(accent);
	}

	function loadDroneModel() {
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath(
			"https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/libs/draco/",
		);

		const loader = new GLTFLoader();
		loader.setDRACOLoader(dracoLoader);

		loader.load(
			"../models/macbook.glb",
			function (gltf) {
				drone = gltf.scene;

				// CRITICAL FIX: The model root has a 90deg X rotation baked in via quaternion.
				// Reset it so the drone sits upright and faces the camera.
				drone.quaternion.set(0, 0, 0, 1);
				drone.rotation.y = 3.14; // ← change this

				// Auto-fit model to scene
				const box = new THREE.Box3().setFromObject(drone);
				const size = box.getSize(new THREE.Vector3());
				const maxDim = Math.max(size.x, size.y, size.z);
				const scaleFactor = 2.0 / maxDim;
				drone.scale.setScalar(0);
				targetScale = 0; // Initialize targetScale at 0
				// Re-center after scaling
				const scaledBox = new THREE.Box3().setFromObject(drone);
				const center = scaledBox.getCenter(new THREE.Vector3());
				drone.position.sub(center);

				// Starting position
				drone.position.x = 1.5;
				drone.rotation.y = 3.14; // ← change this to match currentRotY

				// Find propellers — this model names them boli01-05
				drone.traverse(function (child) {
					if (child.isMesh) {
						child.castShadow = true;
						child.receiveShadow = true;
						const name = child.name.toLowerCase();
						if (
							name.startsWith("boli") ||
							name.includes("propeller") ||
							name.includes("rotor") ||
							name.includes("prop")
						) {
							propellers.push(child);
						}
					}
				});

				scene.add(drone);
				isLoaded = true;
				console.log("✅ Drone loaded! Propellers:", propellers.length);
			},
			function (xhr) {
				if (xhr.total > 0)
					console.log(((xhr.loaded / xhr.total) * 100).toFixed(1) + "% loaded");
			},
			function (error) {
				console.error("❌ Failed to load drone.glb:", error);
				console.warn(
					"Are you running a local server? Browsers block .glb from file:// — use VS Code Live Server or similar.",
				);
				createPlaceholderDrone();
			},
		);
	}

	function createPlaceholderDrone() {
		const bMat = new THREE.MeshStandardMaterial({
			color: 0x333333,
			metalness: 0.7,
			roughness: 0.3,
		});
		const pMat = new THREE.MeshStandardMaterial({
			color: 0x666666,
			metalness: 0.5,
			roughness: 0.5,
		});

		drone = new THREE.Group();
		drone.add(new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.5), bMat));

		const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 0.05), bMat);
		arm1.rotation.y = Math.PI / 4;
		drone.add(arm1);
		const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.05, 0.05), bMat);
		arm2.rotation.y = -Math.PI / 4;
		drone.add(arm2);

		[
			{ x: 0.35, z: 0.35 },
			{ x: -0.35, z: 0.35 },
			{ x: 0.35, z: -0.35 },
			{ x: -0.35, z: -0.35 },
		].forEach((pos) => {
			const prop = new THREE.Mesh(
				new THREE.CylinderGeometry(0.15, 0.15, 0.02, 16),
				pMat,
			);
			prop.position.set(pos.x, 0.08, pos.z);
			propellers.push(prop);
			drone.add(prop);
		});

		drone.scale.set(2, 2, 2);
		drone.position.set(1.5, 0, 0);
		drone.rotation.set(-0.5, 3.14, 0); // ← change this to match currentRotY
		scene.add(drone);
		isLoaded = true;
	}

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function onScroll() {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		const docHeight =
			document.documentElement.scrollHeight - window.innerHeight;
		scrollProgress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
		updateTargetValues();
	}

	function updateTargetValues() {
		// Phase 1: 0% to 20% scroll - Appearance Phase
		if (scrollProgress < 0.39) {
			// 'p' goes from 0 to 1 as you scroll the first 20%
			const p = scrollProgress / 0.39;

			targetScale = p * 0; // Scales from 0 to 1.0
			targetPositionX = 1.5; // Stays on the right
			targetPositionY = p * 0.5; // Rises slightly
			targetRotationY = 3.14 + (p * Math.PI) / 4; // Gentle turn
			targetRotationX = 0;
		}
		// Phase 2: 20% to 40% scroll - Move to Left

		// ... keep your other else-if blocks for the rest of the scroll
		else if (scrollProgress < 0.4) {
			// 'p' goes from 0 to 1 as you scroll the first 20%
			const p = scrollProgress / 0.4;

			targetScale = p * 0.05; // Scales from 0 to 1.0
			targetPositionX = 2.5; // Stays on the right
			targetPositionY = -0.5; // Rises slightly
			targetRotationY = 0.3; // Gentle turn
			targetRotationX = 0.8;
		}
		// Phase 2: 20% to 40% scroll - Move to Left

		// ... keep your other else-if blocks for the rest of the scroll
		else if (scrollProgress < 0.6) {
			const p = scrollProgress - 0.6;
			targetPositionX = 2.5;
			targetPositionY = -0.5;
			targetRotationY = 0.3;
			targetRotationX = 0.8;
			targetScale = 0.05;
		} else if (scrollProgress < 0.7) {
			const p = scrollProgress - 0.7;
			targetPositionX = -3;
			targetPositionY = 0;
			targetRotationY = 4;
			targetRotationX = -0.3 + p * 0.3;
			targetScale = 0.02;
		} else if (scrollProgress < 0.9) {
			const p = scrollProgress - 0.9;
			targetPositionX = -3;
			targetPositionY = 0;
			targetRotationY = 4;
			targetRotationX = -0.3 + p * 0.3;
			targetScale = 0.02;
		} else if (scrollProgress < 1.2) {
			const p = scrollProgress - 1.2;
			targetPositionX = 2.5;
			targetPositionY = 0.5;
			targetRotationY = 2.3;
			targetRotationX = -0.3 + p * 0.3;

			targetScale = 0.03;
		} else {
			const p = scrollProgress - 0.7;
			targetPositionX = 2.5;
			targetPositionY = 0.5;
			targetRotationY = 2.3;
			targetRotationX = -0.3 + p * 0.3;

			targetScale = 0.03;
		}
	}

	function animate() {
		requestAnimationFrame(animate);
		if (!isLoaded || !drone) return;

		const time = Date.now();

		drone.rotation.y +=
			(targetRotationY - drone.rotation.y) * settings.rotationSpeed;
		drone.rotation.x +=
			(targetRotationX - drone.rotation.x) * settings.rotationSpeed;

		const floatY =
			targetPositionY +
			Math.sin(time * settings.floatSpeed) * settings.floatAmplitude;
		drone.position.x +=
			(targetPositionX - drone.position.x) * settings.positionSpeed;
		drone.position.y += (floatY - drone.position.y) * settings.positionSpeed;

		const newScale =
			drone.scale.x + (targetScale - drone.scale.x) * settings.scaleSpeed;
		drone.scale.set(newScale, newScale, newScale);

		propellers.forEach((prop, i) => {
			prop.rotation.y += settings.propellerSpeed * (i % 2 === 0 ? 1 : -1);
		});

		const zTilt = (targetPositionX - drone.position.x) * 0.5;
		drone.rotation.z += (zTilt - drone.rotation.z) * 0.05;

		renderer.render(scene, camera);
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
