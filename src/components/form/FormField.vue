<template>
  <div class="form-field">
    <ion-label v-if="label">{{ label }}</ion-label>
    <slot></slot>
    <div class="errors">
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
});

const form = inject('form');
const showErrors = toRef(form, 'showErrors');
const errors = computed(() => form.errors.value[props.name].errors);
</script>

<style scoped>
ion-label {
  text-align: left;
  text-transform: uppercase;
}

.errors {
  border: 1px solid red;
  color: red;
}
</style>
