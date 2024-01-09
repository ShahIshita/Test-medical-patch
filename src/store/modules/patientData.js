import patient from "@/api/patient";

const state = {
  patientAlgoData: [],
  loading: false,
  bodyTemp: [],
  bloodOxygen: [],
  patientSteps: [],
  heartRate: [],
  ecgData: [],
};

const getters = {
  getPatientAlgoData:(state) => state.patientAlgoData,
  getBodyTempGraphData: (state) => state.bodyTemp,
  getBloodOxygenGraphData: (state) => state.bloodOxygen,
  getPatientSteps: (state) => state.patientSteps,
  getHeartRateGraphData: (state) => state.heartRate,
  getEcgData: (state) => state.ecgData,
};

const mutations = {
  SET_LOADING_STATUS(state, loadingStatus) {
    state.loading = loadingStatus;
  },
  SET_PATIENT_ALGO_DATA(state, patientData) {
    state.patientAlgoData = patientData;
  },
  SET_PATIENT_BODY_TEMP_GRAPHS(state, bodyTemp) {
    state.bodyTemp = bodyTemp;
  },
  SET_PATIENT_BLOOD_OXYGEN_GRAPHS(state, bloodOxygen) {
    state.bloodOxygen = bloodOxygen;
  },
  SET_PATIENT_STEPS_GRAPH(state, steps) {
    state.patientSteps = steps;
  },
  SET_PATIENT_HEART_RATE_GRAPH(state, hr) {
    state.heartRate = hr;
  },
  SET_PATIENT_ECG_DATA(state, ecgData) {
    state.ecgData = ecgData;
  },
};

const actions = {
  async getPatientAlgoData({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    const res = await patient.getPatientAlgoData(payload);
    if (res.status === 200) {
      commit("SET_PATIENT_ALGO_DATA", res.data.data);
      commit("SET_LOADING_STATUS", false);
    }
    return res.data.data;
  },
  async getPatientBodyTempData({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    const res = await patient.getBodyTempGraph(payload);
    if (res.status === 200) {
      console.log("temp---", res.data.data);
      commit("SET_PATIENT_BODY_TEMP_GRAPHS", res.data.data);
      commit("SET_LOADING_STATUS", false);
    }
  },
  async getPatientBloodOxygenData({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    const res = await patient.getBloodOxygenGraph(payload);
    if (res.status === 200) {
      console.log("spo2----", res.data.data);
      commit("SET_PATIENT_BLOOD_OXYGEN_GRAPHS", res.data.data);
      commit("SET_LOADING_STATUS", false);
    }
  },
  async getPatientStepsData({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    const res = await patient.getStepGraph(payload);
    if (res.status === 200) {
      console.log("steps--", res.data.data);
      commit("SET_PATIENT_STEPS_GRAPH", res.data.data);
      commit("SET_LOADING_STATUS", false);
    }
  },
  async getPatientHeartRateData({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    const res = await patient.getHeartRateGraph(payload);
    if (res.status === 200) {
      console.log("heart rate--", res.data.data);
      commit("SET_PATIENT_HEART_RATE_GRAPH", res.data.data);
      commit("SET_LOADING_STATUS", false);
    }
  },
  async getPatientEcgData({ commit }, payload) {
    commit("SET_LOADING_STATUS", true);
    const res = await patient.getPatientEcgData(payload);
    if (res.status === 200) {
      commit("SET_PATIENT_ECG_DATA", res.data.data);
      commit("SET_LOADING_STATUS", false);
    }
    return res.data?.data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
