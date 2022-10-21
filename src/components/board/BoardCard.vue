<template>
	<v-col cols="12" sm="6" md="4" lg="3">
		<v-card :title="props.title" variant="outlined">
			<v-card-actions>
				<v-spacer></v-spacer>
				<!-- <v-btn variant="outlined">Click me</v-btn> -->
				<v-btn
					:icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
					@click="show = !show"
				></v-btn>
			</v-card-actions>
			<v-expand-transition>
				<div v-show="show">
					<v-divider></v-divider>
					<v-card-text>
						<div v-html="props.content" />
					</v-card-text>
				</div>
			</v-expand-transition>
		</v-card>
	</v-col>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
	title: String,
	content: String,
});
const show = ref(false);
</script>

<style lang="scss" scoped></style>
