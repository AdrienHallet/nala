import type { ChartConfiguration, ChartType } from 'chart.js';
import colors from 'tailwindcss/colors';
import type { CategoryStat } from '$core/model/database/category-stat';

export interface CategoryStatGraphOptions {
	type: 'count' | 'total';
}

export function categoryStatGraphConfig(
	categoryCounts: CategoryStat[],
	options: CategoryStatGraphOptions,
): ChartConfiguration<ChartType, number[], string> {
	let chartData;
	switch (options.type) {
		case 'count':
			chartData = categoryCounts.map((categoryCount) => categoryCount.count || 0);
			break;
		case 'total':
			chartData = categoryCounts.map((categoryCount) => (categoryCount.totalAmount || 0) / 100);
			break;
		default:
			throw 'Illegal chart type';
	}
	return {
		type: 'doughnut',
		data: {
			labels: categoryCounts.map((categoryCount) => categoryCount.category?.name || 'No category'),
			datasets: [
				{
					data: chartData,
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
