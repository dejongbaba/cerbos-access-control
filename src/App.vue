<script  lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { checkAccess } from './services/cerbos';
import {onMounted, ref} from "vue";
export default {
  setup() {
    const canEdit = ref(false);

    onMounted(async () => {
      console.log('mounted')
      const user = { id: '123', roles: ["admin"] };
      const resource = { kind: 'document', id: 'doc1' };
      canEdit.value = await checkAccess(user, resource, 'edit');
    });

    return { canEdit };
  }
}
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
<!--  <HelloWorld msg="Vite + Vue" />-->
  <button v-if="canEdit">Edit Document</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
