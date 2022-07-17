<template>
  <BasePage>
    Book page coming soon
    <BookCard v-for="(book, index) in books" :key="index" :value="book" />
    <button @click="onOpenModal">Open Modal</button>
  </BasePage>
</template>

<script setup>
import BasePage from './BasePage.vue';
import FormModal from '@/modals/FormModal.vue';

import BookCard from '@/components/BookCard.vue';

import { modalController } from '@ionic/vue';

const onOpenModal = async () => {
  const modal = await modalController.create({
    component: FormModal,
  });
  return modal.present();
};

const books = [
  {
    title: 'A book',
    author: 'J. Applesmith',
    series: null,
    rating: 4,
    statuses: ['rented', 'damaged'],
  },
  {
    title: 'B Book',
    author: 'K. Jenkins',
    series: 'So many things',
    rating: null,
    statuses: ['new'],
  },
  {
    title: 'C Book',
    author: 'S. Wintersmith',
  },
];
</script>

<style scoped>
.book-card {
  margin: 0.5rem;
}
</style>
