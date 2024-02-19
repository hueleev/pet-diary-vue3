import { storeToRefs } from 'pinia';
import OpenAPI from '../assets/js/openApi';
import { useUserStore } from '../stores/user';
import { HandleError, API_CONFIG } from './common/common';
import dayjs from 'dayjs';
// ------- 토큰 사용하지 않는 경우 ------- //
/**
 * 신규회원가입
 */
function registerUser(data) {
	return OpenAPI.register(API_CONFIG, {
		...data,
		serviceId: import.meta.env.VITE_APP_CLIENT_ID,
		birthday: dayjs(data.dayjs).format('YYYY-MM-DD'),
	}).catch(err => {
		HandleError(err);
	});
}

/**
 * 기존회원가입
 */
function registerService(data) {
	return OpenAPI.registerService(API_CONFIG, data).catch(err => {
		HandleError(err);
	});
}

/**
 * 중복 ID 체크
 * @param {*} userId
 * @returns
 */
function checkExistUserId(userId) {
	return OpenAPI.checkExistUserId(API_CONFIG, { userId }).catch(err => {
		HandleError(err);
	});
}

/**
 * 핸드폰 인증
 */
function identifyMPhone(data) {
	return OpenAPI.identifyMobilePhone(API_CONFIG, data).catch(err => {
		HandleError(err);
	});
}

/**
 * 약관 목록 조회
 */
function getStplat() {
	return OpenAPI.fetchStplat(API_CONFIG).catch(err => {
		HandleError(err);
	});
}

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

export {
	registerUser,
	registerService,
	checkExistUserId,
	identifyMPhone,
	getStplat,
	getUserInfo,
};
