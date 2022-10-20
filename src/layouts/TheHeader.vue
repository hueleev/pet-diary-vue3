<template>
	<v-card>
		<v-layout>
			<v-navigation-drawer expand-on-hover rail style="border-color: black">
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
						:active="$route.path == '/board'"
						value="myboard"
						to="board"
					></v-list-item>
					<v-list-item
						prepend-icon="mdi-account-multiple"
						title="Grooming"
						value="grooming"
						to="grooming"
					></v-list-item>
					<v-list-item
						prepend-icon="mdi-star"
						title="Starred"
						value="starred"
					></v-list-item>
				</v-list>
			</v-navigation-drawer>
			<slot></slot>
		</v-layout>
	</v-card>
</template>

<script setup>
import imgUrl from '../assets/img/avatar.png';
</script>
