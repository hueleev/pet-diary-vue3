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
</style>
