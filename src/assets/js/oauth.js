import qs from 'querystring';
import axios from 'axios';

export default {
	// 인증토큰 발급 요청(Authorization Code Grant)
	authorizationCode: function (config) {
		var authorizationCodeData = {
			client_id: config.client_id,
			redirect_uri: config.redirect_uri,
			response_type: 'code',
			scope: config.scope,
			state: config.state,
		};

		var queryStringData = qs.stringify(authorizationCodeData);

		location.href = config.authorize + '?' + queryStringData;
	},
	// Code를 이용한 인증 토큰 발급 요청(Authorization Code Grant)
	getToken: function (config, code) {
		var getTokenData = {
			code: code,
			redirect_uri: config.redirect_uri,
			grant_type: 'authorization_code',
		};

		var queryStringData = qs.stringify(getTokenData);

		return axios({
			method: 'POST',
			url: config.token,
			auth: {
				username: config.client_id,
				password: config.client_secret,
			},
			data: queryStringData,
		})
			.then(response => response.data)
			.catch(error => {
				throw error.response;
			});
	},
	// 인증토큰 발급 요청(Implicit Grant)
	implicit: function (config) {
		var implicitData = {
			client_id: config.client_id,
			redirect_uri: config.redirect_uri,
			response_type: 'token',
			scope: config.scope,
			state: config.state,
		};

		var queryStringData = qs.stringify(implicitData);

		location.href = config.authorize + '?' + queryStringData;
	},
	// 인증토큰 발급 요청(Client Credentials Grant)
	clientCredentials: function (config) {
		var clientCredentialsData = {
			grant_type: 'client_credentials',
			scope: config.scope,
		};

		return axios({
			method: 'POST',
			url: config.token,
			auth: {
				username: config.client_id,
				password: config.client_secret,
			},
			data: qs.stringify(clientCredentialsData),
		})
			.then(response => response.data)
			.catch(error => {
				throw error.response;
			});
	},
	// 인증토큰 발급 요청(Resource Owner Password Credentials Grant)
	passwordCredentials: function (config, userInfo) {
		var passwordCredentialsData = {
			grant_type: 'password',
			username: userInfo.userId,
			password: userInfo.userPw,
			scope: config.scope,
		};

		return axios({
			method: 'POST',
			url: config.token,
			auth: {
				username: config.client_id,
				password: config.client_secret,
			},
			data: qs.stringify(passwordCredentialsData),
		})
			.then(response => response.data)
			.catch(error => {
				throw error.response;
			});
	},
	// 인증토큰 재발급 요청(Refresh)
	refresh: function (config, refresh_token) {
		var refreshData = {
			grant_type: 'refresh_token',
			refresh_token: refresh_token,
			scope: config.scope,
		};

		return axios({
			method: 'POST',
			url: config.token,
			auth: {
				username: config.client_id,
				password: config.client_secret,
			},
			data: qs.stringify(refreshData),
		})
			.then(response => response.data)
			.catch(error => {
				throw error.response;
			});
	},
};
