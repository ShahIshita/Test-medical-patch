<script setup>
import { ref, onBeforeUnmount, onMounted, watch, defineProps } from "vue";

import {
  Chart,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  BarController,
} from "chart.js";

Chart.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  BarController,
);

const props = defineProps([
  "heartrateData",
  "width",
  "height",
  "chartBgColor",
  "macAddress",
]);

const HeartRateChart = ref(null);

const renderChart = (buffer, ctx) => {
  HeartRateChart.value = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"],
      datasets: [
        {
          label: "HeartRate",
          data: buffer?.map((d) => Math.round(d["hr"])),
          borderWidth: 1,
          hoverBorderColor: "green",
          fill: 1,
          barPercentage: 0.25,
          categoryPercentage: 1,
          backgroundColor: props.chartBgColor,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            title: function () {
              return "";
            },
          },
        },
      },
      scales: {
        x: {
          display: false,
        },
      },
    },
  });
  HeartRateChart.value.render();
};

onMounted(() => {
  watch(
    () => props.heartrateData,
    async (val) => {
      if (val?.length && val.length > 0) {
        let buffer = JSON.parse(JSON.stringify(val));
        console.log("buffer", buffer);
        const el = document.getElementById(`heartRate-${props.macAddress}`);
        if (el?.innerHTML) {
          el.innerHTML = null;
        }
        let ctx;
        var canvas = document.createElement("canvas");
        canvas.id = `heartRate-chart-${props.macAddress}`;
        canvas.width = props.width;
        canvas.height = props.height;

        var body = document.getElementById(`heartRate-${props.macAddress}`);
        console.log("body", body);
        body?.appendChild(canvas);
        ctx = document
          .getElementById(`heartRate-chart-${props.macAddress}`)
          ?.getContext("2d");
        console.log("ctx", ctx);
        if (ctx) {
          renderChart(buffer, ctx);
        }
      }
    },
    { immediate: true },
  );
});

onBeforeUnmount(() => {
  if (HeartRateChart.value) {
    HeartRateChart.value.destroy();
    HeartRateChart.value = null;
  }
});
</script>

<template>
  <div></div>
</template>
