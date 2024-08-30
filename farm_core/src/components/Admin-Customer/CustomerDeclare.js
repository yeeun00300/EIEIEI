import React, { useEffect, useState } from "react";
import AdminList from "./AdminList/AdminList";
import Search from "../../pages/Admin/components/Search";
import DateRangePickerValue from "../../pages/Admin/components/DateRangePickerValue";

function CustomerDeclare() {
  const [search, setSearch] = useState("");
  useEffect(() => {}, [search]);
  return (
    <div>
      <Search setSearch={setSearch} />
      <DateRangePickerValue />
      <AdminList title={"신고게시물"} />
    </div>
  );
}

export default CustomerDeclare;
