import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import {Loading} from '$core/model/loading/loading';

export const loading: Writable<Loading> = writable(new Loading());