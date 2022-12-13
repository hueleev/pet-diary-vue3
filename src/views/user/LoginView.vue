<template>
	<div class="d-flex h-screen align-center">
		<v-card
			class="mx-auto"
			variant="outlined"
			width="500"
			:max-width="mobile ? '90%' : '50%'"
		>
			<v-img
				src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
				height="200px"
				cover
			></v-img>

			<v-card-title> Top western road trips </v-card-title>
		</v-card>
	</div>
</template>

<script setup>
import { useDisplay } from 'vuetify';
const { mobile } = useDisplay();
console.log(mobile);
</script>

<style lang="scss" scoped></style>
