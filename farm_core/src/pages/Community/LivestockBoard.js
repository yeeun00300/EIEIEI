import React from "react";
import styles from "./LivestockBoard.module.scss";
import ListPage from "./components/ListPage";

function LivestockBoard() {
  return (
    <div className="page">
      <ListPage variant="livestock"></ListPage>
    </div>
  );
}

export default LivestockBoard;
