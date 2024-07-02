import { ref, onMounted } from "vue";
import maplibregl from "maplibre-gl";

export default function () {
	const mapInstance = ref();
	const mapGeoData = ref();

	const getMapInstance = computed(() => mapInstance.value);

	function setMapInstance(map: maplibregl.Map) {
		mapInstance.value = map;
	}
	function setLineLayer(map: maplibregl.Map) {
		map.on("load", () => {
			map.addLayer({
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
		});
	}

	return {
		mapInstance,
		mapGeoData,
		getMapInstance,
		setMapInstance,
		setLineLayer,
	};
}
