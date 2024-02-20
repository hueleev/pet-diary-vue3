<template>
	<v-navigation-drawer
		v-model="drawer"
		:rail="rail"
		permanent
		style="border-color: black"
		:touchless="true"
		@click.stop="rail = false"
	>
		<v-list>
			<v-list-item nav>
				<v-img
					:src="imgUrl"
					@click.stop="rail = !rail"
					style="max-width: 100%; border-radius: 100%"
				/>
			</v-list-item>
			<template v-if="!rail">
				<v-list-item>
					<template v-slot:title>
						<template v-if="token == null">
							<v-btn variant="text" size="large" @click="goPage('login')">
								login
							</v-btn>
							<v-btn variant="text" size="large" @click="goPage('join')">
								join
							</v-btn>
						</template>
						<template v-else>
							<h3>{{ userInfo.userName }}</h3>
							<h4>
								{{ userInfo.email }}
							</h4>
						</template>
					</template>
					<template v-slot:append>
						<v-btn
							variant="tonal"
							size="small"
							icon="mdi-chevron-left"
							@click.stop="rail = !rail"
						/>
					</template>
				</v-list-item>
			</template>
		</v-list>

		<v-divider color="black" />

		<v-list density="compact" nav>
			<v-list-item
				prepend-icon="mdi-folder"
				title="Board"
				:active="$route.name == 'board'"
				value="myboard"
				to="/board"
			/>
			<v-list-item
				prepend-icon="mdi-calendar-blank"
				title="Diary"
				value="diary"
				:active="$route.name == 'diary'"
				to="/diary"
			/>
			<v-list-item
				prepend-icon="mdi-dog"
				title="Dogs"
				value="dogs"
				:active="$route.name == 'dogs'"
				to="/dogs"
			/>
			<v-list-item
				prepend-icon="mdi-palette"
				title="Painting"
				value="painting"
				:active="$route.name == 'painting'"
				to="/painting"
			/>
			<v-list-item
				v-if="token"
				prepend-icon="mdi-star"
				title="Logout"
				value="logout"
				:active="false"
				@click="logout"
			></v-list-item>
		</v-list>
	</v-navigation-drawer>
	<slot />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAlert } from '@/composables/alert';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
import { VNavigationDrawer } from 'vuetify/lib/components/index.mjs';

import imgUrl from '../assets/img/avatar.png';
// import imgUrl2 from '../assets/img/avatar2.png';
// import imgUrl3 from '../assets/img/avatar3.jpg';

const { vConfirm } = useAlert();
const store = useUserStore();
const { SET_LOGOUT } = store;
const { token, userInfo } = storeToRefs(store);

const drawer = ref(true);
const rail = ref(true);

const router = useRouter();

const goPage = name => {
	router.push({
		name,
	});
};

const logout = () => {
	vConfirm(
		'로그아웃할거개?',
		() => {
			SET_LOGOUT();
		},
		() => {
			console.log('no');
		},
	);
};
</script>
