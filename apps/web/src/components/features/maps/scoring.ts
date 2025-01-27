export function calculateScore(useRate: number, winRate: number) {
	// Adjust weights (win rate is given more weight)
	const winWeight = 0.7;
	const useWeight = 0.3;

	// Score calculation logic
	let score = winWeight * winRate + useWeight * useRate;

	// Penalize very high use rate with low win rate
	if (winRate < 0.4 && useRate > 0.7) {
		score *= 0.5; // Reduce the score by 50% in this case
	}

	// Reward very good win rate and moderate-to-high use rate
	if (winRate > 0.7 && useRate > 0.5) {
		score *= 1.2; // Boost the score by 20% in this case
	}

	// Cap score between 0 and 1, and round to the hundredths place
	return Math.min(Math.max(Number(score.toFixed(2)), 0), 1);
}
