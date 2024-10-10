import React from "react";
import FilterGrid from "../../Grid/FilterGrid";
function AdminList({ title, columns, rows }) {
  return (
    <>
      <h2>{title}</h2>
      <FilterGrid rows={rows} columns={columns} height={800} pageSize={13} />
    </>
  );
}

export default AdminList;
