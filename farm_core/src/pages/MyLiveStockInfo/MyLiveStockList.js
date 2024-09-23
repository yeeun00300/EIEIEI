import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import checkLoginSlice, {
  fetchFarmList,
} from "./../../store/checkLoginSlice/checkLoginSlice";
import styles from "./MyLiveStockList.module.scss";
import { storage, useFetchCollectionData } from "../../firebase";
function MyLiveStockList(props) {
  const dispatch = useDispatch();
  const { farmList } = useSelector((state) => state.checkLoginSlice);
  console.log(farmList);
  const email = localStorage.getItem("email");

  useEffect(() => {
    console.log("test");
    //     const queryOptions = {
    //       conditions: [{ field: "email", operator: "==", value: email }],
    //     };
    // dispatch(fetchFarmList({ collectionName: "farm", queryOptions }));
  }, []);

  return (
    <div className={styles.listPage}>
      <h1>나의 축사 목록</h1>
      <ul></ul>
    </div>
  );
}

export default MyLiveStockList;
