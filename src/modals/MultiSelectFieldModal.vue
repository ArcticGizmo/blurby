<template>
  <div class="multi-select-field-modal">
    <ion-searchbar v-if="searchable" v-model="searchText" v-bind="props.searchProps || {}" />
    <!-- need an add new item option -->
    <ion-item
      v-for="(slot, index) in filteredSlots"
      :key="index"
      @click="onToggle(slot.props.value)"
    >
      <ion-checkbox
        slot="start"
        :checked="localSelected.includes(slot.props.value)"
        :value="localSelected.includes(slot.props.value)"
      />
      <component :is="slot" />
    </ion-item>

    <div class="actions">
      <ion-button @click="onCancel">Cancel</ion-button>
      <ion-button @click="onSubmit">Ok</ion-button>
    </div>
  </div>
</template>

<script setup>
import { IonButton, IonItem, IonCheckbox, IonSearchbar, modalController } from '@ionic/vue';
import { computed, ref } from 'vue';

import { fuzzysort } from '@/code/sort';

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  slots: { type: Array, default: () => [] },
  searchable: Boolean,
  searchProps: { type: Object, default: () => ({}) },
  searchCallback: { type: Function, default: fuzzysort },
});

const localSelected = ref(props.modelValue);
const searchText = ref('');

const filteredSlots = computed(() => {
  const slotValues = props.slots.map(s => s.props.value);
  const values = props.searchCallback(slotValues, searchText.value);

  const valueSet = new Set(values);

  return props.slots.filter(s => valueSet.has(s.props.value));
});

const onToggle = value => {
  let arr = localSelected.value.slice();
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

ion-item {
  border: none;
  --border: none;
}
</style>
