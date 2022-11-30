<template>
	<div id="body">
		<div class="color-options">
			<input type="color" id="color" @change="onColorChange" v-model="color" />
			<div
				class="color-option"
				style="background-color: #55efc4"
				data-color="#55efc4"
				@click="onColorClick"
			></div>
			<div
				class="color-option"
				style="background-color: #81ecec"
				data-color="#81ecec"
				@click="onColorClick"
			></div>
			<div
				class="color-option"
				style="background-color: #74b9ff"
				data-color="#74b9ff"
				@click="onColorClick"
			></div>
			<div
				class="color-option"
				style="background-color: #a29bfe"
				data-color="#a29bfe"
				@click="onColorClick"
			></div>
			<div
				class="color-option"
				style="background-color: #ffeaa7"
				data-color="#ffeaa7"
				@click="onColorClick"
			></div>
			<div
				class="color-option"
				style="background-color: #fab1a0"
				data-color="#fab1a0"
				@click="onColorClick"
			></div>
			<div
				class="color-option"
				style="background-color: #dfe6e9"
				data-color="#dfe6e9"
				@click="onColorClick"
			></div>
			<div
				class="color-option"
				style="background-color: #636e72"
				data-color="#636e72"
				@click="onColorClick"
			></div>
			<div
				class="color-option"
				style="background-color: #2d3436"
				data-color="#2d3436"
				@click="onColorClick"
			></div>
		</div>
		<canvas
			ref="myCanvas"
			:width="size.w"
			:height="size.h"
			@dblclick="onDoubleClick"
			@mousemove="onMove"
			@mousedown="startPainting"
			@mouseup="stopPainting"
			@mouseleave="stopPainting"
			@click="onCanvasClick"
		></canvas>
		<div class="btns">
			<input
				id="line-width"
				type="range"
				min="1"
				max="10"
				step="0.5"
				v-model="lineWidth"
				@change="onLineWidthChange"
			/>
			<button id="mode-btn" @click="onModeClick">🤪 {{ modeBtn }}</button>
			<button id="destroy-btn" @click="onDestroyClick">🤒 Destory</button>
			<button id="eraser-btn" @click="onEraserClick">🥶 Erase</button>
			<label for="file">
				🙃 Add Photo
				<input type="file" accept="image/*" id="file" @change="onFileChange" />
			</label>
			<input
				type="text"
				placeholder="Add text here ..."
				id="text"
				v-model="textInput"
			/>
			<button id="save" @click="onSaveClick">🤑 Save Image</button>
		</div>
	</div>
</template>

<script setup>
import { onMounted, reactive, ref, toRefs } from 'vue';

let color = ref('black');
let lineWidth = ref(5);

function CanvasManager(w, h) {
	this.w = w;
	this.h = h;
	this.ctx = null;

	this.setContext = function (ctx) {
		this.ctx = ctx;
	};
	this.setSize = function (size) {
		this.w += size.w;
		this.h += size.h;
	};
}

let myCanvas = ref(null);
let myContext = ref(null);
let manager = ref(null);
let modeBtn = ref('Fill');
let size = reactive({
	w: 500,
	h: 500,
});

onMounted(() => {
	const { w, h } = toRefs(size);
	myContext.value = myCanvas.value.getContext('2d');
	manager.value = new CanvasManager(myContext, size.w, size.h);
	const { width, height } = myCanvas.value.getBoundingClientRect();
	w.value = width;
	h.value = height;
});

let isPainting = ref(false);
let isFilling = ref(false);
let textInput = ref('');
function onMove(event) {
	const { offsetX, offsetY } = event;
	if (isPainting.value) {
		myContext.value.lineTo(offsetX, offsetY);
		myContext.value.stroke();
		return;
	}
	myContext.value.moveTo(offsetX, offsetY);
}
function startPainting() {
	isPainting.value = true;
}
function stopPainting() {
	isPainting.value = false;
	myContext.value.beginPath();
}
function onLineWidthChange(event) {
	myContext.value.lineWidth = event.target.value;
}
function onColorChange(event) {
	console.log(event.target.value);
	myContext.value.strokeStyle = event.target.value;
	myContext.value.fillStyle = event.target.value;
}
function onColorClick(event) {
	const { color: colorValue } = event.target.dataset;
	// console.dir(event.target.dataset.color);
	myContext.value.strokeStyle = colorValue;
	myContext.value.fillStyle = colorValue;
	color.value = colorValue;
}
function onModeClick() {
	if (isFilling.value) {
		isFilling.value = false;
		modeBtn.value = 'Fill';
	} else {
		isFilling.value = true;
		modeBtn.value = 'Draw';
	}
}
function onCanvasClick() {
	if (isFilling.value) {
		myContext.value.fillRect(0, 0, size.w, size.h);
	}
}
function onDestroyClick() {
	myContext.value.fillStyle = 'white';
	myContext.value.fillRect(0, 0, size.w, size.h);
}
function onEraserClick() {
	myContext.value.strokeStyle = 'white';
	isFilling.value = false;
	modeBtn.value = 'Fill';
}
function onFileChange(event) {
	const file = event.target.files[0];
	const url = URL.createObjectURL(file);
	const image = new Image();
	image.src = url;
	image.onload = function () {
		myContext.value.drawImage(image, 0, 0, size.w, size.h);
		// fileInput.value = null;
	};
}
function onDoubleClick(event) {
	const text = textInput.value;
	if (text !== '') {
		myContext.value.save(); // myContext의 현재 상태, 색상, 스타일등 모든것을 저장한다.
		const { offsetX, offsetY } = event;
		myContext.value.lineWidth = 1;
		myContext.value.font = '48px serif';
		myContext.value.fillText(text, offsetX, offsetY);
		myContext.value.restore(); // 이전 저장 상태로 돌아간다.
	}
}
function onSaveClick() {
	const url = myCanvas.value.toDataURL();
	const a = document.createElement('a');
	a.href = url;
	a.download = 'myDrawing.png';
	a.click();
}
</script>

<style scoped>
#body {
	display: flex;
	gap: 2%;
	justify-content: center;
	/* align-items: flex-start; */
	justify-self: center;
	align-items: center;
	background-color: gainsboro;
	width: 100%;
	height: 100%;
	/* padding: 20px; */
	/* font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Jua,
		Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
}
canvas {
	width: 500px;
	height: 500px;
	background-color: white;
	border-radius: 15px;
}

/* 스마트폰 세로 */
@media screen and (max-device-width: 390px) {
	canvas {
		width: 30vw;
		height: 30vh;
	}
}
.btns {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.color-options {
	display: flex;
	flex-direction: column;
	gap: 20px;
	align-items: center;
}
.color-option {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	cursor: pointer;
	border: 2px solid white;
	transition: transform ease-in-out 0.3s;
	box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}
.color-option:hover {
	transform: scale(1.2);
}
input#color {
	background-color: white;
}
button,
label {
	all: unset; /* css 속성 전부 제거 */
	padding: 10px 0px;
	text-align: center;
	background-color: royalblue;
	color: white;
	font-weight: 500;
	cursor: pointer;
	border-radius: 10px;
	transition: opacity linear 0.1s;
}

button:hover {
	opacity: 0.75;
}

input#file {
	display: none;
}

input#text {
	all: unset; /* css 속성 전부 제거 */
	padding: 10px 0px;
	text-align: center;
	border-radius: 10px;
	font-weight: 500;
	background-color: white;
}
</style>
