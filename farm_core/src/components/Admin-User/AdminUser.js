import React from "react";
import styles from "./AdminUser.module.scss";

function AdminUser() {
  return (
    <div className={styles.AdminUser}>
      <div>회원 정보 리스트</div>
      <div>
        <div>등록 기간 : </div>
        <div>
          회원별 회원/탈퇴회원 :
          <input type="radio" id="user" name="member" value="회원" />
          <label htmlFor="user">회원</label>
          <input type="radio" id="deleteUser" name="member" value="탈퇴회원" />
          <label htmlFor="deleteUser">탈퇴회원</label>
        </div>
        <div>
          농장 종류별 :
          <input type="radio" id="k-beef" name="stock" value="한우" />
          <label htmlFor="k-beef">한우</label>
          <input type="radio" id="dairy" name="stock" value="낙농" />
          <label htmlFor="dairy">낙농</label>
          <input type="radio" id="pork" name="stock" value="양돈" />
          <label htmlFor="pork">양돈</label>
          <input type="radio" id="chicken" name="stock" value="육계" />
          <label htmlFor="chicken">육계</label>
          <input type="radio" id="layer" name="stock" value="산란계" />
          <label htmlFor="layer">산란계</label>
        </div>
      </div>
      <div>
        회원 리스트
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default AdminUser;
