import { writable, type Writable } from "svelte/store";
import type {Transaction} from '$core/model/database/transaction';

export const transactions: Writable<Transaction[]> = writable();

export const transactionsChange: Writable<boolean | Date> = writable(false);