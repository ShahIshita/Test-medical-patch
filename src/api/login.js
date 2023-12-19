import client from "./index";

export default {
  loginApi: (params) => client.post("/users/webLogin", params),
  registerApi: (params) => client.post("/users/signup", params),
};
