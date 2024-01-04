export function timeAgo(date: Date | undefined) {
	if (!date) return;

	const now = Date.now();

	const timeIntervals = [31536000, 2628000, 604800, 86400, 3600, 60, 1];
	const intervalNames = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second'];
	const diff = Math.abs(now-date.getTime())/1000;
	const index = timeIntervals.findIndex(i=>(diff/i) >= 1);
	const n = Math.floor(diff/timeIntervals[index]);
	const interval = intervalNames[index];

	return n + ' ' + interval + 's';
}
