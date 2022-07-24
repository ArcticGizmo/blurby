<template>
  <FormField class="text-input" :name="props.name" :label="props.label">
    <ion-input :value="value" @input="onInput" />
  </FormField>
</template>

<script setup>
import { IonInput } from '@ionic/vue';
import { useField } from './form.js';
import FormField from './FormField.vue';

const props = defineProps({
  name: { type: String, required: true },
  value: undefined,
  label: { type: String },
});

const emits = defineEmits(['modelValue']);

const { validate } = useField(props.name);

const onInput = e => {
  console.dir(e.target.value);
  emits('modelValue', e.target.value);
  validate();
};
</script>

<style scoped>
ion-input {
  border: 1px solid orange;
}
</style>
