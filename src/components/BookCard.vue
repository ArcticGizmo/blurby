<template>
  <div class="book-card">
    <div class="left">
      <div class="icon">
        <ion-icon :icon="book" size="large" />
      </div>
      <div class="rating">{{ value.rating }}</div>
    </div>
    <div class="middle">
      <div class="title">{{ value.title }}</div>
      <div v-if="value.series" class="series">{{ value.series }}</div>
      <div class="author">{{ value.author }}</div>
    </div>
    <div class="right">
      <ion-icon :icon="chevronForward" />
    </div>
  </div>
</template>

<script setup>
import { IonIcon } from '@ionic/vue';

import { chevronForward, book } from 'ionicons/icons';

defineProps({
  value: Object,
});
</script>

<style scoped>
.book-card {
  display: grid;
  grid-template-columns: 6rem auto 2rem;
  background-color: rgb(224, 224, 224);
  border-radius: 15px;
  height: 6rem;
  padding: 0.5rem;
}

.left {
  display: flex;
  flex-direction: column;
}

.left .icon {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.middle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.title {
  font-weight: bold;
  font-size: 1.1rem;
}

.author {
  font-style: italic;
}

.right {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
