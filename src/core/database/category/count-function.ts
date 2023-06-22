import type { Category } from '../../model/database/category';
import { CategoryStat } from '../../model/database/category-stat';
import type { Transaction } from '../../model/database/transaction';

export function categoryStatsFn(
	$values: [transactions: Transaction[], categories: Category[]],
	set: (value: CategoryStat[]) => void,
) {
	const transactions = $values[0];
	const categories = $values[1];
	if (!transactions || transactions.length < 1) {
		set([]);
		return;
	}
	const categoryCountMap = new Map<number | undefined, CategoryStat>();
	transactions.forEach((transaction) => {
		const reference = (transaction.categoryId || undefined) as number;
		if (!categoryCountMap.has(reference)) {
			categoryCountMap.set(
				reference,
				new CategoryStat(
					categories.find((cat) => cat.id === reference),
					0,
					0,
				),
			);
		}
		const categoryStat = categoryCountMap.get(reference);
		if (categoryStat != null) {
			categoryStat.count += 1;
			categoryStat.totalAmount += transaction.amount || 0;
		} else {
			throw 'Erroneous state; category stat not found';
		}
	});
	const categoryCounts = Array.from(categoryCountMap.values()).sort((a, b) => b.count - a.count);
	set(categoryCounts);
}
