# pet-diary-vue3

This template should help get you started developing with Vue 3 in Vite.
http://140.238.22.22:8080/pet-diary-vue3

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Detail

* /post/:id
  * const route = useRoute(); const id = route.params.id; / $route 
* route에서 `props: true` 설정해주면, vue파일내에서 defineProps로 받을 수 있다.
  ```
  props: route = > { id: parseInt(route.params.id)}
  ```
  ```
  props: {id: 1}
  ```
