<template>
  <div class="form-field" :disabled="disabled">
    <div class="field-label">
      <slot name="label">
        <ion-label v-if="label" :aria-label="label">{{ label }}</ion-label>
      </slot>
    </div>
    <div class="field-input" :class="{ error: errors.length }">
      <slot></slot>
    </div>
    <div class="field-errors">
      <slot v-if="showErrors && errors.length > 0" name="errors">{{ errors[0] }}</slot>
    </div>
  </div>
</template>

<script setup>
import { IonLabel } from '@ionic/vue';
import { computed, inject, toRef } from 'vue';

const props = defineProps({
  name: { type: String, required: true },
  label: String,
  disabled: Boolean,
});

const form = inject('form');
const showErrors = toRef(form, 'showErrors');
const errors = computed(() => form.errors.value[props.name].errors);
</script>

<style scoped>
.form-field {
  text-align: left;
  display: block;
  margin: 2rem 1rem;
}

.form-field[disabled='true'] {
  pointer-events: none;
  opacity: 0.5;
}

.form-field ion-label {
  text-align: left;
  text-transform: capitalize;
}

.field-input {
  margin-top: 0.5rem;
}

.field-errors {
  margin-top: 0.5rem;
  color: #dc3545;
}

.field-errors::first-letter {
  text-transform: capitalize;
}
</style>
