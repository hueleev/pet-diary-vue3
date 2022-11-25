<template>
	<v-row>
		<template v-for="board in boards" :key="board.boardSn">
			<BoardCard
				:title="board.boardTitle"
				:content="board.boardCnt"
				:createDt="board.create_dt"
				:updateDt="board.update_dt"
			></BoardCard>
		</template>
	</v-row>
</template>

<script setup>
import BoardCard from '@/components/board/BoardCard.vue';

defineProps({
	boards: Array,
});
</script>

<style lang="scss" scoped></style>
