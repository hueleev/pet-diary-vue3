import { createRouter, createWebHistory } from 'vue-router';
import BoardView from '../views/BoardView.vue';

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
			component: () => import('../views/GroomingView.vue'),
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AboutView.vue'),
		},
	],
});

export default router;
