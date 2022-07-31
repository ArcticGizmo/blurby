<template>
  <FormField class="multi-select-field" :name="props.name" :label="props.label">
    <div class="items" @click="onOpen">
      <div v-if="modelValue.length === 0" class="placeholder" @click="onOpen">
        <slot name="placeholder"> {{ placeholder }} </slot>
      </div>
      <template v-else>
        <div class="item" v-for="(value, index) in props.modelValue" :key="index">
          <slot name="item" v-bind="{ value, index }">{{ value }}</slot>
        </div>
      </template>
    </div>
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
  searchable: Boolean,
  searchProps: { type: Object, default: () => ({}) },
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
      ...(props.searchProps || {}),
      searchable: props.searchable,
      modelValue: props.modelValue,
      slots: useableSlots.value,
    },
  });
  await modal.present();
  const { role, data } = await modal.onDidDismiss();

  if (role === 'submit') {
    emit('update:modelValue', data);
  }
};
</script>

<style scoped>
.items {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  line-height: 2rem;
  border: 1px solid gray;
  min-height: 2rem;
  padding: 0.25rem 0.5rem;
}

.placeholder {
  border: 1px solid transparent;
  color: gray;
  font-style: italic;
  margin: 0.1rem;
}

.item {
  border: 1px solid orange;
  padding: 0 0.5rem;
  margin: 0.1rem;
  border-radius: 10px;
  background-color: orange;
}
</style>
