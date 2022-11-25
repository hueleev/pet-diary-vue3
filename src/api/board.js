import { board } from '.';

export function getBoardList() {
	return board.get('/list');
}

export function getBoard(boardSn) {
	return board.get(`/${boardSn}`);
}

export function insertBoard(data) {
	return board.post('/', data);
}

export function deleteBoard(boardSn) {
	return board.delete(`/${boardSn}`);
}
