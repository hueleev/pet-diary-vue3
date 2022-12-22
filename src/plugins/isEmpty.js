export default {
	install: app => {
		const isEmpty = value => {
			return value == null || value.length == 0;
		};
		app.provide('isEmpty', isEmpty);
	},
};
