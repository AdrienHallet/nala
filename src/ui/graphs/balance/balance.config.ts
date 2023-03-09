import type { ChartConfiguration, ChartType } from 'chart.js';
import colors from 'tailwindcss/colors';
import type { Balance } from '../../../core/model/database/balance';

export function balanceConfig(
	balances: Balance[],
): ChartConfiguration<ChartType, Balance[], string> {
	return {
		type: 'line',
		data: {
			datasets: [
				{
					data: balances,
					backgroundColor: colors.zinc[300],
					borderColor: colors.zinc[600],
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			parsing: {
				xAxisKey: 'date',
				yAxisKey: 'amount',
			},
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				y: {
					position: 'right',
					grid: {
						color: colors.zinc[700],
					},
				},
				x: {
					grid: {
						display: false,
					},
				},
			},
		},
	};
}
