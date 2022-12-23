<template>
	<v-card
		tile
		flat
		class="d-flex justify-center"
		style="background-color: white"
	>
		<v-btn-toggle
			style="margin: 8px"
			v-model="toggleType"
			variant="outlined"
			mandatory
		>
			<v-btn value="run">🐶</v-btn>
			<v-btn value="tail">🐶</v-btn>
		</v-btn-toggle>
	</v-card>
	<v-divider color="black" />
	<v-card
		tile
		flat
		color="transparent"
		class="d-flex justify-center align-center mt-3"
	>
		<input type="color" id="color" @change="changeColor" v-model="color" />
	</v-card>
	<v-card
		tile
		flat
		color="transparent"
		class="d-flex flex-wrap justify-center align-center"
	>
		<template v-for="(item, index) in colorList[toggleType]" :key="index">
			<v-btn class="ma-2" @click="changeProperty(item.property)">
				{{ item.text }}
			</v-btn>
		</template>
	</v-card>
	<div>
		<div
			class="d-flex justify-center"
			:style="useDisplay().mobile ? 'padding-top: 40%' : 'padding-top: 20%'"
		>
			<TailDog v-show="toggleType == 'tail'" style="padding-top: 50px" />
			<RunningDogComponent
				v-show="toggleType == 'run'"
				@changeProperty="changeProperty"
				style="padding: 50px"
			/>
		</div>
	</div>
	<div
		class="d-flex justify-center align-end pb-4"
		style="height: calc(100vh - 53%)"
	>
		<a href="https://wsss.tistory.com/search/강아지" target="_blank">Thanks</a>
	</div>
</template>

<script setup>
import RunningDogComponent from '@/components/dog/RunningDogComponent.vue';
import TailDog from '@/components/dog/TailDog.vue';
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

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

const colorList = ref({
	run: [
		{
			property: '--color-fur',
			text: 'fur',
		},
		{
			property: '--color-fur-dark',
			text: 'dark fur',
		},
		{
			property: '--color-spot',
			text: 'spot',
		},
		{
			property: '--color-eye',
			text: 'eye',
		},
		{
			property: '--color-nose',
			text: 'nose',
		},
		{
			property: '--color-snout',
			text: 'snout',
		},
		{
			property: '--color-collar',
			text: 'collar',
		},
	],
	tail: [
		{
			property: '--color-fur-2',
			text: 'fur',
		},
		{
			property: '--color-fur-dark-2',
			text: 'dark fur',
		},
		{
			property: '--color-heart',
			text: 'heart',
		},
		{
			property: '--color-eyes',
			text: 'eyes',
		},
		{
			property: '--color-nose-2',
			text: 'nose',
		},
		{
			property: '--color-mouse',
			text: 'mouse',
		},
	],
});
</script>

<style type="scss">
:root {
	--color-fur: #ffb141;
	--color-fur-dark: #f5832c;
	--color-spot: #f9584c;

	--color-snout: #544258;
	--color-eye: #544258;
	--color-nose: #544258;
	--color-collar: #3eab6c;
	--duration: 0.7s;
	--semi-duration: calc(var(--duration) / 2);
	--easing: cubic-bezier(0.5, 0, 0.5, 1);
	--stagger: calc(-1 * var(--semi-duration) / 2);

	--color-fur-2: #eeeeee;
	--color-fur-dark-2: #f79e38;

	--color-heart: #e64356;
	--color-eyes: #000;
	--color-nose-2: #000;
	--color-mouse: #000;
}

/* .v-btn--active {
	background-color: black;
}
.v-btn--active .v-btn__content {
	color: white;
} */
</style>
