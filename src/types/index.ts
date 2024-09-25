export type RowType = {
	id: number;
	value: number | string; // It can be a number or an empty string when user inputs
	enabled: boolean;
	operator: "+" | "-";
};

export type ToggleOperatorType = (id: RowType["id"]) => void;

export type UpdateRowValueType = (
	id: RowType["id"],
	newValue: RowType["value"]
) => void;

export type ToggleActiveRowType = (id: RowType["id"]) => void;

export type RemoveRowType = (id: RowType["id"]) => void;
