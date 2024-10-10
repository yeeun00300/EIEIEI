import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks";

function TreeViewComp({ contents, renderContent }) {
  // 선택된 리스트(컴포넌트)의 id와 label 을 가져온다-----------------------
  const apiRef = useTreeViewApiRef();
  const [selectedItem, setSelectedItem] = React.useState({
    id: "",
    label: "",
  });

  const handleSelectedItemsChange = (event, itemId) => {
    if (itemId == null) {
      setSelectedItem(null);
    } else {
      setSelectedItem(apiRef.current.getItem(itemId));
    }
  };
  const itemId = selectedItem.id;
  // ---------------------------------------------------------------------
  useEffect(() => {}, [itemId]);
  return (
    <>
      <div>
        <ul>
          <Box sx={{ minHeight: 352, minWidth: 250 }}>
            <RichTreeView
              items={contents}
              apiRef={apiRef}
              selectedItems={selectedItem?.id ?? null}
              onSelectedItemsChange={handleSelectedItemsChange}
            />
          </Box>
        </ul>
      </div>
      <div>{renderContent()}</div>
    </>
  );
}

export default TreeViewComp;
