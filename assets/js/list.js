const vscode = acquireVsCodeApi();

const columnDefs = [
  { headerName: "Date", field: "date", width: 100 },
  { headerName: "Hash", field: "hash", width: 150 },
  { headerName: "Commit", field: "message", width: 150 },
  {
    headerName: "Operation",
    width: 80,
    cellRenderer(params) {
      return '<a class="delete" onclick="deleteCommit(\'' + params.data.hash + '\')" href="javascript:void(0)">DELETE</a>';
    },
  },
];

const gridOptions = {
  enableColResize: true,
  autoSizePadding: 20,
  columnDefs: columnDefs,
  rowData: rows,
};

const eGridDiv = document.querySelector("#container");

const grid = new agGrid.Grid(eGridDiv, gridOptions);
gridOptions.api.sizeColumnsToFit();

function deleteCommit(hash) {
  // vscode.postMessage({
  //   command: "delete",
  //   hash: hash,
  // });
  console.log(hash);
}