import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alert', {
	state: () => ({
		alerts: [],
	}),
	actions: {
		// alert
		vAlert(message, type = 'error', callback) {
			this.alerts.push({ message, type });
			setTimeout(() => {
				this.alerts.shift();
				if (callback) {
					callback();
				}
			}, 1500);
		},
		vSuccess(message) {
			this.vAlert(message, 'success');
		},
		vConfirm(message, resolve, reject) {
			this.alerts.push({ message, type: 'confirm', resolve, reject });
		},
		vClose(callback) {
			if (callback) {
				callback();
			}
			this.alerts.shift();
		},
	},
});
