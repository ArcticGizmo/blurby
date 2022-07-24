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

    <ion-button @click="onSubmit">Submit</ion-button>

    <ion-button @click="resetAll">Reset All</ion-button>
  </BasePage>
</template>

<script setup>
import BasePage from './BasePage.vue';
import { ref } from 'vue';
import { IonButton, IonSelectOption } from '@ionic/vue';

import * as yup from 'yup';
import { useForm } from '@/components/form/form';
import TextField from '@/components/form/TextField.vue';
import SelectField from '@/components/form/SelectField.vue';

const BOOK_TYPES = ['A type', 'B type'];

const name = ref('jon');
const email = ref('jon@gmail.com');
const bookType = ref(null);
const data = { name, email };

const schema = yup.object({
  name: yup.string().required(),
  // age: yup.number().required().positive().integer(),
  email: yup.string().email().required(),
  bookType: yup.string().oneOf(BOOK_TYPES),
  // website: yup.string().url().nullable().label('cheese'),
  // createdOn: yup.date().default(() => new Date()),
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
