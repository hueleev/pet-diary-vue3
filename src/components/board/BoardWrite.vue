<template>
	<BoardForm
		:type="'insert'"
		v-model:title="form.boardTitle"
		v-model:content="form.boardCnt"
		v-model:writer="form.boardWriter"
		v-model:password="form.boardPwd"
	>
		<template #actions>
			<v-btn variant="outlined" color="black" @click="save">안녕!</v-btn>
		</template>
	</BoardForm>
</template>

<script setup>
import BoardForm from '@/components/board/BoardForm.vue';
import { ref, inject } from 'vue';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/composables/alert';
import sha256 from 'sha256';

const form = ref({
	boardTitle: null,
	boardCnt: null,
	boardWriter: null,
	boardPwd: null,
});

const save = async () => {
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

const { execute } = useAxios(
	'/board',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			// list 모드로 변경
			emit('changeType', 'list');
		},
	},
);

const isEmpty = inject('isEmpty');
const { vAlert } = useAlert();
const emit = defineEmits(['changeType']);
</script>

<style lang="scss" scoped></style>
