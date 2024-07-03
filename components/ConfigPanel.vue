<script setup lang="ts">
const props = defineProps({
	disableLayer: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(["onToggle"]);

const toggleLineLayer = ref(true);
const toggleCircleLayer = ref(true);
const togglePolygonLayer = ref(true);
const toggleCustomLayer = ref(true);
const toggleDefaultLayer = ref(true);
const toggleRasterMap = ref(false);

type Layers = {
	label: string;
	emit: "onToggle";
	emitValue: string;
	disabled: boolean;
	model: boolean;
};

const layers = computed((): Layers[] => {
	return [
		{
			label: "Line layer",
			emit: "onToggle",
			emitValue: "line",
			disabled: props.disableLayer,
			model: toggleLineLayer.value,
		},
		{
			label: "Polygon layer",
			emit: "onToggle",
			emitValue: "polygon",
			disabled: props.disableLayer,
			model: togglePolygonLayer.value,
		},
		{
			label: "Circle layer",
			emit: "onToggle",
			emitValue: "circle",
			disabled: props.disableLayer,
			model: toggleCircleLayer.value,
		},
		{
			label: "Custom layer",
			emit: "onToggle",
			emitValue: "custom-marker",
			disabled: props.disableLayer,
			model: toggleCustomLayer.value,
		},
		{
			label: "Default layer",
			emit: "onToggle",
			emitValue: "default-marker",
			disabled: props.disableLayer,
			model: toggleDefaultLayer.value,
		},
		{
			label: "Vector Tile",
			emit: "onToggle",
			emitValue: "map",
			disabled: false,
			model: toggleRasterMap.value,
		},
	];
});
</script>

<template>
	<div class="wmg-container">
		<section class="wmg-card">
			<h1 class="wmg-card__title">Configuration Panel</h1>
			<div class="config-item" v-for="(layer, index) in layers" :key="index">
				<label class="switch">
					<input
						type="checkbox"
						v-model="layer.model"
						:disabled="layer.disabled"
						@change="emit(layer.emit, layer.emitValue)"
					/>
					<span class="slider round"></span>
				</label>
				<p>{{ layer.label }}</p>
			</div>
		</section>
	</div>
</template>

<style scoped>
.wmg-container {
	position: absolute;
	top: calc(50vh - 107.5px);
	left: 16px;
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	background: transparent;
}

.wmg-card {
	display: flex;
	flex-direction: column;
	gap: 8px;
	border-radius: 8px;
	width: 320px;
	padding: 16px;
	background-color: rgba(255, 255, 255, 0.5);
	backdrop-filter: blur(4px);
	box-shadow: 0 0 50px -25px black;
}

.wmg-card__title {
	margin-bottom: 16px;
}

.config-item {
	display: flex;
	gap: 8px;
	width: 100%;
}

.switch {
	position: relative;
	display: inline-block;
	width: 32px;
	height: 16px;
}

.switch input {
	opacity: 0;
	width: 0;
	height: 0;
}

.slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

.slider:before {
	position: absolute;
	content: "";
	height: 12px;
	width: 12px;
	left: 2px;
	bottom: 2px;
	background-color: white;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

input:checked + .slider {
	background-color: #2196f3;
}

input:disabled + .slider {
	cursor: not-allowed;
	opacity: 0.3;
}

input:focus + .slider {
	box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
	-webkit-transform: translateX(16px);
	-ms-transform: translateX(16px);
	transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
	border-radius: 34px;
}

.slider.round:before {
	border-radius: 50%;
}
</style>
