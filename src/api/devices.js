import client from "./index";

export default {
  getAllDevices: () => client.get("/devices/viewalldevices/"),
  deleteSingleDevice: (params) =>
    client.delete(`/devices/removesingledevice?vehicleId=${params}`),
  //add device(Admin)
  addDeviceData: (params) => client.post("/devices/", params),

  //check assign device to doctor
  checkDeviceAssignToDoctor: (params) =>
    client.post("/devices/checkdeviceassigntodoctor", params),
  deviceAssignToDoctor: (params) =>
    client.post("/devices/deviceassigntodoctor", params),

  //check assign device to customer
  checkDeviceAssignToCustomer: (params) =>
    client.post("/devices/checkdeviceassigntocustomer", params),
  deviceAssignToCustomer: (params) =>
    client.post("/devices/deviceassigntocustomer", params),
};
