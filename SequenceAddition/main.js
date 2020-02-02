var seq = [0, 1];

function onLoad() {
	for (var i = 0; i < 12; i++) {
		console.log(i, seq);
		const newSeq = [];
		for (var j = 0; j < seq.length - 1; j++) {
			newSeq.push(seq[j]);
			newSeq.push(seq[j] + seq[j + 1]);
		}
		newSeq.push(seq[j]);
		seq = newSeq;
	}
}
