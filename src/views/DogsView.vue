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

// const r = document.querySelector(':root');
const toggleType = ref('run');
const property = ref('');

// var r = document.querySelector(':root');
// var rs = getComputedStyle(r); //암기
// console.log(rs.getPropertyValue('--color-fur'));

const changeProperty = key => {
	if (property.value != '') {
		property.value = key;
		console.log('changeProperty', key);
	}

	// r.style.setProperty(key, value);
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

	--color-fur-2: rgb(238, 238, 238);
}
</style>
