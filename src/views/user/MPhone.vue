<template>
	<v-form>
		<v-container style="overflow: hidden auto">
			<v-row>
				<v-col cols="9">
					<v-text-field
						v-model="mobilePhone.phoneNumber"
						label="MOBILE (- 제외)"
						variant="underlined"
						:rules="[rules.required, rules.mobile]"
						:disabled="mobilePhone.valid"
					/>
				</v-col>
				<v-col cols="2">
					<v-btn
						:disabled="mobilePhone.valid"
						@click="validMobilePhone(mobilePhone.phoneNumber)"
					>
						인증
					</v-btn>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="9">
					<v-text-field
						v-model="mobilePhone.input"
						label="MOBILE 인증번호"
						variant="underlined"
						:disabled="mobilePhone.valid || !mobilePhone.authCode"
						:rules="[rules.required]"
					/>
				</v-col>
				<v-col cols="2">
					<v-btn
						:disabled="mobilePhone.valid || !mobilePhone.input"
						@click="checkAuthCode"
					>
						번호확인
					</v-btn>
				</v-col>
			</v-row>
		</v-container>
		<v-divider />
		<v-card-actions>
			<v-spacer />
			<v-btn
				type="button"
				variant="outlined"
				color="black"
				:disabled="!mobilePhone.valid"
				@click="goNextStep"
			>
				다음
			</v-btn>
		</v-card-actions>
	</v-form>
</template>

<script setup>
import { ref } from 'vue';
import { useAlert } from '@/composables/alert';
import { identifyMPhone, registerService } from '@/api/openApi';
import { useRouter } from 'vue-router';
const { vAlert, vSuccess, vConfirm } = useAlert();

const mobilePhone = ref({
	phoneNumber: '',
	authCode: '',
	input: '',
	valid: false,
	platformUser: false,
	serviceUser: false,
	userId: '',
});

const validMobilePhone = value => {
	identifyMPhone({ mobilePhone: value }).then(
		({ authCode, platformUser, serviceUser, userId }) => {
			mobilePhone.value = {
				...mobilePhone.value,
				authCode,
				platformUser,
				serviceUser,
				userId,
			};
		},
	);
};

const checkAuthCode = () => {
	if (mobilePhone.value.input != mobilePhone.value.authCode) {
		vAlert('인증 번호가 틀리개 ..');
	} else {
		vSuccess('인증 성공!');
		mobilePhone.value.valid = true;
	}
};

const router = useRouter();
const goNextStep = () => {
	const { valid, serviceUser, platformUser } = mobilePhone.value;
	if (!valid) {
		vAlert('휴대폰번호 인증완료해주개..');
		return;
	}
	if (serviceUser) {
		vAlert('이미 펫다이어리에 가입했개.. 로그인 해주개.');
		return;
	}

	if (platformUser) {
		vConfirm(
			`헬스케어 플랫폼 가입자개.. (ID: ${mobilePhone.value.userId}) <br/> 펫다이어리 서비스에 가입할거개?`,
			() => {
				registerService({
					serviceId: import.meta.env.VITE_APP_CLIENT_ID,
					userId: mobilePhone.value.userId,
				}).then(({ result }) => {
					if (result == 'success') {
						vSuccess('서비스가입이 완료되었개', () => {
							router.push({
								name: 'login',
							});
						});
					}
				});
			},
			() => {
				console.log('플랫폼 가입안해');
			},
		);
	} else {
		sendPhoneNumber(mobilePhone.value.phoneNumber);
	}
};

const sendPhoneNumber = () => {
	emits('sendPhoneNumber', mobilePhone.value.phoneNumber);
};

const rules = ref({
	required: value => !!value || '필수항목 확인해주개..',
	mobile: value => {
		if (/^01([0|7])[0-9]{4}[0-9]{4}$/.test(value)) {
			return true;
		}
		return '핸드폰 번호 형식이 안 맞개..';
	},
});

const emits = defineEmits(['sendPhoneNumber']);
</script>

<style lang="scss" scoped></style>
