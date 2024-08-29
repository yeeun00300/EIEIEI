import React, { useState } from "react";
import MapSearch from "./MapSearch";
import MapMarker from "./MapMarker";

function CurrentMarker() {
  const [map, setMap] = useState(null);

  return (
    <div>
      <MapSearch setMap={setMap} />
      {map && <MapMarker map={map} />}
    </div>
  );
}

export default CurrentMarker;
