<script setup>
import { watch, onBeforeUnmount, defineProps } from "vue";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
);

const props = defineProps([
  "width",
  "height",
  "ecgDataFromProps",
  "macAddress",
]);

let myChart = null;
let setIntervalMethod = null;

const addDataFromProps = (buffer, endIndex) => {
  console.log("inside add data method");
  if (buffer.length) {
    for (let i = 0; i < endIndex; i++) {
      if (buffer[i]) {
        myChart?.data.labels.splice(0, 1);
        myChart?.data.datasets[0].data.splice(0, 1);
        myChart?.data.labels.push(myChart?.data.labels.length + i);
        myChart?.data.datasets[0].data.push(buffer[i]);
      }
    }
    myChart?.update("none");
  }
};

watch(
  () => props.ecgDataFromProps,
  async (val) => {
    if (val?.length && val.length > 0) {
      let buffer = JSON.parse(JSON.stringify(val));
      if (myChart) {
        clearInterval(setIntervalMethod);
        setIntervalMethod = setInterval(async () => {
          await addDataFromProps(buffer, 200);
          buffer.splice(0, 200);
          if (!buffer.length) {
            console.log("empty buffer");
            clearInterval(setIntervalMethod);
          }
        }, 1000);
        await addDataFromProps(buffer, 200);
        buffer.splice(0, 200);
      } else {
        // ... (rest of the code remains the same)
      }
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (myChart) {
    myChart.destroy();
    console.log("destroyed");
  }
  clearInterval(setIntervalMethod);
});
</script>

<template>
  <div></div>
</template>
