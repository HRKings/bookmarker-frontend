<script setup lang="ts">
import IBookmark from '@/types/IBookmark';
import IPaginated from '@/types/IPaginated';
import BookmarkUnit from '@/components/Bookmark/BookmarkUnit.vue';
import BookmarkWireframe from '@/components/Bookmark/BookmarkWireframe.vue';

const props = defineProps<{
  loading: boolean,
  bookmarks?: IPaginated<IBookmark>,
}>();

function handleDragStart(event: any, bookmarkId: string) {
  event.dataTransfer.setData('bookmarkId', bookmarkId);
}
</script>

<template>
  <div class="main">
    <div class="bookmarks" v-if="!props.loading && props.bookmarks">
      <BookmarkUnit v-for="bookmark in bookmarks?.content" v-bind:key="bookmark.id" :bookmark="bookmark" draggable="true" @dragstart="event => handleDragStart(event, bookmark.id)"/>
    </div>
    <div class="bookmarks" v-if="props.loading">
      <BookmarkWireframe v-for="wireframe in 20" v-bind:key="wireframe" />
    </div>
  </div>
</template>

<style scoped>
.main-body {
  display: flex;
}

.main {
  text-align: center;
}

.bookmarks {
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
}
</style>
