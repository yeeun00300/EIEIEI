import React from "react";

function CommunityConents({ title, createAt, content, category }) {
  return (
    <div>
      <p>{title}</p>
      <p>{content}</p>
      <p>{category}</p>
      <p> {createAt}</p>
    </div>
  );
}

export default CommunityConents;
