import user from "../../api/login";

const state = {
  user: [],
};

const mutations = {
  setUserInfo(state, data) {
    state.user = data.data.data;
    localStorage.setItem("user_id", data.data?.data[0]?.userId);
    localStorage.setItem("role", data.data?.data[0]?.role);
  },
  removeUserInfo(state) {
    state.user = [];
    localStorage.removeItem("user_id");
    localStorage.removeItem("role");
  },
};

const actions = {
  loginUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      user
        .loginApi(payload)
        .then((res) => {
          if (res.status === 200) {
            commit("setUserInfo", res);
            resolve(true);
          }
        })
        .catch((err) => reject(err));
    });
  },
  logoutUser({ commit }) {
    commit("removeUserInfo");
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
