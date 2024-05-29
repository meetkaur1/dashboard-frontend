import MUIDataTable from "mui-datatables";

function DataTable({ columns, data }) {
  const options = {
    filter: false,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    selectableRows: "none",
    pagination: false,
  };
  return (
    <>
      <MUIDataTable data={data} columns={columns} options={options} />
    </>
  );
}

export default DataTable;
