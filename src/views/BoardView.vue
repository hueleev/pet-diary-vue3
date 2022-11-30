<template>
	<div class="d-flex justify-center">
		<v-btn-toggle
			variant="outlined"
			v-model="toggleType"
			style="margin: 8px"
			mandatory
		>
			<v-btn value="list">list</v-btn>
			<v-btn value="write">write</v-btn>
			<!-- <v-btn
				color="black"
				@click="type = 'another'"
				:variant="type == 'another' ? 'flat' : 'outlined'"
				>2</v-btn
			> -->
		</v-btn-toggle>
		<!-- <v-btn
			prepend-icon="mdi-format-list-bulleted"
			variant="outlined"
			@click="test"
			>list</v-btn
		> -->
	</div>
	<v-divider color="black" />
	<v-container fluid>
		<v-progress-circular
			class="d-flex ma-auto mt-10"
			indeterminate
			v-if="loading"
		></v-progress-circular>
		<BoardList v-if="toggleType == 'list'" :boards="boards"></BoardList>
		<BoardWrite
			v-if="toggleType == 'write'"
			@changeType="changeType"
		></BoardWrite>

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

const toggleType = ref('list');

const {
	data: boards,
	execute,
	loading,
} = useAxios(
	'/board/list',
	{ method: 'get' },
	{
		immediate: false,
	},
);

watchEffect(() => {
	if (toggleType.value == 'list') {
		execute();
	}
});

const changeType = value => {
	toggleType.value = value;
};
document.querySelector(':root').style.setProperty('--v-activated-opacity', 0);
</script>
