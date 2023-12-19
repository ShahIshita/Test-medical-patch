import client from "./index";

export default {
  getPatientAlgoData: (params) =>
    client.post(
      `devices/getalgodata?mac_address_framed=${params.mac_address_framed}`,
    ),
  getStepGraph: (params) =>
    client.post(
      `devices/getstepdata?speedometerId=${params.speedometerId}&agrFunction=${params.agrFunction}&timePeriod=${params.timePeriod}&startDate=${params.startDate}&endDate=${params.endDate}`,
    ),
  getBloodOxygenGraph: (params) =>
    client.post(
      `devices/getspo2data?speedometerId=${params.speedometerId}&agrFunction=${params.agrFunction}&timePeriod=${params.timePeriod}&startDate=${params.startDate}&endDate=${params.endDate}`,
    ),
  getBodyTempGraph: (params) =>
    client.post(
      `devices/gettempdata?speedometerId=${params.speedometerId}&agrFunction=${params.agrFunction}&timePeriod=${params.timePeriod}&startDate=${params.startDate}&endDate=${params.endDate}`,
    ),
  getHeartRateGraph: (params) =>
    client.post(
      `devices/gethrdata?speedometerId=${params.speedometerId}&agrFunction=${params.agrFunction}&timePeriod=${params.timePeriod}&startDate=${params.startDate}&endDate=${params.endDate}`,
    ),
  getPatientEcgData: (params) =>
    client.post(
      `devices/getecgdata?mac_address_framed=${params.mac_address_framed}&startDate=${params.startDate}&endDate=${params.endDate}`,
    ),
};
