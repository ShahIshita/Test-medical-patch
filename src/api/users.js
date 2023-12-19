import client from "./index";

export default {
  getAllUsersRoleWise: () => client.get("/users/fetchuserrolewise"),
  getAllUsers: () => client.get("/users"),
  addUser: (params) => client.post("/users/signup", params),
};
