import OAuth from '../assets/js/oauth';
import { HandleError, OAUTH_CONFIG } from './common/common';

function login({ userId, userPw }) {
	return OAuth.passwordCredentials(OAUTH_CONFIG, { userId, userPw }).catch(
		err => {
			if (err.status != 401) {
				HandleError(err);
			}
		},
	);
}

function getRefreshToken(refreshToken) {
	return OAuth.refresh(OAUTH_CONFIG, refreshToken).catch(err =>
		HandleError(err),
	);
}

export { login, getRefreshToken };
