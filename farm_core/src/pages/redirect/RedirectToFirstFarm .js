import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectToFirstFarm = ({ farmList, farmLoading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!farmLoading) {
      if (farmList && farmList.length > 0) {
        const firstFarmId = farmList[0].farmId;
        navigate(`/My_Farm/${firstFarmId}`);
      } else {
        navigate("/FirstPage");
      }
    }
    console.log(`렌더링 테스트`);
  }, [farmList, farmLoading, navigate]);

  return null; // 리디렉션하는 컴포넌트이므로 아무것도 렌더링하지 않음
};

export default RedirectToFirstFarm;
