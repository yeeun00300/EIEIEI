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
import RegularPayment from "../../RegularPayment/RegularPayment";
import styles from "./MyCommunity.module.scss";
import MedicalList from "../../../components/medicalList/MedicalList";

function MyCommunity() {
  const dispatch = useDispatch();

  return <div className="page"></div>;
}

export default MyCommunity;
