<template>
  <BasePage>
    <TextInput name="name" label="Name" v-model="name"  />
    <TextInput name="email" label="Email" v-model="email" placeholder="apples" />

    <ion-button @click="onSubmit">Submit</ion-button>

    <ion-button @click="resetAll">Reset All</ion-button>
  </BasePage>
</template>

<script setup>
import BasePage from './BasePage.vue';
import { ref } from 'vue';
import { IonButton } from '@ionic/vue';

import * as yup from 'yup';
import { useForm } from '@/components/form/form';
import TextInput from '@/components/form/TextInput.vue';

const name = ref('jon');
const email = ref('');
const data = { name, email };

const schema = yup.object({
  name: yup.string().required(),
  // age: yup.number().required().positive().integer(),
  email: yup.string().email().required(),
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
