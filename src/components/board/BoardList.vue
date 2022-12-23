<template>
	<v-progress-circular
		v-if="loading"
		indeterminate
		class="d-flex ma-auto mt-10"
	/>
	<v-row>
		<template v-for="board in boards" :key="board.boardSn">
			<BoardCard
				@refresh="execute"
				:boardSn="board.boardSn"
				:title="board.boardTitle"
				:content="board.boardCnt"
				:boardWriter="board.boardWriter"
				:createDt="board.create_dt"
				:updateDt="board.update_dt"
			/>
		</template>
	</v-row>
</template>

<script setup>
import BoardCard from '@/components/board/BoardCard.vue';
import { useAxios } from '@/hooks/useAxios';

// 게시글 목록 조회 API
const {
	execute,
	data: boards,
	loading,
} = useAxios(
	'/board/list',
	{ method: 'get' },
	{
		immediate: true,
	},
);

// refresh
/* const refresh = () => {
	execute();
}; */
</script>

<style lang="scss" scoped></style>
