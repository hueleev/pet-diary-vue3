<template>
	<v-dialog v-model="showModal" :max-width="mobile ? '100%' : '50%'">
		<v-card class="py-3">
			<v-card-title>{{ stplatInfo.stplatNm }}</v-card-title>
			<v-card-text>
				<div class="px-3" v-html="stplatInfo.stplatCn" />
				<div class="justify-end">
					<v-checkbox
						class="d-flex justify-end"
						v-model="agree"
						label="동의합니다"
					/>
				</div>
			</v-card-text>
			<v-card-actions class="d-flex justify-end">
				<v-btn color="black" variant="outlined" @click="$emit('close', agree)"
					>닫기</v-btn
				>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { ref } from 'vue';
import { computed } from 'vue';
const { mobile } = useDisplay(); // 모바일 확인

const props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
	stplatInfo: {
		type: Object,
	},
});
const showModal = computed(() => props.show);

const agree = ref(false);

defineEmits(['close']);
</script>

<style lang="scss" scoped></style>
