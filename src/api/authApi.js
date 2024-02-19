import OAuth from '../assets/js/oauth';
import { HandleError, OAUTH_CONFIG } from './common/common';

/**
 * 로그인
 * @param {*} param0
 * @returns
 */
function login({ userId, userPw }) {
	console.log(userId);
	return OAuth.passwordCredentials(OAUTH_CONFIG, { userId, userPw }).catch(
		err => {
			if (err.status != 401) {
				HandleError(err);
			}
		},
	);
}

/**
 * 토큰 갱신
 * @param {*} refreshToken
 * @returns
 */
function getRefreshToken(refreshToken) {
	return OAuth.refresh(OAUTH_CONFIG, refreshToken).catch(err =>
		HandleError(err),
	);
}

export { login, getRefreshToken };
