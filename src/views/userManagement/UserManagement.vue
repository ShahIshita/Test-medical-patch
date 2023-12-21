<script setup>
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useStore } from "vuex";
import DeviceAssignDialog from "@/components/DeviceAssignDialog.vue";
import PageHeader from "@/layouts/PageHeader.vue";
import { useSearch } from "@/composable/searchUser";

const { searchUserString } = useSearch();
const store = useStore();

const getDoctorId = localStorage.getItem("user_id");
const role = localStorage.getItem("role");

const selectedHeaders = ref({});
const selected = ref([]);
const assignDialog = ref(false);
const isValidAssignPatient = ref(false);
const data = ref(null);

const headers = [
  { text: "DeviceName", align: "start", sortable: false, value: "name" },
  { text: "PatientName", value: "fullName" },
  { text: "Mac Address", value: "macAddressFramed" },
];

const { getPatients, getAllPatientsOnly, loadingStatus } =
  store.getters["doctors"];

const { getPatientsForDoctor, getAllPatientsData } = store.dispatch("doctors");
const { checkAssignDevicesToPatient, assignDeviceToPatient } =
  store.dispatch("devices");

const checkValidAssignPatient = async () => {
  isValidAssignPatient.value = await data.value.assign.open(
    "Some of the devices are already assigned to the doctor. Do you wish to continue?",
  );
  return isValidAssignPatient.value;
};

const assignDevicesToPatient = () => {
  if (selected.value.length > 0) {
    assignDialog.value = true;
    selectedHeaders.value = selected.value[0].fullName;
    getAllPatientsData(getDoctorId);
  } else {
    toast.error("You must select at least one device to assign.", {
      timeout: 3000,
    });
  }
};

const getSelectedValue = () => {
  const macAddress = selected.value.map((data) => data.macAddressFramed);
  const data = {
    devices: macAddress,
    customerId: selectedHeaders.value?.id,
  };

  if (selectedHeaders.value && selectedHeaders.value !== null) {
    checkAssignDevicesToPatient(data)
      .then((res) => {
        if (res.message === "devices assigned to customer successfully.") {
          selected.value = [];
          assignDialog.value = false;
          setTimeout(() => {
            getPatientsForDoctor(getDoctorId);
          }, 500);
          toast.success(res.message, { timeout: 3000 });
        } else {
          checkValidAssignPatient().then((res) => {
            console.log(res);
            assignDeviceToPatient(data);
            selected.value = [];
            assignDialog.value = false;
            setTimeout(() => {
              getPatientsForDoctor(getDoctorId);
            }, 500);
            toast.success("Device assigned to customer successfully.", {
              timeout: 3000,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  }
  selectedHeaders.value = {};
};

onMounted(() => {
  getPatientsForDoctor(getDoctorId);
});
</script>

<template>
  <div>
    <PageHeader
      title="Device List"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <div class="table-changes">
      <div class="text-right">
        <v-btn
          color="warning"
          height="53"
          width="248"
          class="text-start ml-auto mb-5"
          v-if="role === 'Doctor'"
          @click="assignDevicesToPatient"
        >
          Assign to Patient
        </v-btn>
      </div>

      <v-dialog
        transition="dialog-top-transition"
        max-width="600"
        overlay-color="white"
        persistent
        v-model="assignDialog"
      >
        <v-card class="pa-sm-10 pa-5">
          <h4 class="text-h6 font-weight-bold mb-5">
            Select below patient to assign device
          </h4>
          <v-select
            class="mb-3 theme-select-box text-capitalize"
            :items="getAllPatientsOnly"
            v-model="selectedHeaders"
            @change="getSelectedValue"
            item-text="fullName"
            placeholder="Select Patient"
            return-object
          ></v-select>
          <v-btn
            color="warning"
            class="px-10"
            large
            outlined
            @click="assignDialog = false"
          >
            Cancel
          </v-btn>
        </v-card>
      </v-dialog>

      <v-data-table
        :loading="loadingStatus"
        loading-text="Loading... Please wait"
        :headers="headers"
        :items="getPatients"
        :items-per-page="5"
        class="elevation-1 table text-capitalize"
        show-select
        v-model="selected"
        :search="searchUserString"
        :custom-filter="useSearch"
      >
        <template v-slot:top>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="searchUserString"
              label="Search Patient By Name or Mac Address..."
              class="input-theme"
            ></v-text-field>
          </v-col>
        </template>
      </v-data-table>
    </div>
    <DeviceAssignDialog ref="assign" />
  </div>
</template>

<style scoped>
.v-item-group {
  display: flex;
  justify-content: space-evenly;
}
</style>
