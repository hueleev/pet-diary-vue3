<template>
	<v-card
		variant="outlined"
		title="모찌에게"
		:max-width="mobile ? '100%' : '50%'"
		class="mx-auto"
	>
		<v-container>
			<v-text-field
				v-model="title"
				label="title"
				variant="underlined"
			></v-text-field>

			<v-text-field
				v-model="content"
				label="content"
				variant="underlined"
			></v-text-field>

			<v-text-field
				v-model="writer"
				label="writer"
				variant="underlined"
			></v-text-field>
		</v-container>
		<v-divider></v-divider>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn variant="tonal" color="black" @click="save">안녕!</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import { useAxios } from '@/hooks/useAxios';
import sha256 from 'sha256';
const { mobile } = useDisplay();

const title = ref('');
const content = ref('');
const writer = ref('');

const emit = defineEmits(['changeType']);

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

const save = async () => {
	execute({
		boardTitle: title.value,
		boardCnt: content.value,
		boardWriter: writer.value,
		boardPwd: sha256(writer.value),
	});
};
</script>

<style lang="scss" scoped></style>
