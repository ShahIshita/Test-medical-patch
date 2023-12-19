import { createStore } from "vuex";
import users from "./modules/users";
import user_management from "./modules/user_management";
import doctors from "./modules/doctors";
import patientData from "./modules/patientData";
import devices from "./modules/devices";

export default createStore({
  modules: {
    users,
    userManagement: user_management,
    doctors,
    patientData,
    devices,
  },
});
