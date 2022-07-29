<template>
  <FormField class="multi-select-field" :name="props.name" :label="props.label">
    <div class="items" @click="onOpen">This is where the items are</div>
  </FormField>
</template>

<script setup>
import { modalController } from '@ionic/vue';
import { computed, useSlots } from 'vue';
import FormField from './FormField.vue';
import MultiSelectFieldModal from '@/modals/MultiSelectFieldModal.vue';

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  name: { type: String, required: true },
  label: String,
  placeholder: { type: String, default: 'Select' },
});

const emit = defineEmits(['update:modelValue']);

const slots = useSlots();

const useableSlots = computed(() => {
  return slots
    .default()
    .map(s => {
      if (Array.isArray(s.children)) {
        return s.children;
      }
      return s;
    })
    .flat();
});

const onOpen = async () => {
  const modal = await modalController.create({
    component: MultiSelectFieldModal,
    componentProps: {
      modelValue: props.modelValue,
      slots: useableSlots.value,
    },
  });
  await modal.present();
  const { role, data } = await modal.onDidDismiss();

  if (role === 'submit') {
    console.dir('--- submit')
    emit('update:modelValue', data);
  }
};
</script>

<style scoped>
.items {
  border: 1px solid gray;
  min-height: 2.5rem;
  line-height: 2.5rem;
  padding: 0 0.5rem;
}
</style>
