import client from "./index";

export default {
  getAllDevicesOfDoctor: (params) =>
    client.get(`/devices/viewdevicesofdoctor/${params}`),
  getAllPatientsData: (params) => client.get(`/users?doctorId=${params}`),
  getSinglePatientData: (params) =>
    client.get(`/users/useroperation/${params}`),
  getSingleDeviceData: (params) =>
    client.get(`/devices/viewsingledevicedetails/${params}`),

  //update single device details
  updateSingleDevice: (params, id) =>
    client.put(`/devices/updatesingledevicedetails?deviceId=${id}`, params),

  //delete patient
  deletePatient: (params) => client.delete(`/users/useroperation/${params}`),
  //edit patient
  updatePatient: (params) =>
    client.patch(`/users/updateuser/${params.id}`, params),
};
