import { defineStore } from 'pinia';
import { login } from '@/api/authApi';
import { getUserInfo } from '@/api/openApi';

export const useUserStore = defineStore('user', {
	state: () => ({
		token: null,
		refreshToken: null,
		userInfo: null,
	}),
	getters: {},
	actions: {
		async SET_LOGIN(data) {
			console.log(data);
			const { userId, userPw } = data;
			return await login({ userId, userPw }).then(
				({ access_token, refresh_token }) => {
					this.token = access_token;
					this.refreshToken = refresh_token;
				},
			);
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
