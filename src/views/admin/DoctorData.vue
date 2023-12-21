<script setup>
import { ref, onMounted } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useStore } from "vuex";
import ConfirmDialog from "../../components/ConfirmDialog.vue";
import useSearch from "@/composable/searchUser";

const { searchUserString, searchUser } = useSearch();

const getAdminId = localStorage.getItem("user_id");
const role = localStorage.getItem("role");
const store = useStore();

const headers = ref([
  { text: "Doctor Image", align: "start", sortable: false, value: "image" },
  { text: "Doctor Name", sortable: false, value: "fullName" },
  { text: "Phone No.", value: "mobileNo" },
  { text: "Actions", value: "actions", sortable: false },
]);

//const dialog = ref(false);
const dataConfirm = ref(null);
const dialogDelete = ref(false);

const { getAllPatientsData, deletePatient } = store.dispatch("doctors", [
  "getAllPatientsData",
  "deletePatient",
]);

const deleteSingleDoctor = async (item) => {
  if (await confirmDelete()) {
    try {
      const data = await deletePatient(item);
      if (data.statusCode === 200) {
        setTimeout(() => {
          getAllPatientsData(getAdminId);
        }, 500);
        dialogDelete.value = true;
        toast.success(data.message, { timeout: 3000 });
      }
    } catch (err) {
      console.log(err);
      setTimeout(() => {
        getAllPatientsData(getAdminId);
      }, 500);
      toast.error(err.message, { timeout: 3000 });
      dialogDelete.value = true;
    }
  }
};

const confirmDelete = async () => {
  return await dataConfirm.value.confirm.open(
    "Are you sure you want to delete this doctor?",
  );
};

onMounted(() => {
  getAllPatientsData(getAdminId);
});
</script>

<template>
  <div>
    <PageHeader
      title="Doctors"
      pageIcon="mdi-arrow-left"
      @goBack="$router.go(-1)"
      btnName="Add Doctor"
      color-name="warning"
      @addNewPatient="$router.push('add-doctor')"
    />
    <br />
    <div class="table-changes">
      <v-data-table
        :loading="loadingStatus"
        loading-text="Loading... Please wait"
        :headers="headers"
        :items="getAllDoctorsOnly"
        :items-per-page="5"
        :search="searchUserString"
        :custom-filter="searchUser"
        class="elevation-1 table text-capitalize"
      >
        <template v-slot:top>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="searchUserString"
              label="Search Doctor By Name..."
              class="input-theme"
            ></v-text-field>
          </v-col>
        </template>
        <template v-slot:[`item.image`]>
          <v-img
            src="@/assets/Ellipse 10.png"
            height="80"
            width="80"
            contain
            class="table-user"
          ></v-img>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <button
            class="btn btn-orange"
            @click="$router.push(`/doctors/${item.id}`)"
          >
            <v-icon color="white" size="22"> mdi-eye </v-icon>
          </button>
          <!-- <button
            class="btn btn-info"
            v-if="role === 'Doctor'"
            @click="$router.push(`/edit-patient/${item.id}`)"
          >
            <v-icon size="22" color="white">mdi-pencil</v-icon>
          </button> -->
          <button
            class="btn btn-danger"
            v-if="role === 'Admin'"
            @click="deleteSingleDoctor(item.id)"
          >
            <v-icon size="22" color="white">mdi-delete</v-icon>
          </button>
        </template>
      </v-data-table>
    </div>
    <ConfirmDialog ref="confirm" />
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.4rem;
}
small {
  font-size: 0.9rem;
  color: grey;
}
.table th {
  font-size: 16px !important;
}
.table tr > td {
  font-size: 24px !important;
}
.table .v-data-footer__select,
.table .v-select__selection,
.table .v-data-footer__pagination {
  font-size: 1rem;
}
@media only screen and (max-width: 960px) {
  .table th {
    font-size: 12px !important;
  }
  .table tr > td {
    font-size: 16px !important;
  }
  .table .v-data-footer__select,
  .table .v-select__selection,
  .table .v-data-footer__pagination {
    font-size: 0.8rem;
  }
}
.btn {
  padding: 9px;
  color: #fff;
  margin-left: 12px;
  border-radius: 10px;
  line-height: 1;
}
.btn-orange {
  background-color: #f58220;
}
.btn-info {
  background-color: #1ad2d9;
}
.btn-danger {
  background-color: #fd5d5d;
}
@media (max-width: 600px) {
  .btn {
    margin-left: 0;
  }
  .btn + .btn {
    margin-left: 8px;
  }
}
</style>
