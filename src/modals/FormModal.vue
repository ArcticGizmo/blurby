<template>
  <div>This is a form modal or something</div>
  <button @click="onClose">Close</button>
</template>

<script setup>
import { modalController } from '@ionic/vue';

const onClose = () => {
  modalController.dismiss();
};
</script>
