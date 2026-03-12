export const FieldType = {
	TEXT: 'text',
	ID: 'id',
	DATE: 'date',
	DATE_AGO: 'date_ago',
	EMAIL: 'email',
	CODE: 'code',
	BOOLEAN: 'boolean',
	YES_NO: 'yes_no',
	SWITCH: 'switch',
	NUMBER: 'number',
	STATUS: 'status',
};

export type FieldType = (typeof FieldType)[keyof typeof FieldType];
