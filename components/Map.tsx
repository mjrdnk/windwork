import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Controls from "./Controls";
import data from "../data.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Map = () => {
  const mapContainerRef = useRef(null);
  const date = new Date();
  const initialMonthIndex = date.getMonth();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(
    initialMonthIndex.toString()
  );
  const [active, setActive] = useState({
    name: "Population",
    description: "Wind",
    property: `wind_rating_month_${initialMonthIndex}`,
    stops: [
      [0.3, "#f8d5cc"],
      [0.6, "#f4bfb6"],
      [1, "#f1a8a5"],
    ],
  });
  const [map, setMap] = useState(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [0, 50],
      zoom: 2.2,
      interactive: false,
    });

    map?.on("load", () => {
      map?.addSource("countries", {
        type: "geojson",
        data: {
          ...data,
          features: data.features
            .map((country) => ({
              ...country,
              properties: {
                ...country.properties,
              },
            }))
            .filter((country) => country.properties.region_un === "Europe")
            .forEach(console.log),
        },
      });

      map?.setLayoutProperty("country-label", "text-field", [
        "format",
        ["get", "name_en"],
        { "font-scale": 1.2 },
        "\n",
        {},
        ["get", "name"],
        {
          "font-scale": 0.8,
          "text-font": [
            "literal",
            ["DIN Offc Pro Italic", "Arial Unicode MS Regular"],
          ],
        },
      ]);

      map?.addLayer(
        {
          id: "countries",
          type: "fill",
          source: "countries",
        },
        "country-label"
      );

      map?.setPaintProperty("countries", "fill-color", {
        property: active.property,
        stops: active.stops,
      });

      setMap(map);
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  useEffect(() => {
    if (map) {
      paint();
    }
  }, [active, map]);

  const paint = () => {
    map.setPaintProperty("countries", "fill-color", {
      property: active.property,
      stops: active.stops,
    });
  };

  const changeState = () => {
    setActive({
      name: "Population",
      description: "Wind",
      property: `wind_rating_month_${currentMonthIndex}`,
      stops: [
        [0.3, "#f8d5cc"],
        [0.6, "#f4bfb6"],
        [1, "#f1a8a5"],
      ],
    });
    map.setPaintProperty("countries", "fill-color", {
      property: active.property,
      stops: active.stops,
    });
  };

  return (
    <div>
      <div
        ref={mapContainerRef}
        className="absolute top-0 bottom-0 left-0 right-0 h-3/4"
      />
      <div className="absolute bottom-4 left-0 right-0">
        <Controls
          onChange={(e) => {
            setCurrentMonthIndex(e.target.value);
            changeState();
          }}
          currentMonthIndex={currentMonthIndex}
        />
      </div>
    </div>
  );
};

export default Map;
