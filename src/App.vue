<template>
	<v-app>
		<TheHeader>
			<v-main class="h-screen"><router-view /></v-main>
		</TheHeader>
	</v-app>
</template>

<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
</script>
