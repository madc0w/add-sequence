const maxIts = 5;
var seq = [[0, 1], [1, 1]];

var max = 0;
var outputTable;

function onLoad() {
	outputTable = document.getElementById('output-table');
	go();
}

function go() {
	var iteration = 0;
	const intervalId = setInterval(() => {
		if (iteration > maxIts) {
			clearInterval(intervalId);
		}
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
		// console.log('finished iteration ', iteration);
	}, 100);
}

function displaySeq() {
	for (var row in seq) {
		for (var col in seq[row]) {
			max = Math.max(max, seq[row][col]);
		}
	}

	var html = '';
	for (var row in seq) {
		html += '<tr>';
		for (var col in seq[row]) {
			const val = Math.floor(256 * seq[row][col] / max).toString(16);
			const color = val + val + val;
			html += `<td style="background-color: #${color}"></td>`;
		}
		html += '</tr>';
	}
	outputTable.innerHTML = html;
}


// function displaySeq() {
// 	for (var i in seq) {
// 		var row = '';
// 		for (var j in seq[i]) {
// 			row += seq[i][j] + '\t';
// 		}
// 		console.log(row);
// 	}
// }
