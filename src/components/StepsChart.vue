<script setup>
import ApexCharts from "apexcharts";
import { ref, onMounted, watch, onBeforeUnmount, defineProps } from "vue";

const props = defineProps(
  "height",
  "width",
  "chartBgColor",
  "chartLabel",
  "dataOfChart",
);

const options = ref({
  series: [
    {
      name: "Steps",
      data: [],
    },
  ],
  chart: {
    type: "area",
    height: props.height,
    width: props.width,
    toolbar: {
      show: false,
    },
  },
  colors: props.chartBgColor,
  grid: {
    show: true,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  xaxis: {
    categories: props.chartLabel,
    labels: {
      formatter: function () {
        return "";
      },
    },
  },
  yaxis: {
    labels: {
      formatter: function (val) {
        return Math.round(val);
      },
    },
  },
  theme: {
    mode: "dark",
    palette: "palette1",
    monochrome: {
      enabled: false,
      shadeTo: "dark",
      shadeIntensity: 0.65,
    },
  },
  plotOptions: {
    area: {
      horizontal: false,
    },
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
  },
});

let myAreaChart = null;

onMounted(() => {
  watch(
    () => props.dataOfChart,
    async (val) => {
      console.log("val.length", val.length);
      const chartContainer = document.getElementById("chart");
      if (chartContainer?.innerHTML) {
        chartContainer.innerHTML = null;
      }
      if (val.length && val.length > 0) {
        if (document.getElementById("chart")) {
          myAreaChart = new ApexCharts(chartContainer, options.value);
          myAreaChart.render();
          myAreaChart.updateSeries([
            {
              data: props.dataOfChart?.map((d) => Math.round(d["step"])),
            },
          ]);
        }
      }
    },
    { immediate: true },
  );
});

onBeforeUnmount(() => {
  const chartContainer = document.getElementById("chart");
  if (chartContainer?.innerHTML) {
    chartContainer.innerHTML = null;
  }
  if (myAreaChart) {
    myAreaChart?.destroy();
    myAreaChart = null;
  }
});
</script>

<template>
  <div></div>
</template>
