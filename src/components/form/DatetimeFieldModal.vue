<template>
  <div class="datetime-field-modal">
    <ion-datetime v-model="value" v-bind="props.attrs || {}" />
    <div class="actions">
      <ion-button @click="onClose(null, 'cancel')">Cancel</ion-button>
      <ion-button @click="onReset()" :disabled="!isDifferent">Reset</ion-button>
      <ion-button @click="onClose(value, 'confirm')" :disabled="!isDifferent">Accept</ion-button>
    </div>
  </div>
</template>

<script setup>
import { IonDatetime, IonButton, modalController } from '@ionic/vue';
import { computed, ref } from 'vue';

const props = defineProps({
  value: undefined,
  attrs: Object,
});

const value = ref(props.value);

const isDifferent = computed(() => value.value !== props.value);

const onReset = () => (value.value = props.value);

const onClose = (resp, role) => {
  modalController.dismiss(resp, role);
};
</script>

<style scoped>
.datetime-field-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.actions {
  margin-top: 2rem;
}
</style>
