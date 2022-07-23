<template>
  <BasePage>
    <div>Name</div>
    <ion-input :value="name" @input="onInput('name', $event.target.value)" />
    <div>Email</div>
    <ion-input :value="email" @input="onInput('email', $event.target.value)" />
    <button @click="triggerValidate">Submit</button>
    <div class="errors">
      <pre>{{ errors }}</pre>
    </div>
  </BasePage>
</template>

<script setup>
import BasePage from './BasePage.vue';
import { IonInput } from '@ionic/vue';
import { validate } from '@/code/validation';

import * as yup from 'yup';
import { ref } from 'vue';

const name = ref('ee');
const email = ref('');

const errors = ref({});

let userSchema = yup.object({
  name: yup.string().required(),
  // age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  // website: yup.string().url().nullable().label('cheese'),
  // createdOn: yup.date().default(() => new Date()),
});

// We want to formalise this so we use inject to inject the required
// state into the children of form
// I think this can be done?
// The global form will need to handle if validation should occur

// create a useField component that injects {validate} and that is tied
// to the global useForm interface

// I dont think we will need to handle nested data, because that
// sounds annoying

const onInput = function (name, value) {
  this[name] = value;
  triggerValidate();
};

const triggerValidate = () => {
  const user = { name: name.value, email: email.value };

  errors.value = validate(userSchema, user);
};
</script>

<style scoped>
.errors {
  text-align: left;
}
</style>
