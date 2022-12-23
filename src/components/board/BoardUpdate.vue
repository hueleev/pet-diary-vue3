<template>
	<BoardForm
		:type="'update'"
		v-model:title="form.boardTitle"
		v-model:content="form.boardCnt"
		v-model:writer="form.boardWriter"
		v-model:password="form.boardPwd"
	>
		<template #actions>
			<v-btn variant="outlined" color="black" @click="update">다시 안녕!</v-btn>
		</template>
	</BoardForm>
</template>

<script setup>
import BoardForm from '@/components/board/BoardForm.vue';
import { ref, inject } from 'vue';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/composables/alert';
import sha256 from 'sha256';

const { vSuccess, vAlert } = useAlert(); // alert
const isEmpty = inject('isEmpty'); // 플러그인
const emit = defineEmits(['close']); // event

// 게시글 일련번호
const props = defineProps({
	boardSn: Number,
});

// 게시글 form
const form = ref({});

// 게시글 조회 API
useAxios(
	`/board/${props.boardSn}`,
	{
		method: 'get',
	},
	{
		immediate: true,
		onSuccess: ({ data }) => {
			form.value = {
				boardTitle: data.boardTitle,
				boardCnt: data.boardCnt,
				boardWriter: data.boardWriter,
				boardPwd: null,
			};
		},
	},
);

// 게시글 수정 API
const { execute } = useAxios(
	`/board/${props.boardSn}`,
	{
		method: 'put',
	},
	{
		immediate: false,
		onSuccess: () => {
			emit('close');
			vSuccess('수정되었개');
		},
		onError: ({ response }) => {
			vAlert('비밀번호를<br/> 확인해주개');
			const { data } = response;
			console.log(data.message);
		},
	},
);

// 게시글 수정
const update = async () => {
	const { boardTitle, boardCnt, boardWriter, boardPwd } = form.value;
	if (
		isEmpty(boardTitle) ||
		isEmpty(boardCnt) ||
		isEmpty(boardWriter) ||
		isEmpty(boardPwd)
	) {
		vAlert('모든 항목을 입력해주개');
	} else {
		execute({
			...form.value,
			boardPwd: sha256(form.value.boardPwd),
		});
	}
};
</script>

<style lang="scss" scoped></style>
