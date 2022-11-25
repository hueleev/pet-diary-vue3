<template>
	<div class="d-flex justify-center" style="gap: 1rem; margin: 14px">
		<v-btn
			prepend-icon="mdi-format-list-bulleted"
			variant="outlined"
			:active="type == 'list'"
			@click="type = 'list'"
			>list</v-btn
		>
		<v-btn
			prepend-icon="mdi-pencil"
			variant="outlined"
			:active="type == 'write'"
			@click="type = 'write'"
			>write</v-btn
		>
	</div>
	<v-divider color="black" />
	<v-container fluid>
		<BoardList v-if="type == 'list'" :boards="boards"></BoardList>
		<BoardWrite v-if="type == 'write'" @changeType="changeType"></BoardWrite>

		<!-- <div v-for="board in boards" :key="board.boardSn">
			{{ board.boardTitle }}
		</div> -->
	</v-container>
</template>

<script setup>
import BoardList from '@/components/board/BoardList.vue';
import BoardWrite from '@/components/board/BoardWrite.vue';
import { useAxios } from '@/hooks/useAxios';
import { ref, watchEffect } from 'vue';

const type = ref('list');

const { data: boards, execute } = useAxios(
	'/board/list',
	{ method: 'get' },
	{
		immediate: false,
	},
);

watchEffect(() => {
	if (type.value == 'list') {
		execute();
	}
});

const changeType = value => {
	type.value = value;
};
</script>
