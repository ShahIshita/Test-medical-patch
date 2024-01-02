<script setup>
import { ref, onMounted } from "vue";
import { fileData } from "@/views/testData";

// data properties & objects

let lastDate = 0;
let data = [];
const TICKINTERVAL = 86400000;
const XAXISRANGE = 777600000;

// ref
const series = ref([
  {
    data: fileData.ecg_vals.slice(0, 2000),
  },
]);

const chartOptions = ref({
  chart: {
    id: "realtime",
    height: 350,
    type: "line",
    animations: {
      enabled: true,
      easing: "linear",
      dynamicAnimation: {
        speed: 1000,
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  title: {
    text: "Dynamic Updating Chart",
    align: "left",
  },
  markers: {
    size: 0,
  },
  xaxis: {
    type: "datetime",
    range: XAXISRANGE,
  },
  yaxis: {
    max: Math.max(...fileData.ecg_vals),
  },
  legend: {
    show: false,
  },
});

// methods
const getNewSeries = (baseval, yrange) => {
  let newDate = baseval + TICKINTERVAL;
  lastDate = newDate;
  for (let i = 0; i < data.length - 10; i++) {
    data[i].x = newDate - XAXISRANGE - TICKINTERVAL;
    data[i].y = 0;
  }
  data.push({
    x: newDate,
    y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min,
  });
};

const resetData = () => {
  data = data.slice(data.length - 10, data.length);
};

const intervals1 = () => {
  setInterval(() => {
    getNewSeries(lastDate, { min: 10, max: 90 });
    series.value[0].data = data;
  }, 1000);

  setInterval(() => {
    resetData();
    series.value[0].data = data;
  }, 60000);
};

// mounted
onMounted(() => {
  intervals1();
});
</script>

<template>
  <div>
    <apex-chart
      ref="realtimeChart1"
      width="500"
      type="line"
      :options="chartOptions"
      :series="series"
    ></apex-chart>
  </div>
</template>
