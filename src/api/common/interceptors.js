import { storeToRefs } from 'pinia';
import { HandleError, OAUTH_BASIC_CONFIG } from './common.js';
import { useUserStore } from '/stores/user.js';

function setBasicInterceptors(instance) {
	// Add a request interceptor
	instance.interceptors.request.use(
		function (config) {
			// Do something before request is sent
			config.headers = {
				'Content-Type': 'application/json;charset=utf-8',
			};
			config.auth = OAUTH_BASIC_CONFIG;
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		},
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function (error) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			return Promise.reject(error);
		},
	);
	return instance;
}

function setOauthPwdInterceptors(instance) {
	// Add a request interceptor
	instance.interceptors.request.use(
		function (config) {
			// Do something before request is sent
			// console.log(config);
			config.headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
			};
			config.auth = function setOauthPwdInterceptors(instance) {
				// Add a request interceptor
				instance.interceptors.request.use(
					function (config) {
						// Do something before request is sent
						// console.log(config);
						config.headers = {
							'Content-Type': 'application/x-www-form-urlencoded',
						};
						config.auth = OAUTH_BASIC_CONFIG;
						return config;
					},
					function (error) {
						// Do something with request error
						return Promise.reject(error);
					},
				);

				// Add a response interceptor
				instance.interceptors.response.use(
					function (response) {
						// Any status code that lie within the range of 2xx cause this function to trigger
						// Do something with response data
						return response;
					},
					function (error) {
						// Any status codes that falls outside the range of 2xx cause this function to trigger
						// Do something with response error
						HandleError(error);
						return Promise.reject(error);
					},
				);
				return instance;
			};
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		},
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function (error) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			HandleError(error);
			return Promise.reject(error);
		},
	);
	return instance;
}

function setInterceptors(instance) {
	const store = useUserStore();
	const { token } = storeToRefs(store);

	// Add a request interceptor
	instance.interceptors.request.use(
		function (config) {
			// Do something before request is sent
			// console.log(config);
			config.headers = {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: `Bearer ${token}`,
			};
			return config;
		},
		function (error) {
			// Do something with request error
			return Promise.reject(error);
		},
	);

	// Add a response interceptor
	instance.interceptors.response.use(
		function (response) {
			// Any status code that lie within the range of 2xx cause this function to trigger
			// Do something with response data
			return response;
		},
		function (error) {
			// Any status codes that falls outside the range of 2xx cause this function to trigger
			// Do something with response error
			HandleError(error);
			return Promise.reject(error);
		},
	);
	return instance;
}

export { setBasicInterceptors, setOauthPwdInterceptors, setInterceptors };
