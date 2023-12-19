<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["goBack", "addNewPatient"]);

const role = localStorage.getItem("role");

const goBack = () => {
  emit("goBack");
};

const addNewPatient = () => {
  emit("addNewPatient");
};
</script>

<template>
  <div class="d-flex mr-auto align-center">
    <v-icon v-if="pageIcon" class="black--text icon-big" @click="goBack">{{
      pageIcon
    }}</v-icon>
    <v-card-title class="font-weight-bold pl-0">
      {{ title }}
    </v-card-title>
    <v-btn
      class="align-self-center ml-auto"
      :color="colorName"
      rounded
      @click="addNewPatient"
      v-if="btnName && (role === 'Doctor' || role === 'Admin')"
    >
      <span v-if="btnName">{{ btnName }}</span>
    </v-btn>
  </div>
</template>

<style scoped>
.main__container {
  font-family: "Gilroy";
  border-radius: 20px;
}
.v-card__title {
  font-size: 30px;
}

.icon-big {
  font-size: 32px;
  margin-right: 16px;
}
.v-btn.theme--light,
.v-btn:not(.v-btn--round).v-size--default {
  padding: 14px 20px;
  border-radius: 10px;
  height: auto;
  min-width: 190px;
  text-transform: none;
  font-weight: 600;
}

@media (max-width: 600px) {
  .icon-big {
    margin-right: 10px;
    font-size: 24px;
  }

  .v-card__title {
    font-size: 22px;
  }

  .v-btn:not(.v-btn--round).v-size--default {
    min-width: unset;
    padding: 12px 18px;
    border-radius: 8px;
  }
}
</style>
