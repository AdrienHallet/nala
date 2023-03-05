import { LoadingComponent } from '$core/model/loading/component';
import { loading } from '$core/loading/state';

export function setLoading(component: LoadingComponent, value: boolean) {
	loading.update((loading) => {
		switch (component) {
			case LoadingComponent.TRANSACTIONS:
				loading.transactions = value;
				break;
			case LoadingComponent.DATABASE:
				loading.database = value;
				break;
			case LoadingComponent.CATEGORIES:
				loading.categories = value;
				break;
			default:
				throw new Error(`[Loading] Unmapped component: ${component}`);
		}
		return loading;
	});
}
