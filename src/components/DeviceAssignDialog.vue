<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
const display = ref(useDisplay());

const dialog = ref(false);
const resolve = ref(null);
const reject = ref(null);
const message = ref(null);
const title = ref(null);
const options = ref({
  color: "dark",
  zIndex: 200,
  noconfirm: false,
});

const open = (title, message, opts) => {
  dialog.value = true;
  title.value = title;
  message.value = message;
  options.value = { ...options.value, ...opts };
  return new Promise((res, rej) => {
    resolve.value = res;
    reject.value = rej;
  });
};

const agree = () => {
  resolve.value(true);
  dialog.value = false;
};

const cancel = () => {
  reject.value(false);
  dialog.value = false;
};
</script>

<template>
  <div>
    <v-dialog
      v-model="dialog"
      :width="display.smAndUp ? '600px' : '400px'"
      :max-width="options.width"
      :style="{ zIndex: options.zIndex }"
      @keydown.esc="cancel"
      overlay-color="white"
    >
      <v-card class="pa-sm-10 pa-5">
        <h4 class="text-h6 font-weight-bold mb-5">
          {{ title }}
        </h4>
        <v-card-text v-show="!!message" class="pa-4 black--text">
          <span v-html="message"></span>
        </v-card-text>
        <v-btn color="warning" large @click="agree"> Assign </v-btn>
        <v-btn color="warning" class="ml-5" outlined large @click="cancel">
          Cancel
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
