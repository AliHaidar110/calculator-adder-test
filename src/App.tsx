import { useMemo, useState } from "react";

import {
	RemoveRowType,
	RowType,
	ToggleActiveRowType,
	ToggleOperatorType,
	UpdateRowValueType,
} from "./types";
import { Row } from "./components";

import "./App.scss";

const App = () => {
	const [rows, setRows] = useState<RowType[]>([
		{ id: 1, value: 0, enabled: true, operator: "+" },
	]);

	const addRow = () => {
		const newRow: RowType = {
			id: Date.now(),
			value: 0,
			enabled: true,
			operator: "+",
		};
		setRows([...rows, newRow]);
	};

	const removeRow: RemoveRowType = (id) => {
		setRows(rows.filter((row) => row.id !== id));
	};

	const updateRowValue: UpdateRowValueType = (id, newValue) => {
		const parsedValue = newValue === "" ? "" : parseFloat(`${newValue}`); // Allow empty string for controlled input
		setRows(
			rows.map((row) => (row.id === id ? { ...row, value: parsedValue } : row))
		);
	};

	const toggleActiveRow: ToggleActiveRowType = (id) => {
		setRows(
			rows.map((row) =>
				row.id === id ? { ...row, enabled: !row.enabled } : row
			)
		);
	};

	const toggleOperator: ToggleOperatorType = (id) => {
		setRows(
			rows.map((row) =>
				row.id === id
					? { ...row, operator: row.operator === "+" ? "-" : "+" }
					: row
			)
		);
	};

	const calculatedResult = useMemo(() => {
		return rows
			.filter((row) => row.enabled) // Include only enabled rows
			.reduce((total, row) => {
				const value = typeof row.value === "string" ? 0 : row.value; // Convert empty strings to 0
				return row.operator === "+" ? total + value : total - value;
			}, 0);
	}, [rows]);

	return (
		<div className="wrapper">
			<div className="container">
				<h3 className="title">React Calculator(adder)</h3>
				<div className="row-list">
					{rows.map((row) => (
						<Row
							key={row.id}
							row={row}
							toggleOperator={toggleOperator}
							updateRowValue={updateRowValue}
							toggleActiveRow={toggleActiveRow}
							removeRow={removeRow}
						/>
					))}
				</div>
				<button className="add-row-button" onClick={addRow}>
					Add Row
				</button>
				<h2 className="result">Result: {calculatedResult}</h2>
			</div>
		</div>
	);
};

export default App;
