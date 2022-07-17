<template>
  <BasePage>
    Book page coming soon

    <button @click="onOpenModal">Open Modal</button>
  </BasePage>
</template>

<script setup>
import BasePage from './BasePage.vue';
import FormModal from '@/modals/FormModal.vue';

import { modalController } from '@ionic/vue';

const onOpenModal = async () => {
  const modal = await modalController.create({
    component: FormModal,
  });
  return modal.present();
};
</script>
