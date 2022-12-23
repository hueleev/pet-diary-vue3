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
		</v-btn-toggle>
	</div>
	<v-divider color="black" />
	<v-container fluid>
		<BoardList v-if="toggleType == 'list'" />
		<BoardWrite v-if="toggleType == 'write'" @changeType="changeType" />
	</v-container>
</template>

<script setup>
import BoardList from '@/components/board/BoardList.vue';
import BoardWrite from '@/components/board/BoardWrite.vue';
import { ref } from 'vue';

const toggleType = ref('list');

const changeType = value => {
	toggleType.value = value;
};

document.querySelector(':root').style.setProperty('--v-activated-opacity', 0);
</script>
