import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';

export const useAlert = () => {
	const { alerts } = storeToRefs(useAlertStore());
	const { vAlert, vSuccess, vConfirm, vClose } = useAlertStore();
	return {
		alerts,
		vAlert,
		vSuccess,
		vConfirm,
		vClose,
	};
};
