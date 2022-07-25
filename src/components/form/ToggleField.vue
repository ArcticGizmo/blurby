<template>
  <FormField class="toggle-field" :name="props.name">
    <div class="wrapper" @click="onToggle">
      <IonToggle :checked="props.modelValue" v-bind="$attrs" />
      <div class="label">
        <slot :value="props.modelValue" :label="props.label">{{ props.label }}</slot>
      </div>
    </div>
  </FormField>
</template>

<script setup>
import { IonToggle } from '@ionic/vue';
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
  console.dir('---on toggle');
  emits('update:modelValue', !props.modelValue);
  validate();
};
</script>

<style>
.toggle-field .field-input {
  border: 1px solid transparent;
}

.toggle-field .field-input.error {
  border-color: #dc3545;
}
</style>

<style scoped>
.toggle-field {
  height: 2rem;
}

ion-toggle {
  padding-left: 0.25rem;
}

.wrapper {
  display: flex;
  flex-direction: row;
  padding: 0.25rem;
}

.label {
  padding-left: 0.5rem;
  padding-top: 0.15rem;
  line-height: 2rem;
}
</style>
