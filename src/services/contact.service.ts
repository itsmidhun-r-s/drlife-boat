import api from './api';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  country: string;
  state?: string;
  primaryMedicalQualification: string;
  /** e.g. "Online AMC", "Offline PLAB" */
  courses: string[];
  message?: string;
}

export const contactService = {
  send: async (payload: ContactPayload) => {
    const { data } = await api.post('/contact', payload, { skipAuthRefresh: true });
    return data?.data;
  }
};
