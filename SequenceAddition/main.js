const maxIts = 12;

var seq = [[0, 1], [1, 1]];

function onLoad() {
	for (var iteration = 0; iteration < maxIts; iteration++) {
		console.log('iteration ' + iteration);

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

		console.log('after horizontal:');
		displaySeq();

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

		console.log('after vertical:');
		displaySeq();
		console.log('finished iteration ', iteration);
	}
}

function displaySeq() {
	for (var i in seq) {
		var row = '';
		for (var j in seq[i]) {
			row += seq[i][j] + '\t';
		}
		console.log(row);
	}
}
