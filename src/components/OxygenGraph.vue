<script setup>
import ApexCharts from "apexcharts";
import { ref, onBeforeUnmount, watch, defineProps } from "vue";

const props = defineProps([
  "dataOfChart",
  "height",
  "width",
  "chartBgColor",
  "chartLabel",
]);

const options = ref({
  series: [
    {
      name: "Blood Oxygen",
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
  xaxis: {
    categories: props.chartLabel,
    labels: {
      formatter: function () {
        return "";
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

let oxygenChart = null;

watch(
  () => props.dataOfChart,
  async (val) => {
    console.log("val.length", val.length);
    const chartContainer = document.getElementById("Oxygenchart");
    if (chartContainer?.innerHTML) {
      chartContainer.innerHTML = null;
    }

    if (val.length && val.length > 0) {
      if (document.getElementById("Oxygenchart")) {
        oxygenChart = new ApexCharts(chartContainer, options.value);
        oxygenChart.render();
        oxygenChart.updateSeries([
          {
            data: val?.map((d) => Math.round(d["spo2"])),
          },
        ]);
      }
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  const chartContainer = document.getElementById("Oxygenchart");
  if (chartContainer?.innerHTML) {
    chartContainer.innerHTML = null;
  }

  if (oxygenChart) {
    oxygenChart.destroy();
    oxygenChart = null;
  }
});
</script>

<template>
  <div></div>
</template>
