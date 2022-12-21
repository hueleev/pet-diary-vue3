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
import { ref } from 'vue';
import { useAxios } from '@/hooks/useAxios';
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
			console.log(data);
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
			// list 모드로 변경
			/* emit('changeType', 'list'); */
			emit('close');
		},
	},
);

const update = async () => {
	execute({
		...form.value,
		boardPwd: sha256(form.value.boardPwd),
	});
};

const emit = defineEmits(['close']);
</script>

<style lang="scss" scoped></style>
