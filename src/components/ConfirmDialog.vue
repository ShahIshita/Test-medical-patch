<script setup>
import { ref, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";

const dialog = ref(false);
const resolve = ref(null);
//const reject = ref(null);
const message = ref(null);
const title = ref(null);
const options = ref({
  color: "dark",
  zIndex: 200,
  noconfirm: false,
});

const display = ref(useDisplay());

// methods

const open = (title, message, opts) => {
  dialog.value = true;
  title.value = title;
  message.value = message;
  options.value = Object.assign(options.value, opts);
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
  resolve.value(false);
  dialog.value = false;
};

// watch option
watch(options, (newVal, oldVal) => {
  console.log("Options changed:", newVal, oldVal);
});

// onMounted lifecycle hook
onMounted(() => {
  console.log("Component has mounted!");
});
</script>

<template>
  <div>
    <v-dialog
      v-model="dialog"
      :width="display.smAndUp ? '500px' : '400px'"
      height="500px"
      :max-width="options.width"
      :style="{ zIndex: options.zIndex }"
      @keydown.esc="cancel"
      overlay-color="black"
    >
      <v-card class="pa-sm-10 pa-5">
        <h4 class="text-h6 font-weight-bold mb-5">
          {{ title }}
        </h4>
        <v-card-text v-show="!!message" class="pa-4 black--text">
          <span v-html="message"></span>
        </v-card-text>
        <v-btn class="px-sm-8" large color="warning" @click="agree"> Delete </v-btn>
        <v-btn large class="ml-5 px-sm-6" color="warning" outlined text @click="cancel">
          Cancel
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
