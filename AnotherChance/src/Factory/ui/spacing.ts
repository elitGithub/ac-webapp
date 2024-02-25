export interface Thickness {
	left: number;
	top: number;
	right: number;
	bottom: number;
}

export function space(left?: number, top?: number): Partial<Thickness>;
export function space(left?: number, top?: number, right?: number, bottom?: number): Partial<Thickness>;
export function space(
	left?: number,
	top?: number,
	right?: number,
	bottom?: number
): Partial<Thickness> {
	
	return { left, top, right, bottom};
}