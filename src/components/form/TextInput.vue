<template>
  <FormField class="text-input" :name="props.name" :label="props.label">
    <input type="text" :value="props.modelValue" @input="onInput" />
  </FormField>
</template>

<script setup>
import { IonInput } from '@ionic/vue';
import { useField } from './form.js';
import FormField from './FormField.vue';

const props = defineProps({
  modelValue: undefined,
  name: { type: String, required: true },
  label: { type: String },
});

const emits = defineEmits(['update:modelValue']);

const { validate } = useField(props.name);

const onInput = e => {
  emits('update:modelValue', e.target.value);
  validate();
};
</script>

<style scoped>
ion-input {
  border: 1px solid orange;
}
</style>
