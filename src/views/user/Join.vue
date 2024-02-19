<template>
	<div class="d-flex h-screen align-center py-5">
		<v-card
			class="mx-auto my-auto card"
			variant="outlined"
			width="400"
			:max-width="mobile ? '90%' : '50%'"
			max-height="90%"
			style="overflow: hidden auto"
		>
			<v-img :src="imgUrl" height="250px" width="100%" cover />
			<v-card-title align="center">JOIN</v-card-title>
			<!-- 1. 휴대폰 인증-->
			<template v-if="!userInfo.mobilePhone">
				<MPhone @sendPhoneNumber="sendPhoneNumber" />
			</template>
			<!-- 2. 항목 입력 -->
			<v-form v-else @submit.prevent="joinProcess">
				<v-container style="overflow: hidden auto">
					<!-- 휴대폰 번호 -->
					<v-text-field
						v-model="userInfo.mobilePhone"
						label="MOBILE"
						variant="underlined"
						disabled
					/>
					<!-- 사용자 ID / 중복확인 -->
					<v-row>
						<v-col cols="9">
							<v-text-field
								v-model="userInfo.userId"
								label="ID"
								variant="underlined"
								:rules="[rules.required]"
								:disabled="duplicateChk"
							>
							</v-text-field>
						</v-col>
						<v-col cols="2">
							<v-btn
								:disabled="duplicateChk"
								@click="checkDuplicateId(userInfo.userId)"
								>중복확인</v-btn
							>
						</v-col>
					</v-row>
					<!-- 비밀번호 / 비밀번호 확인 -->
					<v-text-field
						v-model="userInfo.password"
						label="PASSWORD"
						type="password"
						variant="underlined"
						:rules="[rules.required]"
					/>
					<v-text-field
						v-model="userInfo.passwordChk"
						label="PASSWORD 한번 더!"
						type="password"
						variant="underlined"
						:rules="[rules.required, rules.passwordChk]"
					/>
					<!-- 비밀번호 찾기 질문 -->
					<v-text-field
						v-model="userInfo.idLostAnswer"
						:label="`비번 찾기 질문 - ${userInfo.idLostQuestion}`"
						variant="underlined"
						:rules="[rules.required]"
					/>
					<!-- 멍멍이 이름 -->
					<v-text-field
						v-model="userInfo.userName"
						label="DOG'S NAME"
						variant="underlined"
						:rules="[rules.required]"
					/>
					<!-- 사용자 이메일 -->
					<v-text-field
						v-model="userInfo.email"
						label="EMAIL"
						variant="underlined"
						:rules="[rules.required, rules.email]"
					/>
					<!-- 성별 -->
					<v-select
						v-model="userInfo.gender"
						label="GENDER"
						:items="['M', 'F']"
					></v-select>
					<!-- 생일 -->
					<v-date-picker
						v-model="userInfo.birthday"
						title="🤍Birthday🤍"
						:max="new Date()"
					/>
				</v-container>
				<v-divider />
				<v-card-actions>
					<v-spacer />
					<!-- 약관 확인 -->
					<v-btn
						type="button"
						variant="outlined"
						color="black"
						@click="openModal"
					>
						약관
					</v-btn>
					<v-btn type="submit" variant="outlined" color="black"> JOIN </v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</div>
	<Stplat
		:show="showModal"
		:stplatInfo="stplatInfo"
		@close="closeModal"
	></Stplat>
</template>

<script setup>
import MPhone from './MPhone.vue';
import Stplat from './Stplat.vue';

import imgUrl from '@/assets/img/join.jpg';
import sha256 from 'sha256';

import { ref, reactive, toRefs, watchEffect } from 'vue';
import { useDisplay } from 'vuetify';
import { useAlert } from '@/composables/alert';
import { useRouter } from 'vue-router';

import { checkExistUserId, getStplat, registerUser } from '@/api/openApi';

const { mobile } = useDisplay(); // 모바일 확인
const { vAlert, vSuccess } = useAlert();
const router = useRouter();

const userInfo = ref({
	userId: '',
	password: '',
	passwordChk: '',
	userName: '',
	mobilePhone: '',
	gender: 'M',
	idLostQuestion: '가장 좋아하는 견종은?',
	idLostAnswer: '',
	birthday: new Date(),
	platformStplat: [],
});

const sendPhoneNumber = value => {
	userInfo.value.mobilePhone = value;
};

const duplicateChk = ref(false);
const checkDuplicateId = userId => {
	if (!userId) {
		vAlert('ID를 입력해주개');
	} else {
		checkExistUserId(userId).then(({ exist }) => {
			duplicateChk.value = false;
			if (exist) {
				vAlert('이미 존재하는 아이디개.. 바꾸개..');
				return;
			}
			vSuccess('사용할 수 있는 ID개!');
			duplicateChk.value = true;
		});
	}
};

const joinProcess = async () => {
	confirm();
	if (!validInfo.valid) {
		vAlert(validInfo.message);
	} else {
		registerUser({
			...userInfo.value,
			password: sha256(userInfo.value.password),
		}).then(({ result }) => {
			if (result === 'success') {
				vSuccess('가입이 완료되었개', () => {
					router.push({
						name: 'login',
					});
				});
			}
		});
	}
	// await login({ userId: username.value, userPw: password.value }).then(
	// 	response => {
	// 		console.log('response', response);
	// 	},
	// );
};

// 약관
const stplatInfo = ref({
	stplatSn: null,
	stplatNm: '',
	stplatCn: '',
	agreeYn: 'N',
});
getStplat().then(res => {
	const { stplatSn, stplatNm, stplatCn } = res[0];
	stplatInfo.value.stplatSn = stplatSn;
	stplatInfo.value.stplatNm = stplatNm;
	stplatInfo.value.stplatCn = stplatCn;
});

const showModal = ref(false);
const openModal = () => {
	showModal.value = true;
};
const closeModal = agree => {
	stplatInfo.value.agreeYn = agree ? 'Y' : 'N';
	showModal.value = false;
};

watchEffect(() => {
	if (stplatInfo.value.stplatSn != null) {
		if (userInfo.value.platformStplat.length == 0) {
			userInfo.value.platformStplat.push({
				stplatSn: stplatInfo.value.stplatSn,
				agreeYn: 'N',
			});
		}
		userInfo.value.platformStplat[0].agreeYn = stplatInfo.value.agreeYn;
	}
});

// 가입 검증
const validInfo = reactive({
	message: '',
	valid: false,
});
const confirm = () => {
	const { message, valid } = toRefs(validInfo);
	const { platformStplat } = userInfo.value;
	if (!duplicateChk.value) {
		message.value = '아이디 중복확인 해주개...';
		return;
	}

	if (platformStplat[0].agreeYn == 'N') {
		message.value = '약관 동의해주개...';
		return;
	}
	valid.value = true;
};

const rules = ref({
	required: value => !!value || '필수항목 확인해주개..',
	passwordChk: value =>
		userInfo.value.password == value || 'PASSWORD 확인 함 해주개..',
	email: value => {
		if (/.+@.+\..+/.test(value)) return true;
		return '이메일 형식이 안 맞개..';
	},
});
</script>
