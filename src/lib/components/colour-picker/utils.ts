export function parseRGBString(rgbStr: string): { r: number, g: number, b: number } | null {
	const match = rgbStr.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/)
	if (!match) return null
	return {
		r: parseInt(match[1]),
		g: parseInt(match[2]),
		b: parseInt(match[3]),
	}
}
