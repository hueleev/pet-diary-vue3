<template>
	<v-navigation-drawer
		v-model="drawer"
		:rail="rail"
		permanent
		style="border-color: black"
		:touchless="true"
		@click.stop="rail = false"
	>
		<!-- 
		rail -->
		<v-list>
			<v-list-item nav>
				<v-img
					:src="imgUrl"
					@click.stop="rail = !rail"
					style="max-width: 100%; border-radius: 100%"
				></v-img>
			</v-list-item>
			<template v-if="!rail">
				<v-list-item>
					<template v-slot:title>
						<v-btn variant="text" size="large" @click="goPage('login')">
							login
						</v-btn>
						<v-btn variant="text" size="large" @click="goPage('join')">
							join
						</v-btn>
						<!-- MOZZI -->
					</template>
					<template v-slot:append>
						<v-btn
							variant="text"
							size="small"
							icon="mdi-chevron-left"
							@click.stop="rail = !rail"
						></v-btn>
					</template>
					<!-- :prepend-avatar="imgUrl" -->
				</v-list-item>
			</template>
		</v-list>

		<v-divider color="black"></v-divider>

		<v-list density="compact" nav>
			<v-list-item
				prepend-icon="mdi-folder"
				title="Board"
				:active="$route.name == 'board'"
				value="myboard"
				to="/board"
			>
			</v-list-item>
			<v-list-item
				prepend-icon="mdi-dog"
				title="Dogs"
				value="dogs"
				:active="$route.name == 'dogs'"
				to="/dogs"
			></v-list-item>
			<v-list-item
				prepend-icon="mdi-palette"
				title="Painting"
				value="painting"
				:active="$route.name == 'painting'"
				to="/painting"
			></v-list-item>
			<!-- <v-list-item
						prepend-icon="mdi-star"
						title="Starred"
						value="starred"
						aria-disabled="true"
					></v-list-item> -->
		</v-list>
	</v-navigation-drawer>
	<slot></slot>
</template>

<script setup>
import { ref } from 'vue';
import imgUrl from '../assets/img/avatar.png';
// import imgUrl2 from '../assets/img/avatar2.png';
// import imgUrl3 from '../assets/img/avatar3.jpg';
import { useRouter } from 'vue-router';
const drawer = ref(true);
const rail = ref(true);

const router = useRouter();
const goPage = name => {
	router.push({
		name,
	});
};
</script>
