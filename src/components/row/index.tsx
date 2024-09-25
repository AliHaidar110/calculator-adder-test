import { useState } from "react";
import { TrashIcon } from "../../assets";
import { useDebounce } from "../../hooks";
import {
	RowType,
	RemoveRowType,
	ToggleOperatorType,
	UpdateRowValueType,
	ToggleActiveRowType,
} from "../../types";

import "./row.scss";

type RowType_ = {
	row: RowType;
	toggleOperator: ToggleOperatorType;
	updateRowValue: UpdateRowValueType;
	toggleActiveRow: ToggleActiveRowType;
	removeRow: RemoveRowType;
};

const Row = ({
	row,
	toggleOperator,
	updateRowValue,
	toggleActiveRow,
	removeRow,
}: RowType_) => {
	const [value, setValue] = useState(row.value);

	useDebounce(
		() => {
			updateRowValue(row.id, value);
		},
		250,
		[value, row.id]
	);

	return (
		<>
			<div className={`row-item ${!row.enabled ? "disabled" : ""}`}>
				<button
					className="operator-button"
					onClick={() => toggleOperator(row.id)}
				>
					{row.operator}
				</button>
				<input
					type="number"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					disabled={!row.enabled}
				/>
				<button
					className="toggle-active-button"
					onClick={() => toggleActiveRow(row.id)}
				>
					{row.enabled ? "Disable" : "Enable"}
				</button>
				<button className="remove-button" onClick={() => removeRow(row.id)}>
					<TrashIcon />
				</button>
			</div>
		</>
	);
};

export default Row;
