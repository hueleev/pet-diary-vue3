<template>
	<template>
		<v-dialog
			hide-overlay
			v-for="(item, index) in alerts"
			:key="index"
			persistent
			v-model="dialog"
		>
			<v-alert
				v-if="item.type == 'confirm'"
				class="alert"
				type="warning"
				variant="tonal"
				:color="typeStyle(item.type)"
				:style="`border: 1px ${typeStyle(item.type)} solid;`"
			>
				<div v-html="item.message"></div>
				<div class="d-flex mt-3" style="gap: 1rem">
					<v-btn variant="tonal" @click="vClose(item.resolve)">🙆 ok</v-btn>
					<v-btn variant="tonal" @click="vClose(item.reject)">🙅‍♀️ no</v-btn>
				</div>
			</v-alert>
			<v-alert
				v-else
				:type="item.type"
				class="alert"
				variant="tonal"
				:color="typeStyle(item.type)"
				:style="`border: 1px ${typeStyle(item.type)} solid;`"
			>
				<!-- icon="$error" -->
				<div v-html="item.message"></div>
			</v-alert>
		</v-dialog>
	</template>
</template>

<script setup>
import { useAlert } from '@/composables/alert';
import { ref } from 'vue';

const { alerts, vClose } = useAlert(); // alert

const dialog = ref(true);

const typeStyle = type => (type === 'error' ? 'red' : 'green');
</script>

<style scoped>
.v-alert--variant-tonal {
	background: white;
}
.alert {
	position: fixed;
	left: 50%;
	bottom: 50%;
	transform: translate(-35%, -50%);
	margin: 0 auto;
}
</style>
