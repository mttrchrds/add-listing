import React, { useEffect } from "react";
import {
  AdvancedMarker,
  Map as GoogleMap,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import markerImg from "/marker@2x.png";
import Stack from "@mui/material/Stack";

interface StreetViewPanoramaProps {
  lat: number;
  lng: number;
}

const StreetViewPanorama: React.FC<StreetViewPanoramaProps> = ({
  lat,
  lng,
}) => {
  const map = useMap("main-map");
  const streetViewLib = useMapsLibrary("streetView");

  useEffect(() => {
    if (!streetViewLib || !map) return;
    const panorama = new streetViewLib.StreetViewPanorama(
      document.getElementById("streetview-container") as HTMLElement,
      {
        position: {
          lat,
          lng,
        },
        pov: {
          heading: 34,
          pitch: 10,
        },
        addressControl: false,
      }
    );

    map.setStreetView(panorama);
  }, [streetViewLib, map, lat, lng]);

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      <div style={{ width: "100%", height: "350px" }}>
        <GoogleMap
          center={{
            lat: lat,
            lng: lng,
          }}
          zoom={15}
          mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
          id="main-map"
        >
          <AdvancedMarker position={{ lat, lng }} draggable={true}>
            <img src={markerImg} width={24} height={32} />
          </AdvancedMarker>
        </GoogleMap>
      </div>
      <div
        style={{ width: "100%", height: "350px" }}
        id="streetview-container"
      ></div>
    </Stack>
  );
};

export default StreetViewPanorama;
