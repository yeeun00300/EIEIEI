import React from "react";
import { Outlet } from "react-router-dom";

function Question(props) {
  return (
    <>
      <div class="container">
        <div id="contact">
          <h2>연락처 및 문의</h2>
          <p>이메일: FarmCore@gmail.com</p>
          <p>전화번호: 070-7111-1020</p>
          <form>
            <label for="name">이름</label>
            <div>
              카테고리
              <select>
                <option>한우</option>
                <option>낙농</option>
                <option>양계</option>
                <option>양돈</option>
              </select>
            </div>
            <input type="text" id="name" name="name" />
            <label for="message">문의 내용</label>
            <textarea id="message" name="message"></textarea>
            <button type="submit">보내기</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Question;
