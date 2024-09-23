import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedStock,
  updateStock,
} from "../../store/stockSlice/stockSlice";
import Modal from "./Modal";

function StockModal({ onClose }) {
  const dispatch = useDispatch();
  const selectedStock = useSelector((state) => state.stockslice?.selectedStock);
  console.log("선택된 가축 데이터:", selectedStock); // 로그 추가
  const [formData, setFormData] = useState(selectedStock || {});

  useEffect(() => {
    if (selectedStock) {
      setFormData(selectedStock);
    } else if (selectedStock === null) {
      // 선택된 가축이 없을 때 fetchSelectedStock 호출
      const queryOptions = {
        conditions: [
          {
            field: "docId",
            operator: "==",
            value: selectedStock.docId, // 여기는 제거해야 함
          },
        ],
      };
      dispatch(fetchSelectedStock({ collectionName: "stock", queryOptions }));
    }
  }, [dispatch, selectedStock]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(
      updateStock({
        collectionName: "stock",
        docId: formData.docId,
        updateInfoObj: formData,
      })
    );
    onClose();
  };

  return (
    <Modal isOpen={!!selectedStock} onClose={onClose}>
      <h2>가축 수정</h2>
      <input
        name="birthDate"
        value={formData.birthDate || ""} // 값이 없을 경우 빈 문자열로 초기화
        onChange={handleChange}
        placeholder="생일"
      />
      <input
        name="weight"
        type="number"
        value={formData.weight || ""} // 값이 없을 경우 빈 문자열로 초기화
        onChange={handleChange}
        placeholder="체중"
      />
      <input
        name="feed"
        type="number"
        value={formData.feed || ""} // 값이 없을 경우 빈 문자열로 초기화
        onChange={handleChange}
        placeholder="먹이량"
      />
      <input
        name="temp"
        type="number"
        value={formData.temp || ""} // 값이 없을 경우 빈 문자열로 초기화
        onChange={handleChange}
        placeholder="온도"
      />
      <button onClick={handleSubmit}>저장</button>
    </Modal>
  );
}

export default StockModal;
