<template>
	<div class="d-flex justify-center" style="background-color: white">
		<v-btn-toggle
			style="margin: 8px"
			variant="outlined"
			v-model="toggleType"
			mandatory
		>
			<v-btn value="run">🐶</v-btn>
			<v-btn value="tail">🐶</v-btn>
		</v-btn-toggle>
	</div>
	<v-divider color="black" />
	<div class="d-flex justify-center align-center pa-5 mb-10">
		<input
			class="mr-5"
			type="color"
			id="color"
			@change="changeColor"
			v-model="color"
		/>
		<div class="d-flex justify-center align-baseline" style="gap: 1rem">
			<template v-if="toggleType == 'run'">
				<v-btn @click="changeProperty('--color-fur')">fur</v-btn>
				<v-btn @click="changeProperty('--color-fur-dark')">dark fur</v-btn>
				<v-btn @click="changeProperty('--color-spot')">spot</v-btn>
				<v-btn @click="changeProperty('--color-snout')">snout</v-btn>
				<v-btn @click="changeProperty('--color-collar')">collar</v-btn>
			</template>
			<template v-if="toggleType == 'tail'">
				<v-btn @click="changeProperty('	--color-fur-2')">fur</v-btn>
			</template>
		</div>
	</div>
	<div class="h-screen d-flex justify-center align-center">
		<TailDog v-show="toggleType == 'tail'" />
		<RunningDogComponent
			v-show="toggleType == 'run'"
			@changeProperty="changeProperty"
		/>
	</div>
</template>

<script setup>
import RunningDogComponent from '@/components/dog/RunningDogComponent.vue';
import TailDog from '@/components/dog/TailDog.vue';
import { ref } from 'vue';

const r = document.querySelector(':root');
const rs = getComputedStyle(r);
const toggleType = ref('run');
const property = ref('--color-fur');
const color = ref('red');
// var r = document.querySelector(':root');

const changeProperty = key => {
	key = key.trim();
	property.value = key;
	color.value = rs.getPropertyValue(key).trim();
};

const changeColor = e => {
	color.value = e.target.value.trim();
	r.style.setProperty(property.value, color.value);
	console.log('changeColor', color.value);
};
</script>

<style type="scss">
:root {
	--color-fur: #ffb141;
	--color-fur-dark: #f5832c;
	--color-spot: #f9584c;
	--color-snout: #544258;
	--color-collar: #3eab6c;
	--duration: 0.7s;
	--semi-duration: calc(var(--duration) / 2);
	--easing: cubic-bezier(0.5, 0, 0.5, 1);
	--stagger: calc(-1 * var(--semi-duration) / 2);

	--color-fur-2: #eeeeee;
}
</style>
