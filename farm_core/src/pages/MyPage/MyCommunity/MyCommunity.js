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
import ExcelTemplateDownload from "../../../components/ExcelTemplateDownload/ExcelTemplateDownload";
import ExcelUpload from "../../../components/ExcelUpload/ExcelUpload";

function MyCommunity() {
  const dispatch = useDispatch();
  const communityContents = useSelector(
    (state) => state.communitySlice?.communityContents || []
  );

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
    </div>
  );
}

export default MyCommunity;
