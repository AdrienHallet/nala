import type { ChartConfiguration, ChartType } from 'chart.js';
import colors from 'tailwindcss/colors';
import type { Monthly } from '../../../core/model/stats/monthly';

export function monthlyConfig(
	monthlies: Monthly[],
): ChartConfiguration<ChartType, Monthly[], string> {
	return {
		type: 'bar',
		data: {
			datasets: [
				{
					data: monthlies,
					backgroundColor: colors.green[700],
					borderColor: colors.zinc[600],
					parsing: {
						xAxisKey: 'income',
						yAxisKey: 'month',
					},
				},
				{
					data: monthlies,
					backgroundColor: colors.red[900],
					borderColor: colors.zinc[600],
					parsing: {
						xAxisKey: 'expense',
						yAxisKey: 'month',
					},
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			indexAxis: 'y',
			scales: {
				y: {
					stacked: true,
				},
				x: {},
			},
			plugins: {
				legend: {
					display: false,
				},
			},
		},
	};
}
