<template>
  <FormField class="textarea-field" :name="props.name" :label="props.label">
    <div class="input">
      <ion-textarea type="text" :value="props.modelValue" @input="onInput" v-bind="$attrs" />
      <ion-icon v-if="hasErrors" :icon="alertCircleOutline" size="large" />
    </div>
  </FormField>
</template>

<script setup>
import { IonTextarea, IonIcon } from '@ionic/vue';
import { useField } from './form.js';
import FormField from './FormField.vue';
import { alertCircleOutline } from 'ionicons/icons';

const props = defineProps({
  modelValue: undefined,
  name: { type: String, required: true },
  label: { type: String },
});

const emits = defineEmits(['update:modelValue']);

const { validate, hasErrors } = useField(props.name);

const onInput = e => {
  emits('update:modelValue', e.target.value);
  validate();
};
</script>

<style scoped>
.input {
  display: relative;
}

ion-icon {
  position: relative;
  top: -2.25rem;
  float: right;
  right: 0.25rem;
  color: #dc3545;
}

ion-textarea {
  border: 1px solid gray;
}

.error ion-textarea {
  border-color: #dc3545;
}
</style>
