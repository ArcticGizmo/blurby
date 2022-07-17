<template>
  <div>This is a form modal or something</div>
  <div class="form">
    <Field name="email" />

    <div>
      {{ errors }}
    </div>
    <button>Submit</button>
    <!-- <ion-input name="email"></ion-input> -->
  </div>
  <button @click="onClose">Close</button>
</template>

<script setup>
import { IonInput, modalController } from '@ionic/vue';
import { useForm, Field } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required().email().label('Email Address'),
  name: yup.string().required().label('Name'),
  password: yup.string().required().min(8).label('Password'),
});

const { errors } = useForm({
  validationSchema: schema,
});

const onClose = () => {
  modalController.dismiss();
};
</script>
