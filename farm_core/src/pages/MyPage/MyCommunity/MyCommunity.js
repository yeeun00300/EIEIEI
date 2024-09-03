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

function MyCommunity() {
  const dispatch = useDispatch();
  const storage = getStorage(); // Firebase Storage 인스턴스 생성
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const communityContents = useSelector(
    (state) => state.communitySlice?.communityContents || []
  );
  const { stock, isLoading, error } = useSelector((state) => state.stockSlice);

  useEffect(() => {
    dispatch(fetchExcelStock({ collectionName: "stock", queryOptions: {} }));
  }, [dispatch]);

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

    fetchDownloadUrl();
  }, [storage]);

  useEffect(() => {
    dispatch(fetchCommunity({ collectionName: "community", queryOptions: {} }));
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
      {loading ? (
        <p>Loading...</p>
      ) : (
        downloadUrl && (
          <a href={downloadUrl} download="stock_template.xlsx">
            엑셀 다운로드
          </a>
        )
      )}
      <ul>
        {stock.map((item) => {
          console.log(item);
          return <li key={item.docId}>{JSON.stringify(item)}</li>;
        })}
      </ul>
    </div>
  );
}

export default MyCommunity;
