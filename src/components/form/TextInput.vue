<template>
  <div class="text-input">
    <ion-label :title="label" />
    <ion-input />
    {{ errors }}
  </div>
</template>

<script setup>
import { IonInput, IonLabel } from '@ionic/vue';
import { useField } from './form.js';

const props = defineProps({
  name: { type: String, required: true },
  value: undefined,
  label: { type: String },
});

const { errors, validate } = useField(props.name);
</script>
