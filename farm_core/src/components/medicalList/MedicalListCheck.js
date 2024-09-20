import React, { useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../pages/MyPage/MyCommunity/MyCommunity.module.scss";
import { fetchFarmData } from "../../store/addLiveStockSlice/addLiveStockSlice"; // farm 데이터를 가져오는 액션

function MedicalListCheck() {
  const dispatch = useDispatch();
  const farmData = useSelector((state) => state.AddLiveStockSlice.farmData);
  console.log(farmData);

  //   useEffect(() => {
  //     dispatch(fetchFarmData());
  //   }, [dispatch]);

  return (
    <div>
      <TableContainer className={styles.tableContainer}>
        <Table>
          <TableHead className={styles.tableHead}>
            <TableRow>
              <TableCell className={styles.tableCellHeader}>
                축사 이름
              </TableCell>
              <TableCell className={styles.tableCellHeader}>
                축사 번호
              </TableCell>
              <TableCell className={styles.tableCellHeader}>
                마지막 수정 시간
              </TableCell>
              <TableCell className={styles.tableCellHeader}>
                정보 보기
              </TableCell>
              <TableCell className={styles.tableCellHeader}>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {farmData.map((farm) => (
              <TableRow key={farm.farmId}>
                <TableCell>{farm.farmName}</TableCell>
                <TableCell>{farm.farmId}</TableCell>
                <TableCell>{farm.lastModified}</TableCell>{" "}
                {/* 마지막 수정 시간 추가 */}
                <TableCell>
                  <Button>자세히 보기</Button>
                </TableCell>
                <TableCell>
                  <Button>삭제</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MedicalListCheck;
