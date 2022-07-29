<template>
  <div class="multi-select-field-modal">
    <ion-item v-for="(slot, index) in slots" :key="index" @click="onToggle(slot.props.value)">
      <ion-checkbox
        slot="start"
        :checked="localSelected.includes(slot.props.value)"
        :value="localSelected.includes(slot.props.value)"
      />
      <component :is="slot" />
    </ion-item>
    <!-- search bar -->

    <!-- items -->

    <!-- actions -->
    <div class="actions">
      <ion-button @click="onCancel">Cancel</ion-button>
      <ion-button @click="onSubmit">Ok</ion-button>
    </div>
  </div>
</template>

<script setup>
import { IonButton, IonItem, IonCheckbox, modalController } from '@ionic/vue';
import { ref } from 'vue';

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  slots: { type: Array, default: () => [] },
});

const localSelected = ref(props.modelValue);

const onToggle = value => {
  let arr = props.modelValue.slice();
  if (arr.includes(value)) {
    arr = arr.filter(v => v !== value);
  } else {
    arr.push(value);
  }

  localSelected.value = arr;
};

const onCancel = () => modalController.dismiss(undefined, 'cancel');
const onSubmit = () => modalController.dismiss(localSelected.value, 'submit');
</script>

<style scoped>
.actions {
  position: absolute;
  bottom: 1rem;
  display: flex;
  flex-direction: row;
  width: 100%;
}

.actions > * {
  width: 100%;
}

ion-checkbox {
  margin-right: 1.5rem;
}
</style>
