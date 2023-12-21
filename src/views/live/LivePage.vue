<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import mqtt from "mqtt/dist/mqtt";
import PageHeader from "@/layouts/PageHeader.vue";
import EcgChart from "@/components/EcgChart.vue";

const getDoctorId = localStorage.getItem("user_id");
const gridNumber = ref(6);
const liveDevices = ref([]);
const socketConnection = ref(null);
// const connection = {
//   clean: true,
//   connectTimeout: 30 * 1000,
//   reconnectTimeout: 4000,
//   keepAlive: 120,
//   clientId: 'lens_3DtlcZfxvR0idKzXQ90Vzm69vAM',
//   username: 'MYsmO5Oc7O6DKkS8',
//   password: 'ufUPnVWbLoMwwFaL',
//   useSSL: true,
// };
const subscribeSuccess = ref(false);
const connecting = ref(false);
const retryTimes = ref(0);

const store = useStore();

const showGrid = ref(`lg${gridNumber.value}`);
const mobile = ref(store.state.vuetify.breakpoint.lgAndUp);

const initData = () => {
  socketConnection.value = {
    connected: false,
  };
  retryTimes.value = 0;
  connecting.value = false;
  subscribeSuccess.value = false;
};

// const goToPreviousPage = () => {
//   $router.go(-1);
// };

onMounted(() => {
  if (getDoctorId) {
    store.dispatch("doctors/getPatientsForDoctor", getDoctorId);
  }
});

onBeforeUnmount(() => {
  if (socketConnection.value) {
    try {
      socketConnection.value.end(false, () => {
        initData();
        console.log("Successfully disconnected!");
      });
    } catch (error) {
      console.log("Disconnect failed", error.toString());
    }
  }
});

watch(
  () => store.getters["doctors/getPatients"],
  async (devices) => {
    console.log("watch called");
    liveDevices.value = devices
      .filter((device) => device.isOnline === 1)
      .map((device) => {
        device.showEcgChart = false;
        device.allEcgValues = [];
        device.deviceAlgoData = device.algodata;
        return device;
      });

    const { ...options } = connection;
    const connectUrl = "wss://accu.live/ws/";
    let connection = await mqtt.connect(connectUrl, options);
    socketConnection.value = connection;

    for (let i = 0; i < liveDevices.value.length; i++) {
      const element = liveDevices.value[i];
      if (socketConnection.value.on) {
        socketConnection.value.on("connect", () => {
          connecting.value = false;
          console.log("Connection succeeded!");
          subscribeSuccess.value = true;
          socketConnection.value.subscribe(
            `BacAccuLive/${element.macAddressFramed.toUpperCase()}/atoc`,
          );
        });
      }
    }

    if (socketConnection.value.on) {
      socketConnection.value.on("error", (error) => {
        console.log("Connection failed", error);
      });
      socketConnection.value.on("message", async (_, message) => {
        let data = await JSON.parse(message);
        if (data?.msg_id === 17) {
          liveDevices.value = liveDevices.value.map((device) => {
            if (
              device.macAddressFramed ===
              data.mac_address_framed.replaceAll(":", "")
            ) {
              device["algodata"] = data;
              return device;
            }
            return device;
          });
        }
        console.log("data--", JSON.parse(message));
        if (data?.ecg_vals) {
          liveDevices.value = liveDevices.value.map((device) => {
            if (
              device.macAddressFramed ===
              data.mac_address_framed.replaceAll(":", "")
            ) {
              device.showEcgChart = true;
              device["ecgValues"] = data?.ecg_vals;
              device["allEcgValues"].push(data?.ecg_vals);
              return device;
            }
            return device;
          });
        }
      });
    }
  },
);
</script>

<template>
  <div style="width: 100%">
    <PageHeader
      class="mb-8"
      title="Live"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <div class="btn-group" v-if="mobile">
      <h3>Filter</h3>
      <v-icon
        class="ml-4"
        color="#333"
        @click="gridNumber = 4"
        :class="{ active: gridNumber === 4 }"
        >mdi-tally-mark-3</v-icon
      >
      <v-icon
        class="ml-2"
        color="#333"
        @click="gridNumber = 6"
        :class="{ active: gridNumber === 6 }"
        >mdi-tally-mark-2</v-icon
      >
      <v-icon
        class="ml-2"
        color="#333"
        @click="gridNumber = 12"
        :class="{ active: gridNumber === 12 }"
        >mdi-tally-mark-1</v-icon
      >
    </div>
    <v-layout row wrap class="mt-4">
      <v-flex
        d-flex
        xs12
        sm12
        md6
        v-for="device in liveDevices"
        :key="device.id"
        :class="showGrid"
      >
        <v-card
          class="card-theme"
          style="width: 100%; border-radius: 20px"
          @click="$router.push(`/patient-details/${device?.id}`)"
        >
          <div class="d-flex align-center w-100">
            <div class="d-flex flex-column text-start w-100">
              <h3 class="text-capitalize">{{ device.fullName }}</h3>
              <h5 class="mt-2 grey--text second__heading font-weight-regular">
                Floor No.
              </h5>
              <h5 class="mt-2 grey--text second__heading font-weight-regular">
                Room No.
              </h5>
              <h5 class="mt-2 grey--text second__heading font-weight-regular">
                {{ device.macAddressFramed }}
              </h5>
            </div>
            <v-spacer></v-spacer>
            <div style="width: 70%" class="mr-3">
              <div :id="device.macAddressFramed" style="overflow: hidden">
                <ecg-chart
                  v-if="device.showEcgChart"
                  :ecgDataFromProps="device.ecgValues"
                  :macAddress="device.macAddressFramed"
                  :key="device.showEcgChart"
                  :width="600"
                  :height="165"
                />
              </div>
            </div>
          </div>

          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6" xl="4">
              <v-card class="d-flex align-center pa-2 mt-4">
                <v-flex>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        v-on="on"
                        v-bind="attrs"
                        src="@/assets/heartbeat.svg"
                        height="40"
                        width="40"
                        contain
                      ></v-img>
                    </template>
                    <span>Heart Rate</span>
                  </v-tooltip>
                </v-flex>
                <v-flex xs12>
                  <div class="d-flex flex-column text-start ml-2 lh-1">
                    <h5 class="green--text">
                      {{
                        device?.algodata
                          ? device?.algodata?.hr != 0
                            ? device.algodata?.hr
                            : "--"
                          : "--"
                      }}
                    </h5>
                    <small class="">BPM</small>
                  </div>
                </v-flex>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" xl="4">
              <v-card class="d-flex align-center pa-2 mt-4">
                <v-flex>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        v-on="on"
                        v-bind="attrs"
                        src="@/assets/oxygen.svg"
                        height="40"
                        width="40"
                        contain
                      ></v-img>
                    </template>
                    <span>Oxygen</span>
                  </v-tooltip>
                </v-flex>
                <v-flex xs12>
                  <div class="d-flex flex-column text-start ml-2 lh-1">
                    <h5 class="yellow--text">
                      {{
                        device?.algodata?.spo2
                          ? device?.algodata?.spo2 != 0
                            ? Math.round(device.algodata?.spo2)
                            : device?.deviceAlgoData?.spo2
                          : "--"
                      }}
                    </h5>
                    <small class="">%</small>
                  </div>
                </v-flex>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" xl="4">
              <v-card class="d-flex align-center pa-2 mt-4">
                <v-flex>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-img
                        v-on="on"
                        v-bind="attrs"
                        src="@/assets/temprature.svg"
                        height="40"
                        width="40"
                        contain
                      ></v-img>
                    </template>
                    <span>Temperature</span>
                  </v-tooltip>
                </v-flex>
                <v-flex xs12>
                  <div class="d-flex flex-column text-start ml-2 lh-1">
                    <h5 class="text-danger">
                      {{
                        device?.algodata?.temp
                          ? device?.algodata?.temp != 0
                            ? Math.round(device.algodata?.temp)
                            : "--"
                          : "--"
                      }}
                    </h5>
                    <small class="">°C</small>
                  </div>
                </v-flex>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<style scoped>
h5 {
  font-size: 22px;
}
h3 {
  font-size: 20px;
}
.second__heading {
  font-size: 18px;
}
.card-theme {
  margin-top: 10px;
  padding: 20px;
}
.btn-group {
  display: flex;
  align-items: center;
  padding: 8px 5px;
  border-radius: 12px;
  margin-left: 5px;
}
.btn-group .v-icon--link {
  border-radius: 5px;
  width: 30px;
  height: 30px;
}
.btn-group .v-icon--link.active {
  background: linear-gradient(45deg, #f58220, #e53985);
  color: #fff !important;
}
@media only screen and (max-width: 530px) {
  h3 {
    font-size: 18px;
  }
  .second__heading {
    font-size: 16px;
  }
}
.lh-1 {
  line-height: 1.2;
}
</style>
