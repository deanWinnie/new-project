export const getTime = () => {
	const hours = new Date().getHours()
	let message = ''
	if (hours <= 5) {
		message = '凌晨'
	} else if (hours <= 9) {
		message = '早上'
	} else if (hours <= 12) {
		message = '上午'
	} else if (hours <= 18) {
		message = '下午'
	} else {
		message = '晚上'
	}
	return message
}
