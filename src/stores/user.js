import { defineStore } from 'pinia';
import { login } from '../api/authApi';
import { getUserInfo } from '../api/openApi';

export const useUserStore = defineStore('user', {
	state: () => ({
		token: null,
		refreshToken: null,
		userInfo: null,
	}),
	getters: {},
	actions: {
		async SET_LOGIN({ userId, userPw }) {
			const response = await login({ userId, userPw });
			this.token = response.access_token;
			console.log('pinia', this.token);
			this.refreshToken = response.refresh_token;
			return response;
		},
		async SET_USER_INFO() {
			const response = await getUserInfo();
			this.userInfo = response;
			return response;
		},
		SET_LOGOUT() {
			this.token = null;
			this.refreshToken = null;
			this.userInfo = null;
		},
	},
	persist: true,
});
