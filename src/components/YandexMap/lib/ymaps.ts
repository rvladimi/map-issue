import React from "react";
import ReactDom from "react-dom";

const [ymaps3React] = await Promise.all([
  ymaps3.import("@yandex/ymaps3-reactify"),
  ymaps3.ready,
]);

export const reactify = ymaps3React.reactify.bindTo(React, ReactDom);
export const {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  YMapLayer,
  YMapFeatureDataSource,
} = reactify.module(ymaps3);

// default pin on the map https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/
export const { YMapDefaultMarker } = reactify.module(
  await ymaps3.import("@yandex/ymaps3-markers@0.0.1")
);

// Load the package with the cluster, extract the classes for creating clusterer objects and the clustering method
export const { YMapClusterer, clusterByGrid } = reactify.module(
  await ymaps3.import("@yandex/ymaps3-clusterer@0.0.1")
);

export const { useState, useMemo, useCallback } = React;
