import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../views/BoardView.vue';
import GroomingView from '../views/GroomingView.vue';
import PaintingView from '../views/PaintingView.vue';

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
			path: '/grooming',
			name: 'grooming',
			component: GroomingView,
		},
		{
			path: '/painting',
			name: 'painting',
			component: PaintingView,
		},
	],
});

export default router;
