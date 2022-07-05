<script setup lang="ts">
import { Icon } from '@iconify/vue';

import { DeleteCategory } from '@/utils/API';
import Store from '@/utils/Store';

const emit = defineEmits(['closeCalled', 'deleted']);

function close() {
  emit('closeCalled');
}

async function confirm() {
  if (Store.categoryToDelete.value === '' || Store.categoryNameToDelete.value === '') return;

  const success = await DeleteCategory(Store.categoryToDelete.value);

  if (success) {
    Store.currentCategory.value = '54453511-6970-4fb7-b3a4-51714ce5fd35';
    Store.currentCategoryName.value = 'Unsorted';
    emit('deleted');
  }

  Store.categoryToDelete.value = '';
  Store.categoryNameToDelete.value = '';

  emit('closeCalled');
}
</script>

<template>
  <div class="modal-float">
    <div class="main">
      <button class="close-button" @click="close">
        <Icon icon="ant-design:close-outlined" height="1.5rem" />
      </button>

      <span class="title">The category: <strong>{{ Store.categoryNameToDelete.value }}</strong> will be deleted, alongside <strong>ALL</strong>
        bookmarks in it, are you sure you want to continue?</span>

      <button class="confirm-button" @click="confirm">
        <Icon icon="eva:checkmark-circle-fill" height="3rem" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal-float {
  z-index: 1;

  height: 20rem;
  width: 35rem;

  background-color: rgb(250, 250, 250);

  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.5);

  border-radius: 0.5rem;
  border-top: solid rgb(206, 206, 206) 1px;
}

.close-button {
  position: absolute;
  right: 1rem;
  top: 1rem;

  color: gray;
  background-color: transparent;
  border: none;

  cursor: pointer;
}

.close-button:hover {
  color: red;
}

.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  text-align: center;
}

.title {
  margin-top: 1.5rem;
  font-size: 2em;
  font-weight: 500;
}

.title strong {
  color: red;
}

.confirm-button {
  background-color: transparent;
  border: none;

  color: red;
  cursor: pointer;

  margin: 1rem;
}

.confirm-button:hover {
  color: pink;
}

.confirm-button:disabled {
  color: gray;
}
</style>
