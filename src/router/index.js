import { createRouter, createWebHistory } from 'vue-router';
import Board from '../views/board/Board.vue';
import Diary from '../views/Diary.vue';
import Dogs from '../views/Dogs.vue';
import Painting from '../views/Painting.vue';

import Login from '../views/user/Login.vue';
import Join from '../views/user/Join.vue';

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
			component: Board,
		},
		{
			path: '/diary',
			name: 'diary',
			component: Diary,
		},
		{
			path: '/dogs',
			name: 'dogs',
			component: Dogs,
		},
		{
			path: '/painting',
			name: 'painting',
			component: Painting,
		},
		{
			path: '/user',
			name: 'user',
			children: [
				{
					path: 'login',
					name: 'login',
					component: Login,
				},
				{
					path: 'join',
					name: 'join',
					component: Join,
				},
			],
		},
	],
});

export default router;
