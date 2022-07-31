<template>
  <FormField class="checkbox-field" :name="props.name">
    <div class="wrapper" @click="onToggle">
      <IonCheckbox :checked="props.modelValue" v-bind="$attrs" />
      <div class="label">
        <slot :value="props.modelValue" :label="props.label">{{ props.label }}</slot>
      </div>
    </div>
  </FormField>
</template>

<script setup>
import { IonCheckbox } from '@ionic/vue';
import { useField } from './form.js';
import FormField from './FormField.vue';

const props = defineProps({
  modelValue: undefined,
  name: { type: String, required: true },
  label: String,
});

const emits = defineEmits(['update:modelValue']);

const { validate } = useField(props.name);

const onToggle = () => {
  emits('update:modelValue', !props.modelValue);
  validate();
};
</script>

<style>
.checkbox-field .field-input {
  border: 1px solid transparent;
}

.checkbox-field .field-input.error {
  border-color: #dc3545;
}
</style>

<style scoped>
.checkbox-field {
  height: 2rem;
}

.wrapper {
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
}

.label {
  padding-left: 0.5rem;
}
</style>
