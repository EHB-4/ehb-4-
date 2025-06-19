import { Client } from 'fhir';

const fhirClient = new Client({
  baseUrl: process.env.FHIR_SERVER_URL,
  auth: {
    token: process.env.FHIR_AUTH_TOKEN,
  },
});

export const getPatient = async (patientId: string) => {
  return fhirClient.request({
    url: `/Patient/${patientId}`,
    method: 'GET',
  });
};

export const createPatient = async (patientData: any) => {
  return fhirClient.request({
    url: '/Patient',
    method: 'POST',
    body: patientData,
  });
};

export const updatePatient = async (patientId: string, patientData: any) => {
  return fhirClient.request({
    url: `/Patient/${patientId}`,
    method: 'PUT',
    body: patientData,
  });
};
