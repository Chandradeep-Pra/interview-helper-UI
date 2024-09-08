import React, { useEffect } from 'react';

const Starfield = (props) => {
	const {
		speedFactor = 0.05,
		backgroundColor = 'black',
		starColor = [255, 255, 255],
		starCount = 5000
	} = props;

	useEffect(() => {
		const canvas = document.getElementById('starfieldCanvas');

		if (canvas) {
			const context = canvas.getContext('2d');

			if (context) {
				let canvasWidth = window.innerWidth;
				let canvasHeight = window.innerHeight;

				const updateCanvasSize = () => {
					canvas.width = canvasWidth;
					canvas.height = canvasHeight;
				};

				updateCanvasSize();

				window.onresize = () => {
					canvasWidth = window.innerWidth;
					canvasHeight = window.innerHeight;
					updateCanvasSize();
				};

				const generateStars = (numStars) => {
					const starsArray = [];
					for (let i = 0; i < numStars; i++) {
						const star = {
							x: Math.random() * 1600 - 800,
							y: Math.random() * 900 - 450,
							z: Math.random() * 1000,
						};
						starsArray.push(star);
					}
					return starsArray;
				};

				let stars = generateStars(starCount);

				const clearCanvas = () => {
					context.fillStyle = backgroundColor;
					context.fillRect(0, 0, canvas.width, canvas.height);
				};

				const drawPixel = (x, y, intensity) => {
					const colorString =
						`rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, ${intensity})`;
					context.fillStyle = colorString;
					context.fillRect(x, y, 1, 1);
				};

				const updateStarPositions = (distanceTravelled) => {
					for (const star of stars) {
						star.z -= distanceTravelled;
						if (star.z <= 1) {
							star.z += 1000;
						}
					}
				};

				let previousTime;
				const animate = (currentTime) => {
					if (previousTime === undefined) {
						previousTime = currentTime;
					}

					const timeDelta = currentTime - previousTime;
					previousTime = currentTime;

					updateStarPositions(timeDelta * speedFactor);

					clearCanvas();

					const centerX = canvasWidth / 2;
					const centerY = canvasHeight / 2;

					for (const star of stars) {
						const screenX = centerX + star.x / (star.z * 0.001);
						const screenY = centerY + star.y / (star.z * 0.001);

						if (screenX >= 0 && screenX < canvasWidth && screenY >= 0 && screenY < canvasHeight) {
							const depthFactor = star.z / 1000.0;
							const brightness = 1 - depthFactor * depthFactor;

							drawPixel(screenX, screenY, brightness);
						}
					}

					requestAnimationFrame(animate);
				};

				requestAnimationFrame(animate);

				window.addEventListener('resize', () => {
					canvasWidth = window.innerWidth;
					canvasHeight = window.innerHeight;
					updateCanvasSize();
				});
			} else {
				console.error('Failed to get 2D context from canvas.');
			}
		} else {
			console.error('Canvas element with ID "starfieldCanvas" not found.');
		}

		return () => {
			window.onresize = null;
		};
	}, [starColor, backgroundColor, speedFactor, starCount]);

	return (
		<canvas
			id="starfieldCanvas"
			style={{
				padding: 0,
				margin: 0,
				position: 'fixed',
				top: 0,
				right: 0,
				bottom: 0,
				left: 0,
				zIndex: 10,
				opacity: 1,
				pointerEvents: 'none',
				mixBlendMode: 'screen',
			}}
		></canvas>
	);
}

export default Starfield;
