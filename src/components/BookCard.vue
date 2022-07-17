<template>
  <div class="book-card">
    <div class="status">
      <ion-icon v-for="(icon, index) in statuses" :key="index" :icon="icon" />
    </div>
    <div class="picture">
      <div class="icon">
        <ion-icon :icon="book" size="large" />
      </div>
      <div class="rating">{{ value.rating }}</div>
    </div>
    <div class="detail">
      <div class="title">{{ value.title }}</div>
      <div v-if="value.series" class="series">{{ value.series }}</div>
      <div class="author">{{ value.author }}</div>
    </div>
    <div class="action" @click="onAction">
      <ion-icon :icon="chevronForward" />
    </div>
  </div>
</template>

<script setup>
import { IonIcon } from '@ionic/vue';
import { computed } from '@vue/runtime-core';

import { chevronForward, book, ribbon, warning, reader, personRemove } from 'ionicons/icons';

const STATUS_ICONS = {
  new: ribbon,
  wishlist: reader,
  damaged: warning,
  rented: personRemove,
};

const props = defineProps({
  value: Object,
});

const emit = defineEmits(['action']);

const statuses = computed(() => {
  return (props.value.statuses || []).map(s => STATUS_ICONS[s]).filter(i => i);
});

const onAction = () => emit('action');
</script>

<style scoped>
.book-card {
  display: grid;
  grid-template-columns: 2rem 6rem auto 2rem;
  background-color: rgb(224, 224, 224);
  border-radius: 15px;
  height: 6rem;
  padding: 0.5rem;
}

/* ---- layout containers ---- */
.status {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
  overflow: hidden;
}

.picture {
  display: flex;
  flex-direction: column;
}

.detail {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-left: 1px solid gray;
}

.action {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* ---- item styling ---- */

.status ion-icon {
  width: 1.1rem;
  height: 1.1rem;
  padding: 0.1rem 0;
}

.picture .icon {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-weight: bold;
  font-size: 1.1rem;
}

.author {
  font-style: italic;
}
</style>
