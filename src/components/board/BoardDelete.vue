<template>
	<v-card
		class="mx-auto"
		variant="outlined"
		title="비밀번호 확인"
		:max-width="mobile ? '100%' : '50%'"
	>
		<v-container>
			<v-text-field
				label="비밀번호"
				variant="underlined"
				placeholder="비밀번호"
				type="password"
				v-model="boardPwd"
			/>
		</v-container>
		<v-divider />
		<v-card-actions>
			<v-spacer />
			<v-btn variant="outlined" color="black" @click="checkPassword">
				삭제
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/composables/alert';
import { useDisplay } from 'vuetify';
import sha256 from 'sha256';

const { mobile } = useDisplay(); // 모바일 여부
const { vSuccess, vAlert } = useAlert(); // alert
const isEmpty = inject('isEmpty'); // string empty 플러그인
const emit = defineEmits(['close']); // event emit

// 게시글 일련번호
const props = defineProps({
	boardSn: Number,
});

// 비밀번호
const boardPwd = ref('');

// 게시글 삭제 API
const { execute: deleteExecute } = useAxios(
	`/board/${props.boardSn}`,
	{ method: 'DELETE' },
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('삭제되었개');
			emit('close');
		},
	},
);

// 비밀번호 확인 API
const { execute: checkExecute } = useAxios(
	`/board/check/${props.boardSn}`,
	{ method: 'POST' },
	{
		immediate: false,
		onSuccess: ({ data }) => {
			if (data) {
				deleteExecute();
			} else {
				vAlert('비밀번호 틀렸개..');
			}
		},
	},
);

// 비밀번호 확인 function
const checkPassword = () => {
	if (isEmpty(boardPwd.value)) {
		vAlert('비밀번호를 입력해주개');
	} else {
		checkExecute({
			boardPwd: sha256(boardPwd.value),
		});
	}
};
</script>

<style lang="scss" scoped></style>
