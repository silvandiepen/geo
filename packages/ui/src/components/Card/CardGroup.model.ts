export const CardGroupLayout = {
	HORIZONTAL: 'horizontal',
	VERTICAL: 'vertical',
	GRID: 'grid',
};

export type CardGroupLayout =
	(typeof CardGroupLayout)[keyof typeof CardGroupLayout];

export interface CardGroupProps {
	layout?: CardGroupLayout;
}
