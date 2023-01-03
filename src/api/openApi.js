import { storeToRefs } from 'pinia';
import OpenAPI from '../assets/js/openApi';
import { useUserStore } from '../stores/user';
import { HandleError, API_CONFIG } from './common/common';

// ------- 토큰 사용하는 경우 ------- //
/**
 * 회원 정보 조회
 * @returns
 */
function getUserInfo() {
	const { token } = storeToRefs(useUserStore());
	const config = {
		baseUrl: `${import.meta.env.VITE_APP_URL_OPENAPI}`,
		accessToken: `${token.value}`,
	};
	return OpenAPI.fetchUserInfo(config).catch(err => HandleError(err));
}

export { getUserInfo };
