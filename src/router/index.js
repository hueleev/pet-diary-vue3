import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../views/BoardView.vue';
import DogsView from '../views/DogsView.vue';
import PaintingView from '../views/PaintingView.vue';

import LoginView from '../views/user/LoginView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: 'board',
		},
		{
			path: '/board',
			name: 'board',
			component: BoardView,
		},
		{
			path: '/dogs',
			name: 'dogs',
			component: DogsView,
		},
		{
			path: '/painting',
			name: 'painting',
			component: PaintingView,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
		},
	],
});

export default router;
