import { ref, onMounted } from "vue";
import maplibregl from "maplibre-gl";

export default function () {
	const mapInstance = ref();
	const mapGeoData = ref();

	function addLineLayer(map: maplibregl.Map) {
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
	}
	function removeLayer(map: maplibregl.Map, id: string) {
		map.removeLayer(id);
	}

	return {
		mapInstance,
		mapGeoData,
		addLineLayer,
		removeLayer,
	};
}
