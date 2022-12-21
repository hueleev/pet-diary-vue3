<template>
	<v-progress-circular
		class="d-flex ma-auto mt-10"
		indeterminate
		v-if="loading"
	></v-progress-circular>
	<v-row>
		<template v-for="board in boards" :key="board.boardSn">
			<BoardCard
				:boardSn="board.boardSn"
				:title="board.boardTitle"
				:content="board.boardCnt"
				:boardWriter="board.boardWriter"
				:createDt="board.create_dt"
				:updateDt="board.update_dt"
			></BoardCard>
		</template>
	</v-row>
</template>

<script setup>
import BoardCard from '@/components/board/BoardCard.vue';
import { useAxios } from '@/hooks/useAxios';

defineProps({
	boards: Array,
});

const { data: boards, loading } = useAxios(
	'/board/list',
	{ method: 'get' },
	{
		immediate: true,
	},
);
</script>

<style lang="scss" scoped></style>
