<template>
  <FormField class="rating-field" :name="props.name" :label="props.label">
    <div class="stars" @click="onContainerClick">
      <ion-icon
        class="drag"
        v-for="(item, index) in starItems"
        :key="index"
        :icon="item"
        @click.stop="onSelect(index, $event)"
      />
    </div>
  </FormField>
</template>

<script setup>
import FormField from './FormField.vue';

import { IonIcon } from '@ionic/vue';
import { starOutline, star, starHalfOutline } from 'ionicons/icons';
import { computed } from 'vue';
import { useField } from './form';

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  name: { type: String, required: true },
  label: String,
  stars: { type: Number, default: 5 },
  halves: Boolean,
});

const emits = defineEmits(['update:modelValue']);

const { validate } = useField(props.name);

const starItems = computed(() => {
  let items = [];

  const index = Math.floor(props.modelValue);

  for (let i = 0; i < props.stars; i++) {
    if (props.halves && i === index && props.modelValue > index) {
      items[i] = starHalfOutline;
    } else if (i >= index) {
      items[i] = starOutline;
    } else {
      items[i] = star;
    }
  }

  return items;
});

const updateValue = value => {
  emits('update:modelValue', value);
  validate();
};

const onSelect = (index, event) => {
  if (!props.halves) {
    updateValue(index + 1);
    return;
  }

  const iconPos = event.target.getBoundingClientRect();
  let offset = 1;

  if (event.x < iconPos.x + iconPos.width / 2) {
    offset = 0.5;
  }

  updateValue(index + offset);
};

const onContainerClick = event => {
  const pos = event.target.getBoundingClientRect();

  let value = props.stars;
  if (event.x < pos.x + pos.width / 2) {
    value = 0;
  }

  updateValue(value);
};
</script>

<style scoped>
.stars {
  display: flex;
  justify-content: center;
  width: 100%;
}

ion-icon {
  height: 3rem;
  width: 3rem;
  padding: 0.5rem;
  color: orange;
}

.star {
  font-size: x-large;
  width: 50px;
  display: inline-block;
  color: gray;
}
.star:last-child {
  margin-right: 0;
}
.star:before {
  content: '\2605';
}
.star.on {
  color: gold;
}
.star.half:after {
  content: '\2605';
  color: gold;
  position: absolute;
  margin-left: -20px;
  width: 10px;
  overflow: hidden;
}
</style>
