<script setup>
import { ref, onMounted, defineProps } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";
import moment from "moment";
import doctors from "../../api/doctor";
import PageHeader from "@/layouts/PageHeader.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const valid = ref(true);
const role = localStorage.getItem("role");
const user = ref({});
const dob = ref("");
const dataref = ref(null);
// const selected = ref("");
// const selectRules = [(v) => !!v || "Must select this field."];
const nameRules = [(v) => !!v || "Name is required"];
const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];
// const phoneRules = [  (v) => !!v || "Phone Number is required",
//   (v) => (v && v.length == 10) || "type valid phone number",
//   (v) => (v && v.length > 9) || "type valid phone number",
//   (v) => (v && v.length < 11) || "type valid phone number",
// ];
// const emergencyPhoneRules= [ (v) => !!v || "Phone Number is required",
// (v) => (v && v.length == 10) || "type valid phone number",
//   (v) => (v && v.length > 9) || "type valid phone number",
//   (v) => (v && v.length < 11) || "type valid phone number",
// ];
const addressRules = [(v) => !!v || "Address is required"];
const aadharRules = [
  (v) => !!v || "Aadhar Number is required",
  (v) =>
    /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/.test(v) || "Aadhar Number is invalid",
];
const weightRules = [(v) => !!v || "Weight is required"];
const heightRules = [(v) => !!v || "Height is required"];
// const gstNoRules = [(v) => !!v || "GST Number is required"];
const memberNameRules = [(v) => !!v || "Member name is required"];
const memberRelationRules = [(v) => !!v || "Member Relation is required."];
const bloodPressureRules = [(v) => !!v || "Blood Pressure is required"];
const diabeticsRules = [(v) => !!v || "diabetics is required"];
const thyroidRules = [(v) => !!v || "thyroid is required"];
const obesityRules = [(v) => !!v || "obesity is required"];
const heartConditionRules = [(v) => !!v || "Must enter Heart Condition"];
// const relations = ["Son", "Daughter", "Mother", "Father"];
// const heartCondition = ["Normal"];
const dateMenu = ref(false);
// const dateValue = ref(null);
const loading = ref(false);
const isValidPhoneNumber = ref(false);
const isValidEmergencyNumber = ref(false);
const isValidRelativePhoneNumber = ref(false);

const props = defineProps([
  "preferredCountries",
  "mode",
  "inputOptions",
  "invalidMsg",
  "autoFormat",
  "validCharactersOnly",
  "disabledFormatting",
]);

const phoneProps = ref({
  preferredCountries: props.preferredCountries || ["US", "GB"],
  mode: props.mode || "international",
  inputOptions: {
    showDialCode: false,
    maxlength: 15,
    placeholder: "Enter phone number",
    required: true,
    ...props.inputOptions,
  },
  invalidMsg: props.invalidMsg || "Invalid",
  autoFormat: props.autoFormat || false,
  validCharactersOnly: props.validCharactersOnly || true,
  disabledFormatting: props.disabledFormatting || false,
});

const emergencyPhoneProps = ref({
  preferredCountries: props.preferredCountries || ["US", "GB"],
  mode: props.mode || "international",
  inputOptions: {
    showDialCode: false,
    maxlength: 15,
    placeholder: "Enter emergency phone number",
    required: true,
    ...props.inputOptions,
  },
  invalidMsg: props.invalidMsg || "Invalid",
  autoFormat: props.autoFormat || false,
  validCharactersOnly: props.validCharactersOnly || true,
  disabledFormatting: props.disabledFormatting || false,
});

const relativePhoneProps = ref({
  preferredCountries: props.preferredCountries || ["US", "GB"],
  mode: props.mode || "international",
  inputOptions: {
    showDialCode: false,
    maxlength: 15,
    placeholder: "Enter relative phone number",
    required: true,
    ...props.inputOptions,
  },
  invalidMsg: props.invalidMsg || "Invalid",
  autoFormat: props.autoFormat || false,
  validCharactersOnly: props.validCharactersOnly || true,
  disabledFormatting: props.disabledFormatting || false,
});

onMounted(async () => {
  loading.value = true;
  const res = await doctors.getSinglePatientData(route?.params?.id);
  user.value = res.data.data[0];
  user.value["mobile_no1"] = user.value?.mobile_no.toString();
  user.value["emergencyPhone"] = user.value?.emergencyPhone.toString();
  const dateOfBirth = res.data.data[0].DOB;
  const formattedDate = moment(dateOfBirth).format("YYYY-MM-DD");
  dob.value = formattedDate;
  loading.value = false;
});

const phoneNumberChanged = (e) => {
  isValidPhoneNumber.value = e?.valid;
};

const emergencyPhoneChanged = (e) => {
  isValidEmergencyNumber.value = e?.valid;
};

const relativePhoneChanged = (e) => {
  isValidRelativePhoneNumber.value = e?.valid;
};

const addField = (obj, type) => {
  if (obj.name === "" || obj.selectedRelation === "" || obj.contactNo === "") {
    toast.error("Please enter all details properly.", {
      timeout: 3000,
    });
  } else {
    const newObj = {};
    for (const [key, val] of Object.entries(obj)) {
      newObj[key] = "";
      console.log(val);
    }
    type.push(newObj);
  }
};

const removeField = (index, type) => {
  type.splice(index, 1);
  dataref.value.form.resetValidation();
};

const checkEmptyFamilyMemberInfo = () => {
  for (let i = 0; i < user.value?.family_members.length; i++) {
    if (
      user.value.family_members[i].name === "" ||
      user.value.family_members[i].selectedRelation === "" ||
      user.value.family_members[i].contactNo === null
    ) {
      valid.value = false;
      break;
    }
    valid.value = true;
  }
};

const updateUser = async () => {
  dataref.value.form.validate();
  checkEmptyFamilyMemberInfo();
  console.log("val--", valid.value);
  if (valid.value) {
    if (
      !isValidPhoneNumber.value ||
      !isValidEmergencyNumber.value ||
      !isValidRelativePhoneNumber.value
    ) {
      toast.error("Please enter valid mobile number.", {
        timeout: 3000,
      });
    } else {
      const res = await axios.patch(
        `${process.env.VUE_APP_API_URL}/users/updateuser/${user.value.userId}`,
        user.value,
      );
      if (res.status === 200) {
        if (role === "Doctor") {
          router.push({ path: "/patients" });
        } else if (role === "Customer") {
          router.push({
            path: `/patients/patient/${user.value.userId}`,
          });
        }
        toast.success("User Updated successfully.", {
          timeout: 3000,
        });
      }
    }
  }
};

const focusDate = () => {
  setTimeout(() => {
    if (!dateMenu.value) {
      dateMenu.value = true;
    }
  }, 200);
};
</script>

<template>
  <div>
    <PageHeader
      title="Edit User"
      pageIcon="mdi-arrow-left"
      @goBack="router.go(-1)"
    />
    <v-progress-circular
      indeterminate
      color="blue"
      v-if="loading"
    ></v-progress-circular>
    <v-card-title class="warning--text text-h5 ml-n2 mb-2 font-weight-bold"
      >User Info</v-card-title
    >
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col class="form-group" cols="12" sm="6" lg="4">
          <v-text-field
            type="text"
            v-model.trim="user.first_Name"
            name="fname"
            label="First Name"
            required
            filled
            dense
            :rules="nameRules"
          ></v-text-field>
        </v-col>

        <v-col class="form-group" cols="12" sm="6" lg="4">
          <v-text-field
            type="text"
            v-model.trim="user.last_Name"
            name="lname"
            label="Last Name"
            required
            filled
            dense
            :rules="nameRules"
          ></v-text-field>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" lg="4">
          <v-text-field
            type="email"
            v-model.trim="user.email"
            name="email"
            label="Email"
            required
            filled
            dense
            :rules="emailRules"
          ></v-text-field>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
          <vue-tel-input
            v-model="user.mobile_no"
            v-bind="phoneProps"
            @validate="phoneNumberChanged"
          ></vue-tel-input>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
          <vue-tel-input
            v-model.trim="user.emergencyPhone"
            v-bind="emergencyPhoneProps"
            @validate="emergencyPhoneChanged"
          ></vue-tel-input>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
          <v-radio-group v-model="user.gender" row class="ml-2">
            <template v-slot:label>
              <div><strong>Gender</strong></div>
            </template>
            <v-radio value="male" color="warning">
              <template v-slot:label>
                <div>Male</div>
              </template>
            </v-radio>
            <v-radio value="female" color="warning">
              <template v-slot:label>
                <div>Female</div>
              </template>
            </v-radio>
          </v-radio-group>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
          <v-textarea
            v-model.trim="user.Address"
            auto-grow
            label="Address"
            rows="1"
            filled
            dense
            :rules="addressRules"
          ></v-textarea>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
          <v-text-field
            type="number"
            v-model.trim="user.adharcard"
            name="Aadhar"
            label="Aadhar Card Number"
            required
            filled
            dense
            :rules="aadharRules"
          ></v-text-field>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
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
                label="Date Of Birth"
                readonly
                hide-details
                :value="dob"
                @focus="focusDate"
                filled
                dense
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="en-in"
              v-model="dob"
              no-title
              :max="new Date().toISOString().slice(0, 10)"
              @input="dateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
          <v-text-field
            type="number"
            v-model.trim="user.weight"
            name="weight"
            label="Weight"
            required
            filled
            dense
            :rules="weightRules"
          ></v-text-field>
        </v-col>

        <v-col class="form-group" cols="12" sm="6" md="4">
          <v-text-field
            type="number"
            v-model.trim="user.height"
            name="height"
            label="Height"
            filled
            dense
            :rules="heightRules"
          ></v-text-field>
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="4">
          <v-text-field
            type="number"
            v-model.trim="user.GSTNO"
            name="gstNo"
            label="Gst No"
            required
            filled
            dense
          ></v-text-field>
        </v-col>
      </v-row>

      <v-card-title class="warning--text text-h5 mb-2 ml-n2 font-weight-bold"
        >Emergency Contact Info</v-card-title
      >
      <v-row v-for="(familyInfo, index) in user.family_members" :key="index">
        <v-col class="form-group" cols="12" sm="6" md="3">
          <v-text-field
            type="text"
            label="Member Name"
            :rules="memberNameRules"
            required
            filled
            dense
            v-model.trim="familyInfo.name"
          />
        </v-col>
        <v-col class="form-group" cols="12" sm="6" md="3">
          <!-- <v-select
            :items="relations"
            filled
            dense
            label="Select Relation"
            :rules="selectRules"
            v-model="familyInfo.selectedRelation"
          ></v-select> -->
          <v-text-field
            type="text"
            label="Member Relation"
            :rules="memberRelationRules"
            required
            filled
            dense
            v-model.trim="familyInfo.selectedRelation"
          />
        </v-col>
        <v-col class="form-group" cols="12" sm="12" md="3">
          <vue-tel-input
            v-model.trim="familyInfo.contactNo"
            v-bind="relativePhoneProps"
            @validate="relativePhoneChanged"
          ></vue-tel-input>
        </v-col>
        <v-col class="form-group" cols="12" sm="auto" lg="auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="34"
            height="34"
            class="ml-2 mt-2 main__svg"
            v-show="index == user.family_members.length - 1"
            @click="addField(familyInfo, user.family_members)"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="green"
              d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="34"
            height="34"
            class="ml-10 main__svg"
            v-show="user.family_members.length > 1"
            @click="removeField(index, user.family_members)"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="#EC4899"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z"
            />
          </svg>
        </v-col>
      </v-row>

      <v-card-title class="warning--text text-h5 mb-2 ml-n2 font-weight-bold"
        >Medical History</v-card-title
      >
      <div v-for="(medicalInfo, id) in user.medical_history" :key="'A' + id">
        <v-row>
          <v-col class="form-group" cols="12" sm="6" md="4">
            <v-text-field
              type="number"
              label="Blood Pressure"
              required
              filled
              dense
              :rules="bloodPressureRules"
              v-model.trim="medicalInfo.bloodPressure"
            />
          </v-col>
          <v-col class="form-group" cols="12" sm="6" md="4">
            <v-text-field
              type="number"
              filled
              dense
              label="Diabetics"
              required
              v-model.trim="medicalInfo.diabetics"
              :rules="diabeticsRules"
            ></v-text-field>
          </v-col>
          <v-col class="form-group" cols="12" sm="6" md="4">
            <!-- <v-select
              label="Heart Condition"
              filled
              dense
              :items="heartCondition"
              v-model="medicalInfo.heartCondition"
                    /> -->
            <v-text-field
              type="text"
              label="Heart Condition"
              required
              filled
              dense
              :rules="heartConditionRules"
              v-model.trim="medicalInfo.heartCondition"
            />
          </v-col>
          <v-col class="form-group" cols="12" sm="6" md="4">
            <v-text-field
              type="number"
              label="Thyroid"
              required
              filled
              dense
              :rules="thyroidRules"
              v-model.trim="medicalInfo.thyroid"
            />
          </v-col>
          <v-col class="form-group" cols="12" sm="6" md="4">
            <v-text-field
              type="number"
              filled
              dense
              label="Obesity"
              required
              :rules="obesityRules"
              v-model.trim="medicalInfo.obesity"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div class="mt-2 mb-2 text-left">
        <v-btn
          :disabled="!valid"
          color="warning"
          @click="updateUser"
          class="mr-2 h-auto px-10 py-4"
        >
          Update Patient
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<style scoped>
.row + .row {
  margin-top: 0;
}
.main__svg {
  cursor: pointer;
}
</style>
