<template>
	<v-card>
		<v-navigation-drawer
			permanent
			expand-on-hover
			wide
			rail
			style="border-color: black"
		>
			<!-- expand-on-hover -->
			<v-list>
				<v-list-item
					:prepend-avatar="imgUrl"
					title="MOZZI"
					subtitle="ymz@gmailcom"
				>
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
	</v-card>
</template>

<script setup>
import imgUrl from '../assets/img/avatar.png';
</script>
