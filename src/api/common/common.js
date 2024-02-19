import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';

// 서비스 인증정보
export const OAUTH_BASIC_CONFIG = {
	username: import.meta.env.VITE_APP_CLIENT_SECRET,
	password: import.meta.env.VITE_APP_CLIENT_SECRET,
	redirectUri: import.meta.env.VITE_APP_REDIRECT_URI,
};

// OAUTH SDK config
export const OAUTH_CONFIG = {
	client_id: `${import.meta.env.VITE_APP_CLIENT_ID}`,
	client_secret: `${import.meta.env.VITE_APP_CLIENT_SECRET}`,
	redirect_uri: `${import.meta.env.VITE_APP_REDIRECT_URI}`,
	authorize: `${import.meta.env.VITE_APP_URL_OAUTH}/oauth/authorize`,
	token: `${import.meta.env.VITE_APP_URL_OAUTH}/oauth/token`,
	scope: 'phr.read phr.write',
	state: '',
};

// OPEN API SDK config
export const API_CONFIG = {
	baseUrl: `${import.meta.env.VITE_APP_URL_OPENAPI}`,
	client_id: `${import.meta.env.VITE_APP_CLIENT_ID}`,
	client_secret: `${import.meta.env.VITE_APP_CLIENT_SECRET}`,
};

/**
 * 오류 공통처리
 * @param {Error} error
 */
export function HandleError(error, message) {
	const router = useRouter();
	const { vAlert } = useAlert();
	console.log('handleError:::', error);
	if (message) {
		vAlert(message);
	} else if (!error) {
		// router.push('/error');
		vAlert('서버와의 통신에 문제가 있습니다.');
	}
	// 401
	else if (error.status === 401) {
		// store.dispatch('auth/REMOVE_VUEX').then(() => {
		vAlert(
			'세션이 만료되었거나 다른 브라우저에서 로그인 하였습니다. 로그인 화면으로 돌아갑니다.',
			'error',
			() => {
				router.push('/user/login');
			},
		);
	} else {
		vAlert('error');
	}
}
