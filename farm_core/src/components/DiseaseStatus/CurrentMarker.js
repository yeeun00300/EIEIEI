import React, { useState } from "react";
import MapSearch from "./MapSearch";
import MapMarker from "./MapMarker";
import PlaceSearch from "./PlaceSearch";

function CurrentMarker() {
  const [map, setMap] = useState(null);

  return (
    <div style={{ position: "relative" }}>
      <MapSearch setMap={setMap} />
      {map && (
        <>
          <MapMarker map={map} />
          <PlaceSearch map={map} />
        </>
      )}
    </div>
  );
}

export default CurrentMarker;
