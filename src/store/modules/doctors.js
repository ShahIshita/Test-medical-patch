import doctors from "../../api/doctor";

const state = {
  deviceData: [],
  patientsData: [],
  PatientsDoctor:[],
  singlePatientData: [],
  singleDeviceData: [],
  deletePatient: [],
  loading: false,
  searchTerm: "",
};

const getters = {
  loadingStatus: (state) => state.loading,
  getPatients: (state) => state.deviceData.slice().reverse(),
  getPatientsData: (state) => state.patientsData,
  getPatientsDoctor:(state) => state.PatientsDoctor,
  deletePatient: (state) => state.deletePatient,
  getAllPatientsOnly: (state) =>
    state.patientsData
      .filter((patient) => patient.role === "Customer")
      .slice()
      .reverse(),
  getAllDoctorsOnly: (state) =>
    state.patientsData
      .filter((patient) => patient.role === "Doctor")
      .slice()
      .reverse(),
  getSinglePatientData: (state) => state.singlePatientData.slice(),
  getSingleDeviceData: (state) => state.singleDeviceData.slice(),
  getMacAddress: (state) =>
    state.singleDeviceData.map((data) => data?.macAddressFramed),
  filteredPatients: (state) => {
    if (!state.searchTerm.value) return state.deviceData.slice().reverse();
    return state.deviceData
      .slice()
      .reverse()
      .filter((data) =>
        data.macAddressFramed.includes(
          state.searchTerm.value.trim().toUpperCase(),
        ),
      );
  },
};

const mutations = {
  SET_LOADING_STATUS(state,loadingStatus) {
    state.loading = loadingStatus;
  },

  SET_PATIENTS_FOR_DOCTOR(state, data) {
    state.deviceData = data.map((item) => ({
      id: item._id,
      firstName:
        item.customerfirstName?.charAt(0).toUpperCase() +
        item.customerfirstName?.slice(1),
      lastName:
        item.customerlastName?.charAt(0).toUpperCase() +
        item.customerlastName?.slice(1),
      fullName: item.customerfirstName
        ? `${item.customerfirstName} ${item.customerlastName}`
        : "--",
      doctorFirstName: item.docterfirstName,
      doctorLastName: item.docterlastName,
      macAddress: item.mac_address,
      macAddressFramed: item.mac_address_framed.toUpperCase(),
      name: item.name,
      algodata: item.algodata,
      batdata: item.batdata,
      falldata: item.falldata,
      spo2data: item.spo2data,
      tempdata: item.tempdata,
      isOnline: item.is_online,
    }));
  },

  SET_ALL_PATIENT(state,patients) {
    state.patientsData = patients.map((patient) => ({
      id: patient.userId,
      firstName:
        patient.first_Name?.charAt(0).toUpperCase() +
        patient.first_Name?.slice(1),
      licenseNo: patient.licenseno,
      lastName:
        patient.last_Name?.charAt(0).toUpperCase() +
        patient.last_Name?.slice(1),
      fullName: patient.first_Name
        ? `${patient.first_Name} ${patient.last_Name}`
        : "--",
      email: patient.email,
      address: patient.Address,
      aadharcard: patient.adharcard,
      gender: patient.gender,
      dob: patient.DOB,
      mobileNo: patient.mobile_no,
      gstNo: patient.GSTNO,
      roleId: patient.roleId,
      role: patient.role,
    }));
  },

  SET_SINGLE_PATIENT(state, patientData) {
    state.singlePatientData = patientData.map((patient) => ({
      id: patient.userId,
      firstName: patient.first_Name,
      licenseNo: patient.licenseno,
      fullName: patient.first_Name
        ? `${patient.first_Name} ${patient.last_Name}`
        : "--",
      lastName: patient.last_Name,
      email: patient.email,
      address: patient.Address,
      aadharcard: patient.adharcard,
      gender: patient.gender,
      dob: patient.DOB,
      mobileNo: patient.mobile_no,
      gstNo: patient.GSTNO,
      roleId: patient.roleId,
      role: patient.role,
      emergencyPhone: patient.emergencyPhone,
      height: patient.height,
      weight: patient.weight,
      bloodPressure:
        patient.medical_history && patient.medical_history.length
          ? patient.medical_history[0].bloodPressure
          : "",
      diabetics:
        patient.medical_history && patient.medical_history.length
          ? patient.medical_history[0].diabetics
          : "",
      heartCondition:
        patient.medical_history && patient.medical_history.length
          ? patient.medical_history[0].heartCondition
          : "",
      obesity:
        patient.medical_history && patient.medical_history.length
          ? patient.medical_history[0].obesity
          : "",
      thyroid:
        patient.medical_history && patient.medical_history.length
          ? patient.medical_history[0].thyroid
          : "",
      familyMembers: patient.family_members || [],
    }));
  },

  DELETE_PATIENT(state, patientId) {
    state.singlePatientData = state.singlePatientData.filter(
      (data) => data.id !== patientId,
    );
  },

  SET_SINGLE_DEVICE(state,deviceData) {
    state.singleDeviceData = deviceData.map((device) => ({
      id: device._id,
      name: device.name,
      macAddress: device.mac_address,
      manufactureMonth: device.manufacture_month_year,
      macAddressFramed: device.mac_address_framed,
      doctorFirstName: device.docterfirstName,
      doctorLastName: device.docterlastName,
      customerFirstName: device.customerfirstName,
      customerLastName: device.customerlastName,
      customerFullName: device.customerfirstName
        ? `${device.customerfirstName} ${device.customerlastName}`
        : "--",
      adminId: device.adminId,
      doctorId: device.doctorId,
      customerId: device.customerId,
      algodata: device.algodata,
      batdata: device.batdata,
      falldata: device.falldata,
      spo2data: device.spo2data,
      tempdata: device.tempdata,
      isOnline: device.is_online,
    }));
  },
};

const actions = {
  async getPatientsForDoctor({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    console.log(id);
    const res = await doctors.getAllDevicesOfDoctor(id);
    if (res.status === 200) {
      commit("SET_PATIENTS_FOR_DOCTOR", res.data.data);
      commit("SET_LOADING_STATUS", false);
    }
  },
  async getAllPatientsData({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.getAllPatientsData(id);
    if (res.status === 200) {
      commit("SET_ALL_PATIENT", res.data.data);
      commit("SET_LOADING_STATUS", false);
    }
  },
  async getSinglePatient({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.getSinglePatientData(id);
    if (res.status === 200) {
      commit("SET_SINGLE_PATIENT", res.data.data);
      commit("SET_LOADING_STATUS", false);
    }
  },
  async getSingleDevice({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.getSingleDeviceData(id);
    if (res.status === 200) {
      commit("SET_SINGLE_DEVICE", res.data.data);
      commit("SET_LOADING_STATUS", false);
    }
  },
  async deletePatient({ commit }, id) {
    commit("SET_LOADING_STATUS", true);
    const res = await doctors.deletePatient(id);
    if (res.status === 200) {
      console.log("deleted--", res.data);
      commit("DELETE_PATIENT", id);
      commit("SET_LOADING_STATUS", false);
    }
    return res.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
