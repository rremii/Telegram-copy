export const getStatusByLastOnline = (timeDifference: string | null) => {
	if (!timeDifference) return ""
	//timeDifference in min

	if (+timeDifference / 60 >= 12) return "a log time ago"
	if (+timeDifference >= 59) return Math.round(+timeDifference / 60) + " hours ago"
	if (+timeDifference >= 1) return +timeDifference + " min ago"
	if (+timeDifference < 1) return "online"

}
