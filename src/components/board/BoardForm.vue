<template>
	<v-card
		class="mx-auto"
		variant="outlined"
		title="모찌에게"
		:max-width="mobile ? '100%' : '50%'"
	>
		<v-container>
			<v-text-field
				:label="type == 'insert' ? '제목' : ''"
				variant="underlined"
				placeholder="모찌야"
				:value="title"
				@update:modelValue="value => $emit('update:title', value)"
			>
			</v-text-field>
			<v-text-field
				:label="type == 'insert' ? '내용' : ''"
				variant="underlined"
				placeholder="넌 너무 귀여어"
				:value="content"
				@update:modelValue="value => $emit('update:content', value)"
			>
			</v-text-field>
			<v-text-field
				:label="type == 'insert' ? '글쓴이' : ''"
				:color="type == 'update' ? 'error' : 'black'"
				variant="underlined"
				placeholder="온니가"
				:readonly="type == 'update'"
				:value="writer"
				@update:modelValue="value => $emit('update:writer', value)"
			>
			</v-text-field>
			<v-text-field
				:label="type == 'insert' ? '비밀번호' : ''"
				variant="underlined"
				placeholder="비밀번호"
				type="password"
				:value="password"
				@update:modelValue="value => $emit('update:password', value)"
			>
			</v-text-field>
		</v-container>
		<v-divider></v-divider>
		<v-card-actions>
			<v-spacer></v-spacer>
			<slot name="actions" />
		</v-card-actions>
	</v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();

defineProps({
	type: String,
	title: String,
	content: String,
	writer: String,
	password: String,
});
defineEmits([
	'update:title',
	'update:content',
	'update:writer',
	'update:password',
]);
</script>

<style lang="scss" scoped></style>
