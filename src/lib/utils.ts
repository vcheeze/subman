import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatNumber(value: number, fractionDigits: number = 2) {
	return value.toLocaleString(undefined, {
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits
	});
}
