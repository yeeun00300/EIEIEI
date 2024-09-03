import React, { Children, useEffect, useState } from "react";
import styles from "./MyCommunity.module.scss";
import { getDatas } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import communitySlice, {
  fetchCommunity,
} from "./../../../store/communitySlice/communitySlice";
import FreeboardPage from "../../Community/FreeboardPage";
import CommunityConents from "./communityContent/CommunityConents";
import Selected from "../../../components/MyLiveStock/Selected/Selected";
import ExcelTemplateDownload from "../../../components/ExcelTemplateDownload/ExcelTemplateDownload";
import ExcelUpload from "../../../components/ExcelUpload/ExcelUpload";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

function MyCommunity() {
  const dispatch = useDispatch();
  const communityContents = useSelector(
    (state) => state.communitySlice?.communityContents || []
  );
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDownloadUrl = async () => {
      setLoading(true);
      const storage = getStorage();
      const fileRef = ref(storage, "path/to/your/excel-template.xlsx"); // 엑셀 파일이 Firebase Storage에 저장된 경로

      try {
        const url = await getDownloadURL(fileRef);
        setDownloadUrl(url);
      } catch (error) {
        console.error("Error fetching download URL:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloadUrl();
  }, []);

  useEffect(() => {
    dispatch(fetchCommunity({ collectionName: "community", queryOptions: {} }));
  }, [dispatch]);

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
      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        downloadUrl && (
          <a href={downloadUrl} download="stock_template.xlsx">
            엑셀 다운로드
          </a>
        )
      )} */}
    </div>
  );
}

export default MyCommunity;
