<template>
  <BasePage>
    <TextField name="name" label="Name" v-model="name" />
    <TextField name="email" label="Email" v-model="email" />

    <SelectField name="bookType" label="Book Type" v-model="bookType">
      <ion-select-option :value="null"> none </ion-select-option>
      <ion-select-option
        v-for="(option, index) in BOOK_TYPES"
        :key="index"
        :value="option"
        placeholder="Apples"
      >
        {{ option }}
      </ion-select-option>
    </SelectField>

    <DatetimeField name="createdOn" label="Created On" v-model="createdOn" />

    <RadioField name="tag" label="Tag" v-model="tag">
      <ion-item v-for="(tag, index) in TAGS" :key="index">
        <ion-label>{{ tag }}</ion-label>
        <ion-radio slot="start" :value="tag" />
      </ion-item>
    </RadioField>
    {{ tag }}

    <ion-button @click="onSubmit">Submit</ion-button>

    <ion-button @click="resetAll">Reset All</ion-button>
  </BasePage>
</template>

<script setup>
import BasePage from './BasePage.vue';
import { ref } from 'vue';
import { IonButton, IonSelectOption, IonRadio, IonItem, IonLabel } from '@ionic/vue';

import * as yup from 'yup';
import { useForm } from '@/components/form/form';
import TextField from '@/components/form/TextField.vue';
import SelectField from '@/components/form/SelectField.vue';
import DatetimeField from '@/components/form/DatetimeField.vue';
import RadioField from '@/components/form/RadioField.vue';

const BOOK_TYPES = ['A type', 'B type'];
const TAGS = ['Romance', 'Horror', 'Adventure'];

const name = ref('jon');
const email = ref('jon@gmail.com');
const bookType = ref(null);
const tag = ref(null);
const createdOn = ref('2022-01-01T10:30:00');

const data = { name, email, bookType, tag, createdOn };

const schema = yup.object({
  name: yup.string().required(),
  // age: yup.number().required().positive().integer(),
  email: yup.string().email().required(),
  bookType: yup.string().oneOf(BOOK_TYPES).nullable(),
  // website: yup.string().url().nullable().label('cheese'),
  createdOn: yup.string(),
  tag: yup.string().oneOf(TAGS).required().nullable(),
});

const { hasErrors, validateAll, resetAll } = useForm(schema, data, {
  canValidate: true,
});

const onSubmit = () => {
  validateAll();

  console.dir(hasErrors.value);
  if (hasErrors.value) {
    console.dir('--- has errore');
  } else {
    console.dir('---- all good');
  }
};
</script>

<style scoped>
.errors {
  text-align: left;
}
</style>
