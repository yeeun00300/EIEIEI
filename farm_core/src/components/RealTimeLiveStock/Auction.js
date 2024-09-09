import React, { useEffect, useState } from "react";
import axios from "axios";

const Auction = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/api5/Grid_20151127000000000313_1/1/5",
          {
            params: {
              DELNG_DE: "20230830",
              WHSAL_MRKT_NM: "서울강서도매시장",
            },
          }
        );
        setData(response.data); // 실제 응답 구조에 따라 조정
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error.message}</div>;

  return (
    <div>
      <h1>가축 경매 데이터</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Auction;
