<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

import { CreateCategory } from '@/utils/API';

const emit = defineEmits(['closeCalled', 'created']);

const canSend = ref(false);

const title = ref('');
const icon = ref('bi:bookmark-star');

function close() {
  emit('closeCalled');
}

async function confirm() {
  if (title.value === '') return;

  const success = await CreateCategory(title.value, icon.value);

  if (success) emit('created');

  emit('closeCalled');
}

function validate() {
  canSend.value = title.value !== '';
}
</script>

<template>
  <div class="modal-float">
    <div class="main">
      <button class="close-button" @click="close">
        <Icon icon="ant-design:close-outlined" height="1.5rem" />
      </button>
      <span class="title">Add category</span>

      <input class="category-name" v-model="title" @input="validate"/>
      <div class="icon-selector">
        <Icon :icon="icon" height="2rem" class="icon-preview"/>
        <input v-model="icon"/>
      </div>

      <button class="confirm-button" @click="confirm" :disabled="!canSend">
        <Icon icon="eva:checkmark-circle-fill" height="3rem" />
      </button>

    </div>
  </div>
</template>

<style scoped>
.modal-float {
  z-index: 1;

  height: 15rem;
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

  transition: 300ms;
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
}

.title {
  margin-top: 1.5rem;
  font-size: 3em;
  font-weight: 700;
}

.category-name {
  margin: 1rem;
  width: 80%;
  height: 2rem;
}

.icon-selector {
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-preview {
  padding: 0.2rem;
  border: solid 1px black;
  margin-right: 1rem;
}

.confirm-button {
  background-color: transparent;
  border: none;

  color: green;
  cursor: pointer;

  margin: 1rem;
}

.confirm-button:hover {
  color: cyan;
}

.confirm-button:disabled {
  color: gray;
}
</style>
