export function amountFormat(x: number | string) {
	if (x == null) {
		return x;
	}
	const fixed = Number(x).toFixed(2);
	return fixed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
