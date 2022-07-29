<template>
  <FormField class="range-field" :name="props.name" :label="props.label" :disabled="disabled">
    <ion-range v-bind="attrs" @ion-change="onChange">
      <slot></slot>
    </ion-range>
  </FormField>
</template>

<script setup>
import { IonRange } from '@ionic/vue';
import { useAttrs } from '@vue/runtime-core';
import { useField } from './form';
import FormField from './FormField.vue';

const props = defineProps({
  modelValue: { type: [Object, Number] },
  name: { type: String, required: true },
  label: String,
  disabled: Boolean,
});

const attrs = useAttrs();

const emits = defineEmits(['update:modelValue']);

const { validate } = useField(props.name);

const onChange = e => {
  emits('update:modelValue', e.target.value);
  validate();
};
</script>
