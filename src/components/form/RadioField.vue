<template>
  <FormField class="radio-field" :name="props.name" :label="props.label">
    <ion-radio-group :value="props.modelValue" v-bind="$attrs" @ion-change="onChange">
      <slot></slot>
    </ion-radio-group>
  </FormField>
</template>

<script setup>
import { IonRadioGroup } from '@ionic/vue';
import { useField } from './form.js';
import FormField from './FormField.vue';

const props = defineProps({
  modelValue: undefined,
  name: { type: String, required: true },
  label: String,
});

const emits = defineEmits(['update:modelValue']);

const { validate } = useField(props.name);

const onChange = e => {
  emits('update:modelValue', e.target.value);
  validate();
};
</script>

<style>
.radio-field .field-input {
  border: 1px solid transparent;
}

.radio-field .field-input.error {
  border-color: #dc3545;
}
</style>
