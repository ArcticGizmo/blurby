<template>
  <FormField class="datetime-field" :name="props.name" :label="props.label">
    <div class="input" @click="onOpenModal">
      <div class="text">
        <slot :value="props.modelValue">{{ props.modelValue }}</slot>
      </div>
      <div class="icons" :class="{ error: hasErrors }">
        <ion-icon :icon="calendarOutline" size="large" />
        <ion-icon class="alert" v-if="hasErrors" :icon="alertCircleOutline" size="large" />
      </div>
    </div>
  </FormField>
</template>

<script setup>
import { IonIcon, modalController } from '@ionic/vue';
import { useField } from './form.js';
import FormField from './FormField.vue';
import { alertCircleOutline, calendarOutline } from 'ionicons/icons';
import DatetimeFieldModal from '@/modals/DatetimeFieldModal.vue';
import { useAttrs } from '@vue/runtime-core';

const attrs = useAttrs();

const props = defineProps({
  modelValue: undefined,
  name: { type: String, required: true },
  label: { type: String },
  datetimeProps: { type: Object, default: () => ({}) },
  modalProps: { type: Object, default: () => ({}) },
});

const emits = defineEmits(['update:modelValue']);

const { validate, hasErrors } = useField(props.name);

const onOpenModal = async () => {
  const modal = await modalController.create({
    component: DatetimeFieldModal,
    componentProps: { ...props.datetimeProps, value: props.modelValue, attrs },
    ...props.modalProps,
  });

  modal.present();

  const { role, data } = await modal.onDidDismiss();
  if (role === 'cancel') {
    return;
  }

  emits('update:modelValue', data);
  validate();
};
</script>

<style scoped>
.input {
  display: relative;
}

.text {
  border: 1px solid gray;
  height: 2.5rem;
  line-height: 2.5rem;
  padding-left: 0.5rem;
}

.error text {
  border-color: #dc3545;
}

.icons {
  position: relative;
  top: -2.25rem;
  float: right;
  right: 0.25rem;
}

.icon.errors {
  color: #dc3545;
}
</style>
