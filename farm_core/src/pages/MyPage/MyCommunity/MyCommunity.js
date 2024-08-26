import React, { Children, useEffect } from "react";
import styles from "./MyCommunity.module.scss";
import { getDatas } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import communitySlice, {
  fetchCommunity,
} from "./../../../store/communitySlice/communitySlice";
import FreeboardPage from "../../Community/FreeboardPage";
import CommunityConents from "./communityContent/CommunityConents";

function MyCommunity({ variant, children }) {
  const dispatch = useDispatch();
  const { communityContents } = useSelector((state) => state.communitySlice);

  useEffect(() => {
    dispatch(fetchCommunity({ collectionName: "community", queryOptions: {} }));
  }, []);
  console.log(communityContents);
  return (
    <div className="page">
      <div className="container">
        {communityContents.map((content, idx) => {
          return <CommunityConents {...content} key={idx} />;
        })}
      </div>
    </div>
  );
}

export default MyCommunity;
