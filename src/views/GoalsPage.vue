<template>
  <BasePage>
    <TextField name="name" label="Name" v-model="name" />
    <TextField name="email" label="Email" v-model="email" disabled />

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

    <RangeField name="volume" label="Volume" v-model="volume" ticks snaps min="5" max="10" pin>
      <div slot="start">😢</div>
      <div slot="end">😊</div>
    </RangeField>

    <RatingField name="rating" label="Rating" v-model="rating" />

    <RadioField name="tag" label="Tag" v-model="tag">
      <ion-item v-for="(tag, index) in TAGS" :key="index">
        <ion-label>{{ tag }}</ion-label>
        <ion-radio slot="start" :value="tag" />
      </ion-item>
    </RadioField>

    <CheckboxField name="termsAccepted" label="Accept terms of service" v-model="termsAccepted" />

    <TextareaField name="review" label="Review" v-model="review" :autoGrow="true" />

    <ToggleField name="showRating" label="Show Rating" v-model="showRating" />

    <SegmentField name="accuracy" label="accuracy" v-model="accuracy">
      <ion-segment-button v-for="(acc, index) in ACCURACY" :key="index" :value="acc">
        <ion-label>{{ acc }}</ion-label>
      </ion-segment-button>
    </SegmentField>

    <PictureField name="picture" label="Picture" v-model="picture" />

    <br />
    <br />
    <br />
    <ion-button @click="onSubmit">Submit</ion-button>

    <ion-button @click="resetAll">Reset All</ion-button>
  </BasePage>
</template>

<script setup>
import BasePage from './BasePage.vue';
import { ref } from 'vue';
import {
  IonButton,
  IonSelectOption,
  IonRadio,
  IonItem,
  IonLabel,
  IonSegmentButton,
} from '@ionic/vue';

import * as yup from 'yup';
import { useForm } from '@/components/form/form';
import TextField from '@/components/form/TextField.vue';
import SelectField from '@/components/form/SelectField.vue';
import DatetimeField from '@/components/form/DatetimeField.vue';
import RadioField from '@/components/form/RadioField.vue';
import CheckboxField from '@/components/form/CheckboxField.vue';
import TextareaField from '@/components/form/TextareaField.vue';
import ToggleField from '@/components/form/ToggleField.vue';
import SegmentField from '@/components/form/SegmentField.vue';
import PictureField from '@/components/form/PictureField.vue';
import RatingField from '@/components/form/RatingField.vue';
import RangeField from '@/components/form/RangeField.vue';

const BOOK_TYPES = ['A type', 'B type'];
const TAGS = ['Romance', 'Horror', 'Adventure'];
const ACCURACY = ['low', 'medium', 'high'];

const name = ref('jon');
const email = ref('jon@gmail.com');
const bookType = ref(null);
const tag = ref(null);
const createdOn = ref('2022-01-01T10:30:00');
const termsAccepted = ref(null);
const review = ref('');
const accuracy = ref('low');
const showRating = ref(false);
const picture = ref(null);
const rating = ref(2);
const volume = ref(50);

const data = {
  name,
  email,
  bookType,
  tag,
  createdOn,
  termsAccepted,
  review,
  showRating,
  accuracy,
  picture,
  rating,
  volume,
};

const schema = yup.object({
  name: yup.string().required(),
  // age: yup.number().required().positive().integer(),
  email: yup.string().email().required(),
  bookType: yup.string().oneOf(BOOK_TYPES).nullable(),
  // website: yup.string().url().nullable().label('cheese'),
  createdOn: yup.string(),
  tag: yup.string().oneOf(TAGS).required().nullable(),
  termsAccepted: yup.boolean().required().nullable().isTrue(),
  showRating: yup.boolean().isTrue(),
  review: yup.string().min(30),
  accuracy: yup.string().oneOf(ACCURACY),
  picture: yup.mixed(),
  rating: yup.number().min(0).max(5),
  volume: yup.number().min(0).max(100),
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
