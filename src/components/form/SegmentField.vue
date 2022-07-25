<template>
  <FormField class="segment-field" :name="props.name" :label="props.label">
    <ion-segment :value="props.modelValue" v-bind="$attrs" @ion-change="onChange">
      <slot></slot>
    </ion-segment>
  </FormField>
</template>

<script setup>
import { IonSegment } from '@ionic/vue';
import FormField from './FormField.vue';
import { useField } from './form';

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

<style scoped>
.segment-field {
  height: 4rem;
}
</style>
