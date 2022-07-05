<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="card">
    <div class="card-cover">
      <Icon icon="akar-icons:image" class="cover" width="7rem" />
    </div>

    <div class="card-content">
      <div class="card-header">
        <Icon class="title-placeholder" icon="bi:body-text" height="2rem"/>
      </div>

      <div class="card-description">
        <Icon class="text-placeholder" icon="bi:body-text" height="7rem"/>
      </div>

      <div class="card-footer">
        <Icon class="title-placeholder" icon="bi:body-text" height="1rem"/>
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

.cover {
  position: relative;
  top: 2rem;

  color: gray;
  opacity: 50%;
}

.title-placeholder {
  color: gray;
  opacity: 50%;
}

</style>
