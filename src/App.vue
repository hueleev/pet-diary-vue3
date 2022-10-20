<template>
	<v-app>
		<TheHeader></TheHeader>
		<v-main class="h-screen"><router-view /></v-main>
	</v-app>
</template>

<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
</script>
