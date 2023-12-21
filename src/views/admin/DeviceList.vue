<script setup>
import axios from "axios";
import { ref, watch, onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useStore } from "vuex";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import PageHeader from "@/layouts/PageHeader.vue";
import DeviceAssignDialog from "@/components/DeviceAssignDialog.vue";
import useSearch from "@/composable/searchUser";

const { searchUserString, searchUser } = useSearch();

const store = useStore();
const loadingStatus = store.getters.loadingStatus;
const getDevices = store.getters.getDevices;

//const icon = "justify";
const valid = ref(true);
const getDoctorId = localStorage.getItem("user_id");
const role = localStorage.getItem("role");
const dialog = ref(false);

const headers = [
  { text: "DeviceName", align: "start", sortable: false, value: "name" },
  { text: "Mac Address", value: "macAddressFramed" },
  { text: "Doctor Name", value: "doctorFullName" },
  { text: "Patient Name", value: "fullName" },
  { text: "Actions", value: "actions", sortable: false },
];

const editedIndex = ref(-1);
const editedItem = ref({ name: "" });
const defaultItem = { name: "", macAddressFramed: "" };
let itemId = "";
const addDialog = ref(false);
const assignDevicePatientDialog = ref(false);
const assignDeviceDoctorDialog = ref(false);
const dateMenu = ref(false);
const {
  checkAssignDevicesToDoctor,
  assignDeviceToDoctor,
  checkAssignDevicesToPatient,
  assignDeviceToPatient,
} = ref();

const device = ref({
  name: "",
  macAddress: "",
  dateValue: null,
});

const nameRules = [(v) => !!v || "Device name is required"];
const macAddressRules = [(v) => !!v || "Macaddress is required"];
const dialogDelete = ref(false);
const selectedHeaders = ref({});
const selected = ref([]);
const selectedHeadersPatient = ref({});
let isValidAssignDoctor = ref(false);
let isValidAssignPatient = ref(false);
const data = ref(null);

// const toast = Toast.useToast();

const getAllDevices = async () => {
  await store.dispatch("devices/getAllDevices");
};

const deleteSingleDevice = async (item) => {
  if (
    await data.value.confirm.open(
      "Are you sure you want to delete this device?",
    )
  ) {
    try {
      const data = await store.dispatch("devices/deleteDevice", item);
      if (data.statusCode === 200) {
        toast.success(data.message, { timeout: 3000 });
      }
    } catch (err) {
      setTimeout(() => {
        getAllDevices();
      }, 500);
      toast.error(err.message, { timeout: 3000 });
    }
  }
  dialogDelete.value = true;
};

const focusDate = () => {
  setTimeout(() => {
    if (!dateMenu.value) {
      dateMenu.value = true;
    }
  }, 200);
};

const editDevice = (item) => {
  editedIndex.value = getDevices.indexOf(item);
  itemId = item.id;
  editedItem.value = { ...item };
  dialog.value = true;
};

const close = () => {
  dialog.value = false;
  editedItem.value = { ...defaultItem };
  editedIndex.value = -1;
};

const save = async () => {
  if (editedIndex.value > -1) {
    const res = await axios.put(
      `${process.env.VUE_APP_API_URL}/devices/updatesingledevicedetails?deviceId=${itemId}`,
      editedItem.value,
    );
    if (res.status === 200) {
      toast.success("Device Updated successfully.", {
        timeout: 3000,
      });
    }
  }
  close();
};

const assignDevicesToDoctor = () => {
  if (selected.value.length > 0) {
    assignDeviceDoctorDialog.value = true;
    selectedHeaders.value = selected.value[0].doctorFullName;
    store.dispatch("doctors/getAllPatientsData", getDoctorId);
  } else {
    toast.error("You must select atleast one device to assign.", {
      timeout: 3000,
    });
  }
};

const assignDevicesToPatient = () => {
  if (selected.value.length > 0) {
    assignDevicePatientDialog.value = true;
    selectedHeadersPatient.value = selected.value[0].fullName;
    store.dispatch("doctors/getAllPatientsData", getDoctorId);
  } else {
    toast.error("You must select atleast one device to assign.", {
      timeout: 3000,
    });
  }
};

const checkValidAssignDoctor = async () => {
  isValidAssignDoctor.value = await data.value.assign.open(
    "Some of device are already assigned to doctor. Do You wish to continue?",
  );
  return isValidAssignDoctor;
};

const checkValidAssignPatient = async () => {
  isValidAssignPatient.value = await data.value.assign.open(
    "Some of device are already assigned to doctor. Do You wish to continue?",
  );
  return isValidAssignPatient;
};

const getSelectedValue = () => {
  const macAddress = selected.value.map((data) => data.macAddressFramed);
  const data = {
    devices: macAddress,
    doctorId: selectedHeaders.value?.id, // Corrected typo: docterId to doctorId
  };
  if (selectedHeaders.value && selectedHeaders.value !== null) {
    checkAssignDevicesToDoctor.value
      .then((res) => {
        if (res.message === "devices assigned to  doctor successfully.") {
          selected.value = [];
          assignDeviceDoctorDialog.value = false;
          setTimeout(() => {
            getAllDevices();
          }, 500);
          toast.success(res.message, { timeout: 3000 });
          return;
        } else {
          checkValidAssignDoctor().then((res) => {
            console.log(res);
            assignDeviceToDoctor.value(data);
            selected.value = [];
            assignDeviceDoctorDialog.value = false;
            setTimeout(() => {
              getAllDevices();
            }, 500);
            toast.success("device assigned to doctor successfully.", {
              timeout: 3000,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  }
  selectedHeaders.value = {};
};

const getSelectedValuePatient = () => {
  const macAddress = selected.value.map((data) => data.macAddressFramed);
  const data = {
    devices: macAddress,
    customerId: selectedHeadersPatient.value?.id,
  };
  if (selectedHeadersPatient.value && selectedHeadersPatient.value !== null) {
    checkAssignDevicesToPatient
      .value(data)
      .then((res) => {
        if (res.message === "devices assigned to customer successfully.") {
          selected.value = [];
          assignDevicePatientDialog.value = false;
          setTimeout(() => {
            getAllDevices();
          }, 500);
          toast.success(res.message, { timeout: 3000 });
        } else {
          checkValidAssignPatient().then((res) => {
            console.log(res);
            assignDeviceToPatient.value(data);
            selected.value = [];
            assignDevicePatientDialog.value = false;
            setTimeout(() => {
              getAllDevices();
            }, 500);
            toast.success("device assigned to customer successfully.", {
              timeout: 3000,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  }
  selectedHeadersPatient.value = {};
};
watch(editedItem, () => {
  getAllDevices();
});

onMounted(() => {
  getAllDevices();
});
</script>

<template>
  <div>
    <PageHeader
      title="Device List"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
    />
    <div class="text-right mb-5">
      <v-btn
        color="warning"
        height="53"
        width="248"
        class="text-start mr-auto mt-2 mb-2"
        v-if="role === 'Admin'"
        @click.stop="addDialog = true"
        >Add Device</v-btn
      >
      <v-btn
        color="warning"
        height="53"
        width="248"
        class="text-start mr-auto ml-10 mt-2 mb-2"
        v-if="role === 'Admin'"
        @click="assignDevicesToDoctor"
        >Assign to Doctor</v-btn
      >
      <v-btn
        color="warning"
        height="53"
        width="248"
        class="text-start mr-auto ml-10 mt-2 mb-2"
        v-if="role === 'Admin'"
        @click="assignDevicesToPatient"
        >Assign to Customer</v-btn
      >
    </div>
    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      overlay-color="white"
      persistent
      v-model="addDialog"
    >
      <v-card class="pa-sm-10 pa-5">
        <h4 class="text-h6 font-weight-bold mb-5">Add Device</h4>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                class="input-theme"
                label="Device Name"
                v-model.trim="device.name"
                :rules="nameRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                class="input-theme"
                label="Mac Address"
                v-model.trim="device.macAddress"
                :rules="macAddressRules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
                max-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    class="input-theme"
                    label="Manufacture Month"
                    readonly
                    hide-details
                    :value="device.dateValue"
                    @focus="focusDate"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="en-in"
                  v-model="device.dateValue"
                  no-title
                  @input="dateMenu = false"
                  :max="new Date().toISOString().slice(0, 10)"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <div class="mt-7 text-left">
            <v-btn color="warning" large :disabled="!valid" @click="addDevice">
              Add Device
            </v-btn>
            <v-btn
              color="warning"
              class="ml-5"
              outlined
              large
              @click="addDialog = false"
            >
              Cancel
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      overlay-color="white"
      persistent
      v-model="assignDevicePatientDialog"
    >
      <v-card class="pa-sm-10 pa-5">
        <h4 class="text-h6 font-weight-bold mb-5">
          Select below patient to assign device
        </h4>
        <v-row>
          <v-col cols="12" sm="12" md="12" class="mb-3">
            <v-select
              class="theme-select-box text-capitalize"
              :items="getAllPatientsOnly"
              v-model="selectedHeadersPatient"
              @change="getSelectedValuePatient"
              item-text="fullName"
              return-object
              placeholder="Select Patient"
            ></v-select>
          </v-col>
        </v-row>
        <v-btn
          color="warning"
          large
          outlined
          class="px-10"
          @click="assignDevicePatientDialog = false"
        >
          Cancel
        </v-btn>
      </v-card>
    </v-dialog>

    <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      overlay-color="white"
      persistent
      v-model="assignDeviceDoctorDialog"
    >
      <v-card class="pa-sm-10 pa-5">
        <h4 class="text-h6 font-weight-bold mb-5">
          Select below doctor to assign device
        </h4>
        <v-row>
          <v-col cols="12" sm="12" md="12" class="mb-3">
            <v-select
              :items="getAllDoctorsOnly"
              v-model="selectedHeaders"
              @change="getSelectedValue"
              return-object
              item-text="fullName"
              placeholder="Select Doctor"
              class="theme-select-box text-capitalize"
            ></v-select>
          </v-col>
        </v-row>
        <v-btn
          color="warning"
          large
          class="px-10"
          outlined
          @click="assignDeviceDoctorDialog = false"
        >
          Cancel
        </v-btn>
      </v-card>
    </v-dialog>

    <div class="table-changes">
      <v-data-table
        :loading="loadingStatus"
        loading-text="Loading... Please wait"
        :headers="headers"
        :items="getDevices"
        :items-per-page="5"
        class="elevation-1 table text-capitalize"
        show-select
        v-model="selected"
        :search="searchUserString"
        :custom-filter="searchUser"
      >
        <template v-slot:top>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="searchUserString"
              label="Search User By Name or Mac Address..."
              class="input-theme"
            ></v-text-field>
          </v-col>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <button
            class="btn btn-orange"
            v-if="role === 'Admin'"
            @click="editDevice(item)"
          >
            <v-icon color="white" size="18"> mdi-pencil </v-icon>
          </button>
          <button
            class="btn btn-info"
            v-if="role === 'Admin'"
            @click="deleteSingleDevice(item.id)"
          >
            <v-icon size="18" color="white">mdi-delete</v-icon>
          </button>
        </template>
      </v-data-table>

      <v-dialog
        v-model="dialog"
        max-width="600px"
        persistent
        overlay-color="white"
      >
        <v-card>
          <v-card-title>
            <span class="text-h5 ml-3">Edit</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    class="input-theme"
                    v-model="editedItem.name"
                    label="Device Name"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <div class="mb-5">
              <v-btn color="warning" large @click="save"> Save </v-btn>
              <v-btn color="warning" large outlined class="ml-5" @click="close">
                Cancel
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <ConfirmDialog ref="confirm" />
    <device-assign-dialog ref="assign" />
  </div>
</template>

<style scoped>
.v-item-group {
  display: flex;
  justify-content: space-evenly;
}

.btn {
  padding: 9px;
  color: #fff;
  margin-left: 12px;
  border-radius: 10px;
}
.btn-orange {
  background-color: #f58220;
}
.btn-info {
  background-color: #1ad2d9;
}
</style>
