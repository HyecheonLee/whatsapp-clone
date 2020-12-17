import "moment/locale/ko";
import moment from 'moment'

const Utility = {
	getToday,
	getRandom
}

function getToday() {
	return moment.format("YYYY-MM-DD")
}

function getRandom(length = 7) {
	const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";
	for (let i = length; i > 0; --i) {
		result += chars[Math.round(Math.random() * (chars.length - 1))];
	}
	return result;
}

function getTime(timestamp) {
	return moment(timestamp).format("LTS")
}

export {getToday, getRandom, getTime};