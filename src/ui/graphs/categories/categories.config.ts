import type { ChartConfiguration, ChartType } from 'chart.js';
import colors from 'tailwindcss/colors';
import type { CategoryCount } from '../../../core/model/database/category-count';

export function categoryCountConfig(
	categoryCounts: CategoryCount[],
): ChartConfiguration<ChartType, number[], string> {
	return {
		type: 'doughnut',
		data: {
			labels: categoryCounts.map((categoryCount) => categoryCount.category?.name || 'No category'),
			datasets: [
				{
					data: categoryCounts.map((categoryCount) => categoryCount.count || 0),
					backgroundColor: [
						colors.zinc[300],
						colors.zinc[400],
						colors.zinc[500],
						colors.zinc[600],
						colors.zinc[700],
						colors.zinc[800],
						colors.zinc[900],
					],
					borderColor: colors.zinc[600],
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: true,
					position: 'left',
				},
			},
		},
	};
}
