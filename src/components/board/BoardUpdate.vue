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

const props = defineProps({
	boardSn: Number,
});

const form = ref({});

// 조회
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

// 수정
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
		},
	},
);

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

const isEmpty = inject('isEmpty');
const { vSuccess, vAlert } = useAlert();
const emit = defineEmits(['close']);
</script>

<style lang="scss" scoped></style>
