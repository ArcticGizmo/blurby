<template>
  <FormField class="picture-field" :name="props.name" :label="props.label">
    <div class="wrapper">
      <div class="image-area">
        <Image :src="modelValue" @click="onViewImage" />
        <ion-icon v-if="props.modelValue" :icon="closeCircleOutline" @click="onClearImage" />
      </div>
      <div class="buttons">
        <ion-button v-if="showCamera" @click="onOpenCamera">
          <ion-icon :icon="cameraOutline" @click="onOpenCamera" />
          <ion-label> Camera </ion-label>
        </ion-button>

        <ion-button v-if="showGallery" @click="onOpenGallery">
          <ion-icon :icon="imageOutline" @click="onOpenGallery" />
          <ion-label> Gallery </ion-label>
        </ion-button>
      </div>
    </div>
  </FormField>
</template>

<script setup>
import { IonIcon, IonLabel, IonButton, modalController } from '@ionic/vue';
import { Camera, CameraResultType } from '@capacitor/camera';
import { useField } from './form';
import Image from '@/components/Image.vue';

import { cameraOutline, imageOutline, closeCircleOutline } from 'ionicons/icons';
import FormField from './FormField.vue';

import { webPathToDataUrl } from '@/code/image';
import ImageViewerModal from '@/modals/ImageViewerModal.vue';
import { computed } from 'vue';

const props = defineProps({
  modelValue: undefined,
  name: { type: String, required: true },
  label: String,
  mode: { type: String, default: null },
});

const emits = defineEmits(['update:modelValue']);

const { validate } = useField(props.name);

const showCamera = computed(() => !props.mode || props.mode === 'camera');
const showGallery = computed(() => !props.mode || props.mode === 'gallery');

const onViewImage = async () => {
  if (!props.modelValue) {
    return;
  }
  const modal = await modalController.create({
    component: ImageViewerModal,
    componentProps: { src: props.modelValue },
  });

  await modal.present();
};

const onOpenCamera = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    height: 600,
    resultType: CameraResultType.DataUrl,
  });

  emits('update:modelValue', image.dataUrl);
};

const onOpenGallery = async () => {
  const resp = await Camera.pickImages({
    quality: 90,
    limit: 1,
    height: 100,
    width: 100,
    resultType: CameraResultType.DataUrl,
  });

  const photo = resp.photos[0];

  if (!photo) {
    return;
  }

  const dataUrl = await webPathToDataUrl(photo.webPath);
  emits('update:modelValue', dataUrl);
};

const onClearImage = e => {
  e.preventDefault();
  emits('update:modelValue', null);
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.image-area {
  position: relative;
  width: 80%;
  height: 10rem;
  border: 1px solid gray;
  background-color: rgb(238, 238, 238);
}

.image-area .image {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
}

.image-area ion-icon {
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  color: gray;
  top: 0;
  right: 0;
  z-index: 20;
}

.buttons {
  display: flex;
  flex-direction: row;
  width: 80%;
}

.buttons ion-icon {
  height: 100%;
  width: 2rem;
}

.buttons ion-button {
  width: 100%;
}

.buttons ion-label {
  margin-left: 0.5rem;
  font-size: 0.75rem;
}
</style>
