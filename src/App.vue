<template>
	<v-app>
		<TheHeader>
			<v-main><router-view /></v-main>
			<AppAlert />
		</TheHeader>
	</v-app>
</template>

<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
</script>

<style type="scss">
@import './assets/custom.scss';

#vuetifyApp {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
