import type { Category } from '../../model/database/category';
import type { CategoryCount } from '../../model/database/category-count';
import type { Transaction } from '../../model/database/transaction';

export function categoryCountFn(
	$values: [transactions: Transaction[], categories: Category[]],
	set: (value: CategoryCount[]) => void,
) {
	const transactions = $values[0];
	const categories = $values[1];
	if (!transactions || transactions.length < 1) {
		set([]);
		return;
	}
	const categoryCountMap = new Map<number | undefined, number>();
	transactions.forEach((transaction) => {
		const reference = (transaction.categoryId || undefined) as number;
		if (!categoryCountMap.has(reference)) {
			categoryCountMap.set(reference, 0);
		}
		categoryCountMap.set(reference, (categoryCountMap.get(reference) as number) + 1);
	});
	const categoryCounts = Array.from(categoryCountMap, ([id, count]) => ({
		category: categories.find((cat) => cat.id === id),
		count: count,
	})).sort((a, b) => b.count - a.count);
	set(categoryCounts);
}
