import React, { Children, useEffect } from "react";
import styles from "./MyCommunity.module.scss";
import { getDatas } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import communitySlice, {
  fetchCommunity,
} from "./../../../store/communitySlice/communitySlice";
import FreeboardPage from "../../Community/FreeboardPage";
import CommunityConents from "./communityContent/CommunityConents";
import Selected from "../../../components/MyLiveStock/Selected/Selected";
import StockMedicalExcel from "../../../components/medicalList/StockMedicalExcel";
import ExcelTemplateDownload from "../../../components/ExcelTemplateDownload/ExcelTemplateDownload";
import ExcelUpload from "../../../components/ExcelUpload/ExcelUpload";
import { fetchStockListData } from "../../../store/stockListSlice/stockListSlice";

function MyCommunity() {
  const dispatch = useDispatch();
  const communityContents = useSelector(
    (state) => state.communitySlice?.communityContents || []
  );
  const stockState = useSelector(
    (state) => state.stock || { data: [], status: "idle", error: null }
  );
  const { data, status, error } = stockState;

  console.log("Redux State:", stockState);
  useEffect(() => {
    dispatch(fetchCommunity({ collectionName: "community", queryOptions: {} }));
  }, [dispatch]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(
        fetchStockListData({ collectionName: "stock", queryOptions: {} })
      );
    }
  }, [dispatch, status]);

  return (
    <div className="page">
      <div>
        {communityContents.map((content, idx) => {
          return <CommunityConents {...content} key={idx} />;
        })}
      </div>
      <ExcelTemplateDownload />
      <ExcelUpload />
      <h1>Data from Firestore</h1>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              {Object.entries(item).map(([key, value]) => (
                <div key={key}>
                  <strong>{key}:</strong> {value}
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyCommunity;
