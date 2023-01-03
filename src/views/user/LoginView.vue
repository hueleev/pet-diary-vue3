<template>
	<div class="d-flex h-screen align-center">
		<v-card
			class="mx-auto"
			variant="outlined"
			width="400"
			:max-width="mobile ? '90%' : '50%'"
		>
			<v-img :src="imgUrl" height="250px" cover />
			<v-card-title align="center">LOGIN 개발중</v-card-title>
			<v-container>
				<v-text-field v-model="userId" label="id" variant="underlined" />
				<v-text-field
					v-model="userPw"
					type="password"
					label="password"
					variant="underlined"
				/>
			</v-container>
			<v-divider />
			<v-card-actions>
				<v-spacer />
				<v-btn variant="outlined" color="black" @click="loginProcess">
					LOGIN
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script setup>
import imgUrl from '../../assets/img/login.png';
import sha256 from 'sha256';
import { useDisplay } from 'vuetify';
import { ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { useAlert } from '@/composables/alert';

const { mobile } = useDisplay(); // 모바일 확인
const { vAlert } = useAlert();
const { SET_LOGIN, SET_USER_INFO } = useUserStore();

const userId = ref('');
const userPw = ref('');

const loginProcess = async () => {
	await SET_LOGIN({
		userId: userId.value,
		userPw: sha256(userPw.value),
	})
		.then(async res => {
			console.log('res', res);
			await SET_USER_INFO().then(res2 => {
				console.log('res2', res2);
			});
		})
		.catch(() => {
			vAlert('로그인 정보를 확인해주개');
		});
};
</script>

<style lang="scss" scoped></style>
