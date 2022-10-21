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
			<v-list-item
				:prepend-avatar="imgUrl"
				title="MOZZI"
				subtitle="ymz@gmailcom"
				nav
			>
				<template v-slot:append>
					<v-btn
						variant="text"
						icon="mdi-chevron-left"
						@click.stop="rail = !rail"
					></v-btn>
				</template>
			</v-list-item>
		</v-list>

		<v-divider color="black"></v-divider>

		<v-list density="compact" nav>
			<v-list-item
				prepend-icon="mdi-folder"
				title="Board"
				:active="$route.name == 'board'"
				value="myboard"
				to="board"
			>
			</v-list-item>
			<v-list-item
				prepend-icon="mdi-account-multiple"
				title="Grooming"
				value="grooming"
				:active="$route.name == 'grooming'"
				to="grooming"
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
const drawer = ref(true);
const rail = ref(true);
</script>
