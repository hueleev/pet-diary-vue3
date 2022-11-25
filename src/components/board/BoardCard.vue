<template>
	<v-col cols="12" sm="6" md="4" lg="3">
		<v-card variant="outlined">
			<!-- :title="props.title" -->
			<v-card-item :title="props.title">
				<template v-slot:subtitle>
					{{ createdDate }}
				</template>
			</v-card-item>
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
import { computed, inject } from 'vue';
import { ref } from 'vue';

const props = defineProps({
	title: String,
	content: String,
	createDt: String,
	updateDt: String,
});
const show = ref(false);

const dayjs = inject('dayjs');
const createdDate = computed(() =>
	dayjs(props.createDt).format('YYYY. MM. DD HH:mm:ss'),
);
</script>

<style lang="scss" scoped></style>
