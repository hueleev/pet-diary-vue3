<template>
	<div class="d-flex h-screen align-center py-5">
		<v-card
			class="mx-auto"
			variant="outlined"
			width="400"
			:max-width="mobile ? '90%' : '50%'"
		>
			<v-form @submit.prevent="loginProcess">
				<v-img :src="imgUrl" height="250px" cover />
				<v-card-title align="center">LOGIN</v-card-title>

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
					<v-btn type="submit" variant="outlined" color="black"> LOGIN </v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</div>
</template>

<script setup>
import imgUrl from '../../assets/img/login.png';
import sha256 from 'sha256';
import { useDisplay } from 'vuetify';
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { useAlert } from '@/composables/alert';
import { useRouter } from 'vue-router';
const { mobile } = useDisplay(); // 모바일 확인
const { vAlert } = useAlert();
const { SET_LOGIN, SET_USER_INFO } = useUserStore();

const userId = ref('');
const userPw = ref('');
const router = useRouter();

const loginProcess = async () => {
	SET_LOGIN({
		userId: userId.value,
		userPw: sha256(userPw.value),
	})
		.then(async () => {
			await SET_USER_INFO().then(() => {
				router.push({
					name: 'board',
				});
			});
		})
		.catch(() => {
			vAlert('로그인 정보를 확인해주개');
		});
};
</script>

<style lang="scss" scoped></style>
