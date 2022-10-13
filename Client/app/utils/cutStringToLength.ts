export const cutStringToLength = (string: string | null, length: number) => {
	if (!string) return ""
	if (string?.length <= length) return string
	return string?.slice(0, length) + "..."
}
