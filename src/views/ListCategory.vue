<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';

import IBookmark from '@/types/IBookmark';
import IPaginated from '@/types/IPaginated';
import CategoryTree from '@/components/Category/CategoryTree.vue';

import { getBookmarksPaginatedByCategory, SearchBookmarks } from '@/utils/API';
import Store from '@/utils/Store';
import BookmarkGrid from '@/components/Bookmark/BookmarkGrid.vue';

const currentPage = ref(1);
const pageSize = 10;

const query = ref('');

const loading = ref(true);
const bookmarks = ref<IPaginated<IBookmark>>();
loading.value = false;

async function reloadBookmarks() {
  loading.value = true;
  bookmarks.value = await getBookmarksPaginatedByCategory(Store.currentCategory.value, currentPage.value, pageSize);
  loading.value = false;
}

watch(currentPage, async () => {
  reloadBookmarks();
});

watch(Store.currentCategory, async () => {
  currentPage.value = 1;
  reloadBookmarks();
});

async function nextPage() {
  if (!bookmarks.value?.hasNext) {
    currentPage.value = 1;
    return;
  }

  currentPage.value += 1;
}

async function previousPage() {
  currentPage.value -= 1;
  if (currentPage.value < 1) {
    currentPage.value = bookmarks.value?.totalPages ?? 1;
  }
}

async function triggerSearch() {
  currentPage.value = 1;

  loading.value = true;
  bookmarks.value = await SearchBookmarks(query.value, Store.currentCategoryName.value, currentPage.value, pageSize);
  loading.value = false;
}

reloadBookmarks();
</script>

<template>
  <div class="main-body">
    <div class="sidebar">
      <div class="router">
        <router-link to="/">Home</router-link>
        <router-link to="/search">Search</router-link>
      </div>
      <CategoryTree @reload-required="reloadBookmarks" />
    </div>
    <div class="content">
      <div class="navigation">
        <input v-model="query" @input="triggerSearch" />

        <div v-if="bookmarks && bookmarks.content.length > 0" class="navigation">
          <Icon icon="carbon:previous-filled" height="2rem" @click="previousPage" />
          <span class="page-counter">{{ currentPage }} / {{ bookmarks?.totalPages ?? 0 }}</span>
          <Icon icon="carbon:next-filled" height="2rem" @click="nextPage" />
          <Icon icon="ant-design:reload-outlined" height="2rem" class="reload-button" @click="reloadBookmarks" />
        </div>
      </div>
      <div class="grid">
        <BookmarkGrid :bookmarks="bookmarks" :loading="loading" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-body {
  height: calc(100vh - 1rem);
  display: flex;

  padding: 0.5rem;
}

.sidebar {
  height: 100%;

  border-right: solid black 0.1rem;

  padding-right: 1rem;
  margin-right: 1rem;
}

.router {
  display: flex;
  justify-content: space-between;
}

.grid {
  overflow-y: scroll;
  width: 100%;
}

.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navigation button {
  color: black;
}

.navigation svg:hover {
  color: aqua;
}

.page-counter {
  margin: 1rem;
  font-weight: 500;
  font-size: 1.5em;
}

.reload-button {
  position: absolute;
  left: 95%;
}

.content {
  min-width: 25rem;
  width: 100%;
}
</style>
