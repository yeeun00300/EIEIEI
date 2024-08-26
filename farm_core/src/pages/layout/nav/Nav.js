import React, { useEffect } from "react";
import styles from "./Nav.module.scss";
import Footer from "../footer/Footer";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks";
import { json } from "react-router";

function Nav({ contents, renderContent }) {
  // 선택된 리스트(컴포넌트)의 id와 label 을 가져온다-----------------------
  const apiRef = useTreeViewApiRef();
  const [selectedItem, setSelectedItem] = React.useState({
    id: "",
    label: "",
  });

  const handleSelectedItemsChange = (event, itemId) => {
    if (itemId == null) {
      setSelectedItem(null);
    } else {
      setSelectedItem(apiRef.current.getItem(itemId));
    }
  };
  const itemId = selectedItem.id;
  // console.log(itemId);

  // ---------------------------------------------------------------------\
  const renderUserContent = () => {
    const componentsMap = {
      "": " ",
      My_Farm: " ",
      My_Farm_Details: " ",
      My_Farm_Board: " ",
      My_Farm_MyPage: " ",
      My_Farm01: <h1>나의 목장 01</h1>,
      My_Farm02: <h1>나의 목장 02</h1>,
      My_Farm03: <h1>나의 목장 03</h1>,
      My_Farm_Details_Farm: <h1>목장 현황</h1>,
      My_Farm_Details_CCTV: <h1>CCTV</h1>,
      My_Farm_Details_Disease: <h1>질병 현황</h1>,
      My_Farm_Details_Info: <h1>상세정보</h1>,
      My_Farm_Board_Total: <h1>전체 보기</h1>,
      My_Farm_Board_FreeBoard: <h1>자유게시판</h1>,
      My_Farm_Board_Community: <h1>커뮤니티</h1>,
      My_Farm_MyPage_InfoEdit: <h1>회원정보/수정</h1>,
      My_Farm_MyPage_MyBoard: <h1>내 게시글</h1>,
      My_Farm_MyPage_Inquire: <h1>1:1문의하기</h1>,
      My_Farm_MyPage_Payment: <h1>결제 내역</h1>,
    };

    return componentsMap[itemId] || <h1>Default Content</h1>;
  };
  console.log(renderUserContent());
  useEffect(() => {}, [itemId]);
  return (
    <>
      <div className={styles.nav}>
        <Box sx={{ minHeight: 352, minWidth: 250 }}>
          <RichTreeView
            items={contents}
            apiRef={apiRef}
            selectedItems={selectedItem?.id ?? null}
            onSelectedItemsChange={handleSelectedItemsChange}
          />
        </Box>
        {/* {renderUserContent()} */}
        <Footer />
      </div>
    </>
  );
}

export default Nav;
