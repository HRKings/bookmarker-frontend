<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import IBookmark from '@/types/IBookmark';

const maxChars = 128;

const props = defineProps<{ bookmark: IBookmark; }>();

const showVideo = ref(false);

const title = ref(props.bookmark.title ?? '');
const description = ref(props.bookmark.description ?? '');
const domain = ref(new URL(props.bookmark.url));

if (title.value.length > maxChars * 0.8) {
  title.value = `${title.value.substring(0, maxChars * 0.8)}...`;
}

if (description.value.length > maxChars) {
  description.value = `${description.value.substring(0, maxChars)}...`;
}

</script>

<template>
  <div class="card">
    <div class="card-cover">
      <Icon v-if="props.bookmark.isLinkBroken" icon="fa:chain-broken" class="broken-flag" width="2.5rem" />
      <Icon icon="bi:collection-play-fill" v-if="props.bookmark.videoUrl" class="show-video" width="2rem"
        @click="showVideo = !showVideo" />
      <a v-if="!showVideo" :href="props.bookmark.url">
        <img :src="props.bookmark.imageUrl ?? 'https://dpcpa.com/wp-content/uploads/2015/01/thumbnail-default.jpg'"
          :alt="props.bookmark.imageAlt" />
      </a>
      <iframe v-if="showVideo" :src="props.bookmark.videoUrl" height="100%" width="100%" />
    </div>

    <div class="card-content">
      <div class="card-header">
        <a :href="props.bookmark.url" class="title">
          <span>
            {{ title }}
          </span>
        </a>
      </div>

      <div class="card-description">
        {{ description }}
        <Icon v-if="!description" class="text-placeholder" icon="bi:body-text" height="7rem"/>
      </div>

      <div class="card-footer">
        <a :href="props.bookmark.url">● {{ domain.host }} ●</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 20rem;
  height: 26rem;
  text-align: center;
  margin: 0.5rem;

  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  overflow-wrap: break-word;
  transition: 0.3s;

  overflow: hidden;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(3, 107, 126, 0.4);
}

a {
  text-decoration: none;
}

a:visited {
  color: darkslategray;
}

.card-cover img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.card-cover {
  height: 10rem;
  box-shadow: 0 6px 4px -4px rgba(0, 0, 0, 0.3);

  margin-bottom: 0.5rem;
}

.broken-flag {
  position: absolute;
  padding-top: 7rem;
  padding-left: 16.5rem;

  color: red;
}

.show-video {
  position: absolute;
  padding: 0.5rem;

  color: white;
  transition: 0.5s;
}

.show-video:hover {
  color: gray;
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 15rem;

  padding: 0.5rem;
}

.card-header {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 0.5rem;

  font-size: large;
  font-weight: bold;

  height: 4rem;

  overflow-wrap: break-word;
}

.title {
  width: 18rem;
}

.card-description {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;

  height: 7rem;
}

.text-placeholder {
  opacity: 5%;
}

.card-footer {
  font-size: small;
  padding-left: 0.3rem;
  padding-right: 0.3rem;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
