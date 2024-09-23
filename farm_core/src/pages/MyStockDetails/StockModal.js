import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStock } from "../../store/stockSlice/stockSlice";
import Modal from "./Modal";

function StockModal({ onClose }) {
  const dispatch = useDispatch();
  const selectedStock = useSelector((state) => state.stockslice.selectedStock);
  const [formData, setFormData] = useState(selectedStock);

  useEffect(() => {
    setFormData(selectedStock);
  }, [selectedStock]);

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
        value={formData.birthDate}
        onChange={handleChange}
        placeholder="생일"
      />
      <input
        name="weight"
        type="number"
        value={formData.weight}
        onChange={handleChange}
        placeholder="체중"
      />
      <input
        name="feed"
        type="number"
        value={formData.feed}
        onChange={handleChange}
        placeholder="먹이량"
      />
      <input
        name="temp"
        type="number"
        value={formData.temp}
        onChange={handleChange}
        placeholder="온도"
      />
      {/* 다른 수정 가능한 필드 추가 */}
      <button onClick={handleSubmit}>저장</button>
    </Modal>
  );
}

export default StockModal;
