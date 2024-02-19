<template>
	<v-card
		class="mx-auto"
		variant="outlined"
		title="모찌에게"
		:max-width="props.type == 'insert' && !mobile ? '50%' : '100%'"
	>
		<v-container>
			<v-text-field
				:label="checkInsert('제목', '')"
				variant="underlined"
				placeholder="모찌야"
				:value="title"
				@update:modelValue="value => $emit('update:title', value)"
			/>
			<v-text-field
				:label="checkInsert('내용', '')"
				variant="underlined"
				placeholder="넌 너무 귀여어"
				:value="content"
				@update:modelValue="value => $emit('update:content', value)"
			/>
			<v-text-field
				:label="checkInsert('글쓴이', '')"
				:color="checkInsert('black', 'error')"
				variant="underlined"
				placeholder="온니가"
				:readonly="checkInsert(false, true)"
				:value="writer"
				@update:modelValue="value => $emit('update:writer', value)"
			/>
			<v-text-field
				type="password"
				:label="checkInsert('비밀번호', '')"
				variant="underlined"
				placeholder="비밀번호"
				:value="password"
				@update:modelValue="value => $emit('update:password', value)"
			/>
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

const { mobile } = useDisplay(); // 모바일 확인

// event emit
defineEmits([
	'update:title',
	'update:content',
	'update:writer',
	'update:password',
]);

//  게시글 내용
const props = defineProps({
	type: String,
	title: String,
	content: String,
	writer: String,
	password: String,
});

// insert 타입이면 v1 return, update 타입이면 v2 return
const checkInsert = (v1, v2) => {
	if (props.type == 'insert') {
		return v1;
	} else {
		return v2;
	}
};
</script>

<style lang="scss" scoped></style>
