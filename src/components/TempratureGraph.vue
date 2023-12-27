<script setup>
import { ref, onMounted, watch, onBeforeUnmount, defineProps } from "vue";
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
  "tempratureData",
  "width",
  "height",
  "chartBgColor",
  "macAddress",
]);

const tempratureChart = ref(null);

const addDataFromProps = (buffer) => {
  if (buffer?.length && buffer.length > 0) {
    const canvas = document.getElementById(`temp-chart-${props.macAddress}`);
    if (canvas?.innerHTML) {
      canvas.innerHTML = null;
    }

    let ctx;
    ctx = canvas?.getContext("2d");

    if (ctx) {
      tempratureChart.value = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"],
          datasets: [
            {
              label: "Temprature",
              data: buffer?.map((d) => Math.round(d["temp"])),
              borderWidth: 1,
              hoverBorderColor: "red",
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
      tempratureChart.value.render();
    }
  }
};

onMounted(() => {
  watch(
    () => props.tempratureData,
    (val) => {
      addDataFromProps(JSON.parse(JSON.stringify(val)));
    },
    { immediate: true },
  );
});

onBeforeUnmount(() => {
  if (tempratureChart.value) {
    tempratureChart.value.destroy();
  }
  const canvas = document.getElementById(`temp-chart-${props.macAddress}`);
  if (canvas?.innerHTML) {
    canvas.innerHTML = null;
  }
});
</script>

<template>
  <div></div>
</template>
