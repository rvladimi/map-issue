import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapMarker,
  useMemo,
  useCallback,
  YMapLayer,
  YMapFeatureDataSource,
  YMapClusterer,
  clusterByGrid,
} from "./lib/ymaps";
import { custom } from "./custom";
import type { YMapLocationRequest } from "ymaps3";

import "./YandexMap.css";

export default function YandexMap() {
  const LOCATION: YMapLocationRequest = {
    center: [37.162873, 56.737901], // Dubna, Moscow region
    zoom: 13.5,
  };

  // We create an array of features with the appropriate interface.
  // We will pass it to the clusterer settings
  const coordinates = [
    [37.162873, 56.737901],
    [37.16528, 56.73593],
    [37.237953, 56.744961],
  ];

  const points = coordinates.map((lnglat, index) => ({
    type: "Feature",
    id: index.toString(),
    geometry: {
      type: "Point",
      coordinates: coordinates[index],
    },
    properties: { name: "marker", description: "" },
  }));

  // We declare a render function. For the clustering method, we pass and store the size of one grid division in pixels
  const gridSizedMethod = useMemo(() => clusterByGrid({ gridSize: 64 }), []);

  // We declare a function for rendering ordinary markers. Note that the function must return any Entity element. In the example, this is ymaps3.YMapMarker
  const marker = useCallback(
    (feature) => (
      <YMapMarker
        coordinates={feature.geometry.coordinates}
        source={"my-source"}
      >
        <img src={process.env.PUBLIC_URL + "/images/pin.svg"} alt="pin" />
      </YMapMarker>
    ),
    []
  );

  // We declare a cluster rendering function that also returns an Entity element.
  // We will transfer the marker and cluster rendering functions to the clusterer settings
  const cluster = useCallback(
    (coordinates, features) => (
      <YMapMarker coordinates={coordinates} source={"my-source"}>
        <div className="circle">
          <div className="circle-content">
            <span className="circle-text">{features.length}</span>
          </div>
        </div>
      </YMapMarker>
    ),
    []
  );

  return (
    <YMap location={LOCATION}>
      <YMapDefaultSchemeLayer customization={custom} />
      <YMapFeatureDataSource id="my-source" />
      <YMapLayer source="my-source" type="markers" zIndex={1800} />
      <YMapClusterer
        marker={marker}
        cluster={cluster}
        method={gridSizedMethod}
        features={points}
      />
    </YMap>
  );
}
