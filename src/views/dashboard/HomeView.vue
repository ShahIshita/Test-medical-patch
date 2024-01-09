<script setup>
import SearchBar from "@/components/SearchBar.vue";
import PageHeader from "@/layouts/PageHeader.vue";
import SideBar from "@/layouts/SideBar.vue";
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();

const getDoctorId = localStorage.getItem("user_id");
const gridNumber = ref(4);
// const realTimeMessage = ref("Offline");

const loadingStatus = ref([]);
const filteredPatients = ref([]);
loadingStatus.value = store.getters.loadingStatus;

const { lgAndUp } = useDisplay();

const showGrid = computed(() => `lg${gridNumber.value}`);
const mobile = computed(() => store.state.lgAndUp);
const getPatientsDoctor = ref([]);

const getPatientsForDoctor = async () => {
  if (getDoctorId) {
    await store.dispatch("doctors/getPatientsForDoctor", getDoctorId);
  }
};

onMounted(async () => {
  await getPatientsForDoctor();
  filteredPatients.value = store.getters["doctors/filteredPatients"];
  console.log(store.getters["doctors/filteredPatients"]);
  // getPatientsDoctor.value = store.getters["doctors/getPatientsDoctor"];
});
</script>

<template>
  <div>
    <SideBar />
    <div class="d-flex flex-wrap page-header-item align-center">
      <PageHeader title="Dashboard" class="ph-item-1" />
      <SearchBar class="mr-3 ph-item-2" />
      <div class="d-flex ph-item-3">
        <button class="btn-group px-4 ml-0">
          <v-icon class="me-2" color="#333">mdi-filter</v-icon>
          <h4 class="font-weight-medium">Filter</h4>
        </button>
        <div class="btn-group" v-if="mobile">
          <v-icon
            class="mx-1"
            color="#333"
            :class="{ active: gridNumber === 3 }"
            @click="gridNumber = 3"
            >mdi-tally-mark-4</v-icon
          >
          <v-icon
            class="mx-1"
            color="#333"
            :class="{ active: gridNumber === 4 }"
            @click="gridNumber = 4"
            >mdi-tally-mark-3</v-icon
          >
          <v-icon
            class="mx-1"
            color="#333"
            :class="{ active: gridNumber === 6 }"
            @click="gridNumber = 6"
            >mdi-tally-mark-2</v-icon
          >
        </div>
      </div>
    </div>
    <br />
    <v-progress-circular
      indeterminate
      color="amber"
      v-if="loadingStatus"
    ></v-progress-circular>

    <div v-else>
      <v-row row wrap class="card-item-row">
        <v-col
          d-flex
          xs12
          sm6
          md4
          :class="showGrid"
          v-for="patient in filteredPatients"
          :key="patient.id"
        >
          <v-card
            color="#F6F2F2"
            class="main__card"
            style="width: 100%"
            @click="router.push(`/patient-details/${patient?.id}`)"
          >
            <div class="card-header">
              <div class="d-flex card-title-row">
                <div class="d-flex">
                  <img src="@/assets/User.svg" width="35" height="35" contain />
                  <h3 class="ml-3 font-weight-bold text-capitalize">
                    {{ patient?.fullName }}
                  </h3>
                </div>
                <v-spacer>
                  <span
                    class="active-status offline"
                    v-if="patient.isOnline === 0"
                  ></span>
                </v-spacer>
                <span class="active-status online" v-if="patient.isOnline === 1"></span>
              </div>
              <div class="icon-text-block">
                <img
                  src="@/assets/floor.svg"
                  width="29"
                  height="29"
                  contain
                  class="icon__image"
                />
                <span class="text">Floor - 1 </span>
              </div>
              <div class="icon-text-block">
                <img
                  src="@/assets/rooms.svg"
                  width="29"
                  height="29"
                  class="icon__image"
                />
                <span class="text">Room - 1 </span>
              </div>
              <div class="icon-text-block">
                <img
                  src="@/assets/macAddress.svg"
                  width="29"
                  height="29"
                  class="icon__image"
                />
                <span class="text">{{ patient?.macAddressFramed.toUpperCase() }}</span>
              </div>
              <div class="icon-text-block">
                <img
                  src="@/assets/battery.svg"
                  width="29"
                  height="29"
                  class="icon__image"
                />
                <span class="text"
                  >{{
                    patient?.batdata?.bat_vals ? patient.batdata.bat_vals : "100"
                  }}
                  %</span
                >
              </div>
            </div>
            <div class="card-body">
              <div class="mini-light-box">
                <v-tooltip bottom>
                  <template v-slot:activator="{ props }">
                    <img
                      v-bind="props"
                      class="box-icon"
                      src="@/assets/heartbeat.svg"
                      height="39"
                      width="39"
                      contain
                    />
                  </template>
                  <span>Heart Rate</span>
                </v-tooltip>
                <h5 class="text-success">
                  {{
                    patient?.algodata?.hr
                      ? patient?.algodata?.hr != 0
                        ? patient.algodata?.hr
                        : "--"
                      : "--"
                  }}
                  <span class="unit">BPM</span>
                </h5>
              </div>
              <div class="mini-light-box">
                <v-tooltip bottom>
                  <template v-slot:activator="{ props }">
                    <img
                      v-bind="props"
                      class="box-icon"
                      src="@/assets/oxygen.svg"
                      height="39"
                      width="39"
                      contain
                    />
                  </template>
                  <span>Oxygen</span>
                </v-tooltip>
                <h5 class="text-warning">
                  {{
                    patient?.algodata?.spo2
                      ? patient?.algodata?.spo2 != 0
                        ? Math.round(patient.algodata.spo2)
                        : "--"
                      : "--"
                  }}
                  <span class="unit">%</span>
                </h5>
              </div>
              <div class="mini-light-box">
                <v-tooltip bottom>
                  <template v-slot:activator="{ props }">
                    <img
                      v-bind="props"
                      class="box-icon"
                      src="@/assets/Group 509.svg"
                      height="39"
                      width="39"
                      contain
                    />
                  </template>
                  <span>Mean arterial pressure</span>
                </v-tooltip>
                <h5 class="text-purple">
                  {{
                    patient?.algodata?.map
                      ? patient?.algodata?.map != 0
                        ? Math.round(patient.algodata?.map)
                        : "--"
                      : "--"
                  }}
                  <span class="unit">mmHg</span>
                </h5>
              </div>
              <div class="mini-light-box">
                <v-tooltip bottom>
                  <template v-slot:activator="{ props }">
                    <img
                      v-bind="props"
                      class="box-icon"
                      src="@/assets/bloodPressure.svg"
                      height="39"
                      width="39"
                      contain
                    />
                  </template>
                  <span>Blood Pressure</span>
                </v-tooltip>
                <h5 class="text-info">
                  {{
                    patient?.algodata?.bp
                      ? patient?.algodata?.bp != 0
                        ? Math.round(patient.algodata?.bp)
                        : "--"
                      : "--"
                  }}
                  /
                  {{
                    patient?.algodata?.dbp
                      ? patient?.algodata?.dbp != 0
                        ? Math.round(patient.algodata?.dbp)
                        : "--"
                      : "--"
                  }}
                  <span class="unit">mmHg</span>
                </h5>
              </div>
              <div class="mini-light-box" style="border-bottom-left-radius: inherit">
                <v-tooltip bottom>
                  <template v-slot:activator="{ props }">
                    <img
                      v-bind="props"
                      class="box-icon"
                      src="@/assets/temprature.svg"
                      height="39"
                      width="39"
                      contain
                    />
                  </template>
                  <span>Temperature</span>
                </v-tooltip>
                <h5 class="text-danger">
                  {{
                    patient?.algodata?.temp
                      ? patient?.algodata?.temp != 0
                        ? Math.round(patient.algodata?.temp)
                        : "--"
                      : "--"
                  }}
                  <span class="unit">°C</span>
                </h5>
              </div>
              <div class="mini-light-box" style="border-bottom-right-radius: inherit">
                <v-tooltip bottom>
                  <template v-slot:activator="{ props }">
                    <img
                      v-bind="props"
                      class="box-icon"
                      src="@/assets/steps.svg"
                      height="39"
                      width="39"
                      contain
                    />
                  </template>
                  <span>Steps</span>
                </v-tooltip>
                <h5 class="text-pink">
                  {{
                    patient?.algodata?.steps
                      ? patient?.algodata?.steps != 0
                        ? patient.algodata?.steps
                        : "--"
                      : "--"
                  }}
                  <span class="unit">Steps</span>
                </h5>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-if="!$store.state.doctors.deviceData" class="display-1">
      No Patients to display...
    </div>
  </div>
</template>

<style scoped>
h5 {
  font-size: 20px;
}
small {
  font-size: 10px;
}
span {
  font-size: 14px;
}
.card__div {
  /* UI Properties */
  background-color: #2b2934;
  box-shadow: 0px 5px 7px #00000033;
  border: 1px solid #ffffff0d;
  border-radius: 10px;
  opacity: 1;
}
.main__card.v-sheet.v-card {
  border-radius: 20px;
  box-shadow: 0px 6px 8px -2px #eee;
}
@media only screen and (max-width: 420px) {
  span {
    font-size: 13px;
  }
  .icon__image {
    height: 20px;
    width: 20px;
  }
}

@media only screen and (max-width: 790px) and (min-width: 600px) {
  span {
    font-size: 13px;
  }
}

@media only screen and (max-width: 960px) {
  .page-header-item {
    flex-wrap: wrap;
  }
}

@media only screen and (max-width: 850px) {
  .ph-item-1 {
    order: 1;
  }
  .ph-item-2 {
    order: 3;
  }
  .ph-item-3 {
    order: 2;
  }
}
@media only screen and (max-width: 480px) {
  .ph-item-2 {
    margin-top: 10px;
  }
}
.btn-group {
  display: flex;
  align-items: center;
  padding: 8px 5px;
  border-radius: 12px;
  margin-left: 14px;
  background-color: #f6f2f2;
}
.btn-group .v-icon--link {
  border-radius: 5px;
  width: 30px;
  height: 30px;
}

.theme--light.v-icon:focus::after {
  border-radius: inherit;
  transform: scale(1);
}
.btn-group .v-icon--link.active {
  background: linear-gradient(45deg, #f58220, #e53985);
  color: #fff !important;
}
.card-item-row > * {
  margin-bottom: 30px;
}
.card-header {
  padding: 18px 20px 0;
  display: flex;
  border: 1px solid #eeeeef;
  flex-wrap: wrap;
}
.icon-text-block {
  width: 50%;
  text-align: left;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  font-weight: 400;
  padding-right: 10px;
}

.icon-text-block .icon__image {
  height: 18px;
  width: 18px;
  margin-right: 14px;
}
.card-title-row {
  margin-bottom: 24px;
  width: 100%;
}
.active-status {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 0;
  display: block;
}
.active-status.offline {
  background: #f58220;
}
.active-status.online {
  background: #29da57;
}
.active-status.online:after {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: inherit;
  height: inherit;
  background: inherit;
  transform: scale(2.25);
  opacity: 0.3;
  content: "";
  border-radius: inherit;
}
.card-body {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
}
.mini-light-box {
  display: flex;
  width: 50%;
  align-items: center;
  padding: 14px 20px;
  border: 1px solid #eeeeef;
  text-align: left;
  line-height: 1;
}
.unit {
  font-size: 12px;
}
.box-icon {
  border-radius: 5px;
  margin-right: 10px;
}
.text-info {
  color: #1ad2d9;
}
</style>
