export const getStatusByLastOnline = (lastOnline: Date | null) => {
	if (!lastOnline) return ""

	const date = new Date(lastOnline)
	const dateInMilliSec = date.getTime()
	const difference = Math.round((Date.now() - dateInMilliSec) / (1000 * 60))

	if (difference / 60 > 12) return "a log time ago"
	if (difference > 59) return Math.round(difference / 60) + " hours ago"
	if (difference > 5) return difference + " min ago"
	if (difference >= 1 && difference < 5) return "last seen recently"
	if (difference < 1) return "online"

}
