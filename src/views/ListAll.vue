<script setup lang="ts">
import { ref } from 'vue';
import IBookmark from '@/types/IBookmark';
import IPaginated from '@/types/IPaginated';

import { getAllBookmarksPaginated } from '@/utils/API';
import BookmarkGrid from '@/components/Bookmark/BookmarkGrid.vue';

const currentPage = ref(1);

const loading = ref(true);
const bookmarks = ref<IPaginated<IBookmark> | undefined>(await getAllBookmarksPaginated(currentPage.value, 10));
loading.value = false;

async function nextPage() {
  if (!bookmarks.value?.hasNext ?? true) return;

  currentPage.value += 1;

  loading.value = true;
  bookmarks.value = await getAllBookmarksPaginated(currentPage.value, 10);
  loading.value = false;
}

async function previousPage() {
  currentPage.value -= 1;
  if (currentPage.value < 1) {
    currentPage.value = 1;
    return;
  }

  loading.value = true;
  bookmarks.value = await getAllBookmarksPaginated(currentPage.value, 10);
  loading.value = false;
}

async function reloadBookmars() {
  loading.value = true;
  bookmarks.value = await getAllBookmarksPaginated(currentPage.value, 10);
  loading.value = false;
}
</script>

<template>
    <div>
      <router-link to="/">Home</router-link>
      <button type="button" @click="previousPage">Previous</button>
      <span>{{ currentPage }} / {{ bookmarks?.totalPages }}</span>
      <button type="button" @click="nextPage">Next</button>
      <button type="button" @click="reloadBookmars">Reload</button>
      <BookmarkGrid :bookmarks="bookmarks" :loading="loading"/>
    </div>
</template>

<style scoped>
</style>
