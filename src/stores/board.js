import { defineStore } from 'pinia';

export const useBoardStore = defineStore('board', {
	state: () => ({
		boards: [],
	}),
	getters: {},
	actions: {
		insert(board) {
			const id = this.boards.length + 1;
			this.boards.push({
				id,
				...board,
				createdAt: Date.now(),
			});
		},
	},
});
