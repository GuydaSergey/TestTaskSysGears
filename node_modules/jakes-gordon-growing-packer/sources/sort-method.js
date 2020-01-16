let sort = {
	random : function (a,b) {
		return Math.random() - 0.5;
	},
	w : function (a,b) {
		return b.w - a.w;
	},
	h : function (a,b) {
		return b.h - a.h;
	},
	a : function (a,b) {
		return b.area - a.area;
	},
	max : function (a,b) {
		return Math.max(b.w, b.h) - Math.max(a.w, a.h);
	},
	min : function (a,b) {
		return Math.min(b.w, b.h) - Math.min(a.w, a.h);
	},
	height : function (a,b) {
		return msort(a, b, ['h', 'w']);
	},
	width : function (a,b) {
		return msort(a, b, ['w', 'h']);
	},
	area : function (a,b) {
		return msort(a, b, ['a', 'h', 'w']);
	},
	maxside : function (a,b) {
		return msort(a, b, ['max', 'min', 'h', 'w']);
	}
};

function msort(a, b, criteria) {
	/* sort by multiple criteria */
	let diff, n;
	for (n = 0 ; n < criteria.length ; n++) {
		diff = sort[criteria[n]](a,b);

		if (diff != 0){
			return diff;
		} 
  	}
	return 0;
}

export default sort;