import client from "./index";

export default {
  getAllRolesApi: () => client.get("/roles"),
};
