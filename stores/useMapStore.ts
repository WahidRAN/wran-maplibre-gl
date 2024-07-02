import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useMapStore = defineStore("map", () => {
	const mapInstance = ref();
	const mapGeoData = ref();

	const getMapInstance = computed(() => mapInstance.value);

	function setMapInstance(map: maplibregl.Map) {
		mapInstance.value = map;
	}
	function setMapData(mapData: Object) {
		mapGeoData.value = mapData;
	}
	function setMapSource() {
		mapInstance.value.on("load", () => {
			mapInstance.value.addSource("test-data", {
				type: "geojson",
				data: mapGeoData.value,
			});
		});
	}
	function setLineLayer() {
    mapInstance.value.addLayer({
      id: "line-layer",
      type: "line",
      source: "test-data",
      layout: {},
      paint: {
        "line-color": "yellow",
        "line-width": 2,
      },
      filter: ["==", "$type", "LineString"],
    });
	}

	return {
		mapInstance,
		mapGeoData,
		getMapInstance,
		setMapInstance,
		setMapData,
		setMapSource,
		setLineLayer,
	};
});
