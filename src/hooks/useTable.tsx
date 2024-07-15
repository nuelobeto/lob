const useTable = (
	activeRow: string | null,
	setActiveRow: React.Dispatch<React.SetStateAction<string | null>>,
	selectedRows: string[],
	setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>
) => {
	const toggleTableDropdown = (rowId: string) => {
		if (rowId === activeRow) {
			return setActiveRow(null);
		}
		return setActiveRow(rowId);
	};

	const selectRows = (rowId: string) => {
		if (selectedRows.includes(rowId)) {
			return setSelectedRows(selectedRows.filter((r) => r !== rowId));
		}
		return setSelectedRows([...selectedRows, rowId]);
	};

	const selectAllRows = (rowIds: string[]) => {
		if (selectedRows.length > 0) {
			return setSelectedRows([]);
		}
		return setSelectedRows(rowIds);
	};

	return {
		activeRow,
		setActiveRow,
		toggleTableDropdown,
		selectRows,
		selectedRows,
		selectAllRows,
	};
};

export default useTable;
