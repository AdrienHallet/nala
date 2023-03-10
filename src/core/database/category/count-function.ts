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
		if (!categoryCountMap.has(transaction.categoryId as number)) {
			categoryCountMap.set(transaction.categoryId, 0);
		}
		categoryCountMap.set(
			transaction.categoryId,
			(categoryCountMap.get(transaction.categoryId) as number) + 1,
		);
	});
	const categoryCount = Array.from(categoryCountMap, ([id, count]) => ({
		category: categories.find((cat) => cat.id === id),
		count: count,
	}));
	set(categoryCount);
}
