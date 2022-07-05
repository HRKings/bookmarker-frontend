<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import ICategory from '@/types/ICategory';
import IPaginated from '@/types/IPaginated';
import { getTopLevelCategoriesPaginated, setBookmarkCategory } from '@/utils/API';

import CreateCategoryModal from './CreateCategoryModal.vue';

import Store from '@/utils/Store';
import DeleteCategoryModal from './DeleteCategoryModal.vue';

const showCreateCategory = ref(false);
const showDeleteCategory = ref(false);

const emit = defineEmits(['reloadRequired']);

const categories = ref<IPaginated<ICategory>>(await getTopLevelCategoriesPaginated(1, 20));

async function reloadCategories() {
  categories.value = await getTopLevelCategoriesPaginated(1, 20);
}

function setCurrentCategory(categoryId: string, categoryName: string) {
  Store.currentCategory.value = categoryId;
  Store.currentCategoryName.value = categoryName;
}

async function bookmarkDropped(event: DragEvent, categoryId: string) {
  const bookmarkId = event?.dataTransfer?.getData('bookmarkId');
  if (!bookmarkId) return;

  const success = await setBookmarkCategory(bookmarkId, categoryId);
  if (success) { emit('reloadRequired'); }
}

function handleCategoryDeletion(categoryId: string, categoryName: string) {
  Store.categoryToDelete.value = categoryId;
  Store.categoryNameToDelete.value = categoryName;

  showDeleteCategory.value = true;
}
</script>

<template>
  <div class="main">
    <CreateCategoryModal v-if="showCreateCategory" @close-called="showCreateCategory = false" @created="reloadCategories"/>
    <DeleteCategoryModal v-if="showDeleteCategory" @close-called="showDeleteCategory = false" @deleted="reloadCategories"/>
    <div class="title">
      <span>Categories</span>
      <Icon icon="ant-design:folder-add-filled" class="add-button" @click="showCreateCategory = true"/>
    </div>
    <div class="categories">
      <div v-for="category in categories.content" v-bind:key="category.id" @click="setCurrentCategory(category.id, category.title ?? '')"
        :class="{ 'category-link': true, 'current-category': category.id == Store.currentCategory.value }"
        @drop="event => bookmarkDropped(event, category.id)" @dragover.prevent="">
        <Icon icon="ant-design:delete-outlined" v-if="category.title !== 'Unsorted'" height="1rem" class="delete-category" @click="handleCategoryDeletion(category.id, category.title ?? '')"/>
        <Icon :icon="category.icon" height="1.7rem"></Icon>
        <span>{{ category.title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;

  border-top: solid 0.1rem black;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
}

.title {
  font-size: 1.7em;
  font-weight: 700;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.categories {
  border-top: solid black 0.1rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
}

.category-link {
  cursor: pointer;
  padding: 0.5rem;
  padding-left: 0.1rem;

  display: flex;
  align-items: center;

  font-size: 1.2em;

  background-color: rgb(230, 230, 230);
}

.category-link:hover {
  color: blue;
}

.current-category {
  color: green;
  font-weight: 500;

  background-color: lightgreen;
  border-left: solid green 0.3rem;
}

.add-button {
  cursor: pointer;
}

.add-button:hover {
  color: cyan;
}

.delete-category {
  position: absolute;
  left: 9.2rem;
}

.delete-category:hover {
  color: red;
}
</style>
