<template>
	<v-col cols="12" sm="6" md="4" lg="3">
		<!-- 게시글 -->
		<v-card variant="outlined">
			<v-card-item>
				<template v-slot:title>
					{{ props.title }}
				</template>
				<template v-slot:subtitle>
					<div>{{ createdDate }}</div>
					<div>{{ props.boardWriter }}</div>
				</template>
			</v-card-item>
			<!-- 게시글 action -->
			<v-card-actions>
				<v-spacer />
				<v-btn
					:icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
					@click="show = !show"
				/>
			</v-card-actions>
			<!-- 게시글 내용 -->
			<v-expand-transition>
				<div v-show="show">
					<v-divider />
					<v-card-text>
						<div class="align-center">
							<!-- 내용 -->
							<div v-html="props.content" />
							<!-- 수정/삭제 버튼 -->
							<div class="d-flex justify-end">
								<v-btn
									variant="text"
									size="small"
									icon="mdi-pencil"
									@click="open('update')"
								/>
								<v-btn
									variant="text"
									size="small"
									icon="mdi-delete"
									@click="open('delete')"
								/>
							</div>
						</div>
					</v-card-text>
				</div>
			</v-expand-transition>
		</v-card>
	</v-col>

	<!-- 수정/삭제 팝업 -->
	<v-dialog
		v-model="dialog.show"
		:max-width="useDisplay().mobile ? '100%' : '50%'"
	>
		<v-card class="py-3">
			<v-card-text>
				<BoardUpdate
					v-show="dialog.type == 'update'"
					:boardSn="props.boardSn"
					@close="close"
				/>
				<BoardDelete
					v-show="dialog.type == 'delete'"
					:boardSn="props.boardSn"
					@close="close"
				/>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script setup>
import BoardUpdate from './BoardUpdate.vue';
import BoardDelete from './BoardDelete.vue';
import { useDisplay } from 'vuetify';
import { computed, inject } from 'vue';
import { ref } from 'vue';

const dayjs = inject('dayjs'); // dayjs 플러그인
const emit = defineEmits(['refresh']); // event emit

// 게시판 상세
const props = defineProps({
	boardSn: Number,
	title: String,
	content: String,
	boardWriter: String,
	createDt: String,
	updateDt: String,
});

// 팝업 (수정/삭제)
const dialog = ref({
	type: '',
	show: false,
});
// 게시글 오픈 여부
const show = ref(false);

// 팝업 열기
const open = type => {
	dialog.value.show = true;
	dialog.value.type = type;
};

//팝업 닫기
const close = () => {
	dialog.value.show = false;
	dialog.value.type = '';
	emit('refresh'); // 게시글 목록 refresh
};

// 날짜 포맷
const createdDate = computed(() =>
	dayjs(props.createDt).format('YYYY. MM. DD HH:mm:ss'),
);
</script>

<style lang="scss" scoped></style>
