<template>
  <ion-page class="base-page">
    <ion-page>
      <ion-header :translucent="true" v-if="showHeading">
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button color="primary"></ion-menu-button>
          </ion-buttons>
          <ion-title>{{ $route.meta.title }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <div class="page-container">
          <slot></slot>
        </div>
      </ion-content>

      <ion-tab-bar slot="bottom">
        <ion-tab-button
          v-for="route in routes"
          :key="route.name"
          :tab="route.name"
          :href="route.path"
        >
          <ion-icon :icon="route.icon" />
          <ion-label>{{ route.name }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-page>
  </ion-page>
</template>

<script setup>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/vue';

import { library, book, people, golf, settings } from 'ionicons/icons';

defineProps({
  showHeading: Boolean,
});

const routes = [
  { name: 'Books', path: '/books', icon: library },
  { name: 'Goals', path: '/goals', icon: golf },
  { name: 'Reading', path: '/reading', icon: book },
  { name: 'Lending', path: '/lending', icon: people },
  { name: 'Profile', path: '/profile', icon: settings },
];
</script>

<style>
.base-page .page-container strong {
  font-size: 20px;
  line-height: 26px;
}

.base-page .page-container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

.base-page .page-container a {
  text-decoration: none;
}
</style>
