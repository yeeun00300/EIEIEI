import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStorage, ref, getDownloadURL } from "firebase/storage"; // Firebase import
import communitySlice, {
  fetchCommunity,
} from "./../../../store/communitySlice/communitySlice";
import stockSlice, {
  fetchExcelStock,
} from "../../../store/stockSlice/stockSlice";
import CommunityConents from "./communityContent/CommunityConents";
import ExcelTemplateDownload from "../../../components/ExcelTemplateDownload/ExcelTemplateDownload";
import ExcelUpload from "../../../components/ExcelUpload/ExcelUpload";
import StockAddfromExcel from "../../../components/StockAdd/StockAddfromExcel";
import PayPage from "../../pay/PayPage";
import RegularPayment from "../../RegularPayment/RegularPayment";
import styles from "./MyCommunity.module.scss";

function MyCommunity() {
  const dispatch = useDispatch();
  const storage = getStorage(); // Firebase Storage 인스턴스 생성
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const communityContents = useSelector(
    (state) => state.communitySlice?.communityContents || []
  );

  useEffect(() => {
    const fetchDownloadUrl = async () => {
      setLoading(true);
      try {
        const fileRef = ref(storage, "path/to/your/excel-template.xlsx");
        const url = await getDownloadURL(fileRef);
        setDownloadUrl(url);
      } catch (error) {
        console.error("Error fetching download URL:", error);
      } finally {
        setLoading(false);
      }
    };

    console.log(window);

    fetchDownloadUrl();
  }, [storage]);

  useEffect(() => {
    // dispatch(fetchCommunityPost({ collectionName: "community", queryOptions: {} }));
  }, [dispatch]);

  return (
    <div className="page">
      <div className={styles.communitybox}>
        {communityContents.map((content, idx) => {
          return <CommunityConents {...content} key={idx} />;
        })}
      </div>
      {/* <PaymentPage /> */}
      <input type="date" />
    </div>
  );
}

export default MyCommunity;
