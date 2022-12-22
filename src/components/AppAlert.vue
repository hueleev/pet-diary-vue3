<template>
	<!-- <v-alert
			v-for="({ message, type }, index) in alert"
			:key="index"
			class="alert"
			icon="$error"
			role="alert"
			variant="tonal"
			:color="typeStyle(type)"
			:style="`border: 1px ${typeStyle(type)} solid; z-index:3000`"
			:text="message"
		>
		</v-alert> -->
	<template v-if="alerts.length !== 0">
		<v-dialog
			hide-overlay
			v-for="({ message, type }, index) in alerts"
			:key="index"
			v-model="dialog"
		>
			<v-alert
				class="alert"
				icon="$error"
				variant="tonal"
				:color="typeStyle(type)"
				:style="`border: 1px ${typeStyle(type)} solid;`"
			>
				<div v-html="message"></div>
			</v-alert>
		</v-dialog>
	</template>
</template>

<script setup>
import { useAlert } from '@/composables/alert';
import { ref } from 'vue';

const { alerts } = useAlert();
const dialog = ref(true);
const typeStyle = type => (type === 'error' ? 'red' : 'black');
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
