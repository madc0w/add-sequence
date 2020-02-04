var maxIts = 8;
var seq;

var canvas, ctx, imageData, numItsSpan, numItsSlider, goButton, currIteration;
var isWorking = false;

function onLoad() {
	canvas = document.getElementById('output-canvas');
	ctx = canvas.getContext('2d');
	numItsSpan = document.getElementById('num-iterations-span');
	numItsSlider = document.getElementById('num-iterations-slider');
	goButton = document.getElementById('go-button');
	currIteration = document.getElementById('curr-iteration');

	numItsSlider.value = maxIts;
	document.getElementById('init-matrix-0-0').value = 0;
	document.getElementById('init-matrix-0-1').value = 1;
	document.getElementById('init-matrix-1-0').value = 1;
	document.getElementById('init-matrix-1-1').value = 1;
	numItsSliderChange();
}

function go() {
	initMatrix();
	goButton.disabled = true;
	var iteration = 0;
	const intervalId = setInterval(() => {
		if (iteration > maxIts) {
			clearInterval(intervalId);
			goButton.disabled = false;
			return;
		}
		if (isWorking) {
			return;
		}
		isWorking = true;
		currIteration.innerHTML = iteration;
		iteration++;

		// console.log('iteration ' + iteration);

		// horizonatal
		for (var i = 0; i < seq.length; i++) {
			const newSeqH = [];
			for (var j = 0; j < seq[i].length - 1; j++) {
				// if (seqH[j] == null || seqH[j + 1] == null) {
				// 	console.log(j, iteration);
				// }
				newSeqH.push(seq[i][j]);
				newSeqH.push(seq[i][j] + seq[i][j + 1]);
			}
			newSeqH.push(seq[i][j]);
			seq[i] = newSeqH;
		}

		// return;
		// console.log('after horizontal:');
		// displaySeq();

		// vertical
		const numRows = seq.length;
		for (var i = 0; i < seq[0].length; i++) {
			// if (seq[j][iteration] == null || seq[j + 1][iteration] == null) {
			// 	console.log(j, iteration);
			// }
			const newSeqV = [];
			for (var j = 0; j < numRows - 1; j++) {
				newSeqV.push(seq[j][i]);
				newSeqV.push(seq[j][i] + seq[j + 1][i]);
			}
			newSeqV.push(seq[j][i]);
			for (var j = 0; j < newSeqV.length; j++) {
				if (!seq[j]) {
					seq[j] = [];
				}
				// if (newSeqV[j] == null) {
				// 	console.log(j, iteration);
				// }
				seq[j][i] = newSeqV[j];
			}
		}

		// console.log('after vertical:');
		displaySeq();
		isWorking = false;
		// console.log('finished iteration ', iteration);
	}, 100);
}

function displaySeq() {
	var max = 0;
	for (var row in seq) {
		for (var col in seq[row]) {
			max = Math.max(max, seq[row][col]);
		}
	}

	canvas.width = seq[0].length;
	canvas.height = seq.length;
	canvas.style = `padding-left: calc(50vw - ${canvas.width / 2}px); padding-top: calc(50vh - ${canvas.height / 2}px); `;
	imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for (var row in seq) {
		for (var col in seq[row]) {
			const val = Math.floor((seq[row][col] << 8) / max);
			drawPixel({
				x: parseInt(col),
				y: parseInt(row)
			}, {
					r: val,
					g: val,
					b: val
				}
			);
		}
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.putImageData(imageData, 0, 0);
}

function drawPixel(point, rgb) {
	const index = (point.x + point.y * canvas.width) * 4;
	imageData.data[index + 0] = rgb.r;
	imageData.data[index + 1] = rgb.g;
	imageData.data[index + 2] = rgb.b;
	imageData.data[index + 3] = 255;
}

function numItsSliderChange() {
	numItsSpan.innerHTML = maxIts = numItsSlider.value;
}

function initMatrix() {
	seq = [
		[parseInt(document.getElementById('init-matrix-0-0').value), parseInt(document.getElementById('init-matrix-0-1').value)],
		[parseInt(document.getElementById('init-matrix-1-0').value), parseInt(document.getElementById('init-matrix-1-1').value)],
	];
}
