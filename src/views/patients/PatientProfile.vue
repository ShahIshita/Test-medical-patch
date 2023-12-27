<script setup>
import PageHeader from "@/layouts/PageHeader.vue";
import { ref, onMounted, computed } from "vue";
import moment from "moment";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();

const role = ref(localStorage.getItem("role"));

const store = useStore();

const { getSinglePatientData, loadingStatus } = store.getters["doctors"];

const formatDate = computed(() => {
  let dateOfBirth = getSinglePatientData.value[0]?.dob;
  let formattedDate = moment(dateOfBirth).format("YYYY-MM-DD");
  return formattedDate;
});

const getSinglePatient = (id) => {
  store.dispatch("doctors/getSinglePatient", id);
};

onMounted(() => {
  getSinglePatient(route.params.id);
});
</script>

<template>
  <div>
    <PageHeader
      title="Profile Details"
      pageIcon="mdi-arrow-left"
      @goBack="router.go(-1)"
    />
    <v-progress-circular
      indeterminate
      color="purple"
      v-if="loadingStatus"
    ></v-progress-circular>
    <v-layout row wrap v-else>
      <v-flex d-flex xs12 md12 sm12 lg12 class="mt-8">
        <div class="d-flex align-center profile-header" style="width: 100%">
          <div class="d-flex align-center">
            <div class="flex-shrink-0">
              <img
                src="@/assets/Ellipse 10.png"
                class="profile-pic"
                contain
                height="120"
                width="120"
              />
            </div>
            <div class="ml-3 ml-md-5 text-start">
              <h3 class="profile-name text-capitalize">
                {{ getSinglePatientData[0]?.fullName }}
              </h3>
              <h4 class="text-start font-weight-regular contact">
                + {{ getSinglePatientData[0]?.mobileNo }}
              </h4>
            </div>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex mr-1 mr-sm-5">
            <v-btn
              class="px-md-10"
              v-if="role === 'Doctor' || role === 'Customer'"
              color="warning"
              outlined
              :height="53"
              @click="router.push(`/edit-patient/${getSinglePatientData[0]?.id}`)"
            >
              <v-icon class="d-md-none">mdi-pencil</v-icon>
              <span class="d-none d-md-block">Edit Profile</span>
            </v-btn>
          </div>
        </div>
      </v-flex>

      <v-flex d-flex xs12 sm12 md6>
        <div class="card-light w-100 pb-4">
          <h4 class="text-left text-h5 font-weight-bold mb-5" style="color: #f58220">
            {{ role !== "Admin" ? "Patient Info" : "Doctor Info" }}
          </h4>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <div class="d-flex flex-column align-start mb-3">
                <small>Email Address</small>
                <h3 class="font-weight-medium word-break">
                  {{ getSinglePatientData[0]?.email }}
                </h3>
              </div>
            </v-col>
            <v-col cols="6" xs="6" sm="6" md="6">
              <div class="d-flex flex-column align-start mb-3">
                <small class="">Date of Birth</small>
                <h3 class="font-weight-medium">
                  {{ formatDate }}
                </h3>
              </div>
            </v-col>
            <v-col cols="6" xs="6" sm="6" md="6">
              <div class="d-flex flex-column align-start mb-3">
                <small>Gender</small>
                <h3 class="font-weight-medium">
                  {{ getSinglePatientData[0]?.gender }}
                </h3>
              </div>
            </v-col>
            <v-col cols="6" sm="6" md="6" v-if="getSinglePatientData[0]?.emergencyPhone">
              <div class="d-flex flex-column align-start mb-3 text-start">
                <small class="font-weight-regular">Emergency No</small>
                <h3 class="font-weight-medium">
                  +{{
                    getSinglePatientData[0]?.emergencyPhone
                      ? getSinglePatientData[0]?.emergencyPhone
                      : "--"
                  }}
                </h3>
              </div>
            </v-col>
            <v-col cols="3" sm="6" md="6" v-if="role !== 'Admin'">
              <div class="d-flex flex-column align-start mb-3">
                <small>Weight</small>
                <h3 class="font-weight-medium">
                  {{
                    getSinglePatientData[0]?.weight
                      ? getSinglePatientData[0]?.weight
                      : "--"
                  }}
                </h3>
              </div>
            </v-col>
            <v-col cols="3" sm="6" md="6" v-if="role !== 'Admin'">
              <div class="d-flex flex-column align-start mb-3">
                <small class="font-weight-regular">Height</small>
                <h3 class="font-weight-medium">
                  {{
                    getSinglePatientData[0]?.height
                      ? getSinglePatientData[0]?.height
                      : "--"
                  }}
                </h3>
              </div>
            </v-col>
          </v-row>

          <v-row v-if="role !== 'Admin'">
            <v-col cols="6" sm="6" md="6">
              <div class="d-flex flex-column align-start mb-3">
                <small class="font-weight-regular">GST No</small>
                <h3 class="font-weight-medium">
                  {{
                    getSinglePatientData[0]?.gstNo ? getSinglePatientData[0]?.gstNo : "--"
                  }}
                </h3>
              </div>
            </v-col>
            <v-col cols="6" sm="6" md="6">
              <div class="d-flex flex-column align-start mb-3">
                <small class="font-weight-regular">Aadhar Number</small>
                <h3 class="font-weight-medium">
                  {{
                    getSinglePatientData[0]?.aadharcard
                      ? getSinglePatientData[0]?.aadharcard
                      : "--"
                  }}
                </h3>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <div class="d-flex flex-column align-start mb-3">
                <small>Address</small>
                <h3>{{ getSinglePatientData[0]?.address }}</h3>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-flex>

      <v-flex d-flex xs12 sm12 md6>
        <div
          class="card-light w-100 pb-4"
          v-if="getSinglePatientData[0]?.familyMembers.length > 0 && role !== 'Admin'"
        >
          <h4 class="text-left text-h5 font-weight-bold mb-5" style="color: #f58220">
            Emergency Contacts
          </h4>
          <v-row class="m-0">
            <v-col
              cols="12"
              sm="6"
              md="6"
              class="pa-0 mb-5"
              v-for="(familyInfo, id) in getSinglePatientData[0]?.familyMembers"
              :key="id"
            >
              <div class="d-flex align-center">
                <div class="d-flex flex-column ml-4">
                  <h3 class="font-weight-bold text-start">
                    {{ familyInfo.name ? familyInfo.name : "--" }}
                  </h3>
                  <h4 class="warning--text text-start font-weight-regular">
                    {{ familyInfo.selectedRelation ? familyInfo.selectedRelation : "--" }}
                  </h4>
                  <small class="text-start">
                    {{ familyInfo.contactNo ? familyInfo.contactNo : "--" }}
                  </small>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-flex>

      <v-flex d-flex xs12 sm12 md6>
        <div class="card-light w-100 pb-4" v-if="role !== 'Admin'">
          <h4 class="text-h5 font-weight-bold text-left mb-5" style="color: #f58220">
            Medical Info
          </h4>
          <v-row>
            <v-col cols="12" sm="12" lg="4">
              <div class="d-flex flex-column align-start mb-3">
                <small>Blood Pressure</small>
                <h3 class="font-weight-medium">
                  {{
                    getSinglePatientData[0]?.bloodPressure
                      ? getSinglePatientData[0]?.bloodPressure
                      : "--"
                  }}
                </h3>
              </div>
            </v-col>
            <v-col cols="6" sm="6" lg="4">
              <div class="d-flex flex-column align-start mb-3">
                <small class="">Diabetics</small>
                <h3 class="font-weight-medium">
                  {{
                    getSinglePatientData[0]?.diabetics
                      ? getSinglePatientData[0]?.diabetics
                      : "--"
                  }}
                </h3>
              </div>
            </v-col>
            <v-col cols="6" sm="6" lg="4">
              <div class="d-flex flex-column align-start mb-3">
                <small class="">Heart Condition</small>
                <h3 class="font-weight-medium">
                  {{
                    getSinglePatientData[0]?.heartCondition
                      ? getSinglePatientData[0]?.heartCondition
                      : "--"
                  }}
                </h3>
              </div>
            </v-col>
            <v-col cols="6" sm="6" lg="4">
              <div class="d-flex flex-column align-start mb-3">
                <small>Thyroid</small>
                <h3 class="font-weight-medium">
                  {{
                    getSinglePatientData[0]?.thyroid
                      ? getSinglePatientData[0]?.thyroid
                      : "--"
                  }}
                </h3>
              </div>
            </v-col>
            <v-col cols="6" sm="6" lg="4">
              <div class="d-flex flex-column align-start mb-3">
                <small class="">Obesity</small>
                <h3 class="font-weight-medium">
                  {{
                    getSinglePatientData[0]?.obesity
                      ? getSinglePatientData[0]?.obesity
                      : "--"
                  }}
                </h3>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<style scoped>
.card__div__left {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
small {
  color: #ababab;
  font-size: 16px;
}
h3 {
  font-size: 20px;
}
.card-light {
  box-shadow: 0px 12px 20px #00000014;
  border: 1px solid #e9e9e9;
  border-radius: 26px;
  padding: 30px;
  margin-top: 30px;
}
.v-btn.v-application .warning--text {
  border-width: 2px;
}
.profile-name {
  font-size: 32px;
}
.contact {
  font-size: 22px;
}
@media (max-width: 991px) {
  .profile-pic {
    width: 100px;
    height: 100px;
  }
  .profile-name {
    font-size: 24px;
  }
  .contact {
    font-size: 18px;
  }
}
@media (max-width: 767px) {
  .card-light {
    padding: 20px;
  }
  .profile-pic {
    width: 80px;
    height: 80px;
  }
  .profile-name {
    font-size: 22px;
  }
  .contact {
    font-size: 16px;
  }
  .v-btn:not(.v-btn--round).v-size--default {
    min-width: 55px;
    padding: 0;
    border-radius: 12px;
  }
}
@media (max-width: 575px) {
  .profile-pic {
    width: 60px;
    height: 60px;
  }
  .profile-name {
    font-size: 20px;
  }
  .contact {
    font-size: 15px;
  }
}
.word-break {
  word-break: break-all;
  text-align: left;
}
</style>
