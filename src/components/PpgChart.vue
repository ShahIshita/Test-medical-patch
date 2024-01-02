<script setup>
import { onBeforeUnmount, watch } from "vue";

import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
);

const props = defineProps(["width", "height", "ppgDataFromProps"]);
// const displayedPpgData = ref(0);
let myChart = null;
let setIntervalMethod = null;

const addDataFromProps = (buffer, endIndex) => {
  if (buffer.length) {
    for (let i = 0; i < endIndex; i++) {
      if (buffer[i]) {
        myChart.data.labels.splice(0, 1);
        myChart.data.datasets[0].data.splice(0, 1);
        myChart.data.labels.push(myChart?.data.labels.length + i);
        myChart.data.datasets[0].data.push(buffer[i]);
      }
    }
    console.log(myChart.data.datasets[0].data);
    myChart.options.scales.y.min =
      Math.min(...myChart.data.datasets[0].data) - 5000;
    myChart.options.scales.y.max =
      Math.max(...myChart.data.datasets[0].data) + 5000;
    myChart.update("none");
  }
};

watch(
  () => props.ppgDataFromProps,
  async (val) => {
    if (val?.length && val.length > 0) {
      let buffer = JSON.parse(JSON.stringify(val));
      if (myChart) {
        clearInterval(setIntervalMethod);
        setIntervalMethod = setInterval(async () => {
          await addDataFromProps(buffer, 200);
          buffer.splice(0, 200);
          if (!buffer.length) {
            clearInterval(setIntervalMethod);
          }
        }, 1000);
        await addDataFromProps(buffer, 200);
        buffer.splice(0, 200);
      } else {
        var canvas = document.createElement("canvas");
        canvas.id = "myLineChart";
        canvas.width = props.width;
        canvas.height = props.height;
        canvas.style.backgroundColor = "#fff";

        var body = document.getElementById("ppgCanvas");
        body.appendChild(canvas);
        const ctx = document.getElementById("myLineChart").getContext("2d");
        myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: [...Array(1000).keys()],
            datasets: [
              {
                label: "ECG",
                data: buffer.slice(0, 1000),
                borderColor: "green",
                borderWidth: 1,
                hoverBorderColor: "red",
                fill: false,
                pointRadius: 0.1,
              },
            ],
          },
          options: {
            elements: {
              line: {
                tension: 0.5,
              },
            },
            interaction: {
              intersect: false,
            },
            plugins: {
              legend: {
                display: false,
              },
              streaming: {
                refresh: 100,
                duration: 20000,
              },
            },
            responsive: true,
            aspectRatio: 1.2,
            maintainAspectRatio: false,
            spanGaps: false,
            scales: {
              y: {
                suggestedMin: 0,
                min: Math.min(...buffer.slice(0, 1000)) - 5000,
                max: Math.max(...buffer.slice(0, 1000)) + 5000,
                stacked: true,
                offset: true,
                ticks: {},
              },
              x: {
                ticks: {
                  major: {
                    enabled: true,
                  },
                  color: "#FFFFFF",
                  displayFormats: 1,
                  maxRotation: 0,
                  minRotation: 0,
                  stepSize: 1,
                  minUnit: "second",
                  source: "data",
                  autoSkip: true,
                },
                time: {
                  unit: "second",
                  displayFormat: "h:mm",
                },
                grid: {
                  display: false,
                },
                display: false,
              },
            },
          },
        });
        clearInterval(setIntervalMethod);
        buffer.splice(0, 1000);
        setIntervalMethod = setInterval(async () => {
          await addDataFromProps(buffer, 100);
          buffer.splice(0, 100);
          if (!buffer.length) {
            console.log("empty - 187");
            clearInterval(setIntervalMethod);
          }
        }, 1000);
        myChart?.update("none");
      }
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (myChart) {
    myChart?.destroy();
  }
  clearInterval(setIntervalMethod);
});
</script>

<template>
  <div></div>
</template>
