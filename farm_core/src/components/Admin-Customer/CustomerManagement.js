import React, { useEffect, useState } from "react";
import styles from "./CustomerManagement.module.scss";
import AdminList from "./AdminList/AdminList";
import Sort from "../../pages/Admin/components/Sort";
import Search from "../../pages/Admin/components/Search";

function CustomerManagement() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const sortComponent = () => {
    const componentMap = {
      "": <AdminList title={"공지사항"} />,
      공지사항: <AdminList title={"공지사항"} />,
      자유게시판: <AdminList title={"자유게시판"} />,
      커뮤니티: <AdminList title={"커뮤니티"} />,
    };
    return componentMap[sort] || <h1>Default Content</h1>;
  };
  useEffect(() => {}, [search, sort]);
  return (
    <div className={styles.CustomerManagement}>
      <Search setSearch={setSearch} />
      <Sort
        title=""
        name="Customer"
        setSort={setSort}
        sortArr={[
          { id: "notice", value: "공지사항", htmlFor: "notice" },
          { id: "freeBoard", value: "자유게시판", htmlFor: "freeBoard" },
          { id: "community", value: "커뮤니티", htmlFor: "community" },
        ]}
      />
      {sortComponent()}
      {/* <AdminList title={"공지사항"} />
      <AdminList title={"자유게시판"} />
      <AdminList title={"커뮤니티"} /> */}
    </div>
  );
}

export default CustomerManagement;
