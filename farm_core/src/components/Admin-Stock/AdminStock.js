import React from "react";
import styles from "./AdminStock.module.scss";
function AdminStock() {
  return (
    <div className={styles.AdminStock}>
      <div>가축 정보 리스트</div>
      <div>
        <div>등록기간 : </div>
        {/* <div>
          회원별 회원/탈퇴회원 :
          <input type="radio" id="user" name="member" value="회원" />
          <label for="user">회원</label>
          <input type="radio" id="deleteUser" name="member" value="탈퇴회원" />
          <label for="deleteUser">탈퇴회원</label>
        </div> */}
        <div>
          가축별 :
          <input type="radio" id="k-beef" name="stock" value="한우" />
          <label for="k-beef">한우</label>
          <input type="radio" id="dairy" name="stock" value="낙농" />
          <label for="dairy">낙농</label>
          <input type="radio" id="pork" name="stock" value="양돈" />
          <label for="pork">양돈</label>
          <input type="radio" id="chicken" name="stock" value="육계" />
          <label for="chicken">육계</label>
          <input type="radio" id="layer" name="stock" value="산란계" />
          <label for="layer">산란계</label>
        </div>
      </div>
      <div>
        가축 리스트
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default AdminStock;
