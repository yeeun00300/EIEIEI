import React, { useEffect, useState } from "react";
import AdminList from "./AdminList/AdminList";
import Search from "../../pages/Admin/components/Search";
import DateRangePickerValue from "../../pages/Admin/components/DateRangePickerValue";

function CustomerQnA() {
  const [search, setSearch] = useState("");
  useEffect(() => {}, [search]);
  return (
    <div>
      <Search setSearch={setSearch} />
      <DateRangePickerValue />
      <AdminList title={"문의사항"} />
    </div>
  );
}

export default CustomerQnA;
