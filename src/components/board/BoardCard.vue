<template>
	<v-col cols="12" sm="6" md="4" lg="3">
		<v-card variant="outlined">
			<!-- :title="props.title" -->
			<v-card-item>
				<template v-slot:title>
					{{ props.title }}
				</template>
				<template v-slot:subtitle>
					<div>{{ createdDate }}</div>
					<div>{{ props.boardWriter }}</div>
				</template>
			</v-card-item>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					:icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
					@click="show = !show"
				/>
			</v-card-actions>
			<v-expand-transition>
				<div v-show="show">
					<v-divider></v-divider>
					<v-card-text>
						<div class="align-center">
							<div v-html="props.content" />
							<div class="d-flex justify-end">
								<v-btn
									variant="text"
									size="small"
									icon="mdi-pencil"
									@click="dialog = true"
								></v-btn>
								<v-btn
									variant="text"
									size="small"
									icon="mdi-delete"
									@click="deleteBoard"
								></v-btn>
							</div>
						</div>
					</v-card-text>
				</div>
			</v-expand-transition>
		</v-card>
	</v-col>
	<v-dialog v-model="dialog">
		<v-card class="py-3">
			<v-card-text>
				<BoardUpdate :boardSn="props.boardSn" @close="close" />
			</v-card-text>
			<!-- <v-card-actions>
				<v-btn color="primary" block @click="dialog = false"
					>Close Dialog</v-btn
				>
			</v-card-actions> -->
		</v-card>
	</v-dialog>
</template>

<script setup>
import { computed, inject } from 'vue';
import { ref } from 'vue';
import { useAxios } from '@/hooks/useAxios';
import { useRouter } from 'vue-router';
import BoardUpdate from './BoardUpdate.vue';

const router = useRouter();

const dialog = ref(false);

const props = defineProps({
	boardSn: Number,
	title: String,
	content: String,
	boardWriter: String,
	createDt: String,
	updateDt: String,
});

const show = ref(false);

const dayjs = inject('dayjs');
const createdDate = computed(() =>
	dayjs(props.createDt).format('YYYY. MM. DD HH:mm:ss'),
);

const { execute } = useAxios(
	`/board/${props.boardSn}`,
	{ method: 'delete' },
	{
		immediate: false,
		onSuccess: () => {
			router.go();
		},
	},
);

const deleteBoard = () => {
	if (confirm('삭제할거개?')) {
		execute();
	}
};

const close = () => {
	dialog.value = false;
};
</script>

<style lang="scss" scoped></style>
