<template>
	<div class="d-flex justify-center" style="gap: 1rem; margin: 18px">
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
		<BoardList v-if="type == 'list'"></BoardList>
	</v-container>
</template>

<script setup>
import BoardList from '@/components/board/BoardList.vue';
import { ref } from 'vue';

const type = ref('list');
</script>
