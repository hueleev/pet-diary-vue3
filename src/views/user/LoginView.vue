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
				<v-text-field v-model="username" label="id" variant="underlined" />
				<v-text-field
					v-model="password"
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
import { useDisplay } from 'vuetify';
import { ref } from 'vue';
// import { login } from '../../api/user';

const { mobile } = useDisplay(); // 모바일 확인
const username = ref('');
const password = ref('');

const loginProcess = async () => {
	// await login({ userId: username.value, userPw: password.value }).then(
	// 	response => {
	// 		console.log('response', response);
	// 	},
	// );
};
</script>

<style lang="scss" scoped></style>
