import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StockModal from "./StockModal";
import stockSlice, {
  deleteStock,
  fetchExcelStock,
  setSelectedStock,
} from "./../../store/stockSlice/stockSlice";

function MyStockDetails(props) {
  const dispatch = useDispatch();
  const { stock, isLoading } = useSelector((state) => state.stockSlice);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchExcelStock({ collectionName: "stock", queryOptions: {} }));
  }, [dispatch]);

  const handleEdit = (stockItem) => {
    dispatch(setSelectedStock(stockItem));
    setModalOpen(true);
  };

  const handleDelete = (docId) => {
    dispatch(deleteStock({ collectionName: "stock", docId }));
  };

  return (
    <div>
      <h1>가축 리스트</h1>
      <h1>가축 리스트</h1>
      {isLoading ? (
        <p>로딩 중...</p>
      ) : (
        <ul>
          {stock.map((item) => (
            <li key={item.stockId}>
              <h3>{item.stockType}</h3>
              <p>성별: {item.sex}</p>
              <p>생일: {item.birthDate}</p>
              <p>사육 수: {item.breedCount}</p>
              <p>체중: {item.weight} kg</p>
              <p>온도: {item.temp} °C</p>
              <p>입고일: {item.incomingDate}</p>
              <p>먹이량: {item.feed}</p>
              <p>임신 상태: {item.pregnantDate ? "임신" : "비임신"}</p>
              <button onClick={() => handleEdit(item)}>수정</button>
              <button onClick={() => handleDelete(item.docId)}>삭제</button>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && <StockModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

export default MyStockDetails;
