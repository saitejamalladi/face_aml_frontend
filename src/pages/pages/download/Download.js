import React from "react";
import { CSVLink } from "react-csv";

function Download(props) {
  const { data: csvData, name = "download", children } = props;
  const camelCase = (str) => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  };
  csvData?.forEach((item) => delete item.__typename);
  const filterColumns = (data) => {
    const columns = Object.keys(data[0]);
    let headers = [];
    columns.forEach((col, idx) => {
      headers.push({ label: camelCase(col), key: col });
    });
    return headers;
  };
  return (
    <>
      {csvData.length > 0 && (
        <CSVLink
          data={csvData}
          headers={filterColumns(csvData)}
          filename={`${name}.csv`}
        >
          {children}
        </CSVLink>
      )}
    </>
  );
}

export default Download;
