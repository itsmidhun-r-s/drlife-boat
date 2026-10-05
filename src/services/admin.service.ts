import api from './api';

export interface Paged<T> {
  data: T[];
  meta: { total: number; limit: number; page: number };
}

export type EnquiryStatus = 'new' | 'contacted' | 'closed';
export type Role = 'user' | 'mentor' | 'admin';
export type PlanType = 'low' | 'medium' | 'high';

export interface Overview {
  users: number;
  activeSubscriptions: number;
  newEnquiries: number;
  revenue: { currency: string; total: number }[];
}
export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  state?: string;
  qualification: string;
  courses: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
}
export interface AdminPlan {
  _id: string;
  name: string;
  planType: PlanType;
  price: number;
  currency: string;
  durationDays: number;
  description: string;
  features: string[];
  isActive: boolean;
  sortOrder: number;
}
export type PlanInput = Omit<AdminPlan, '_id'>;
export interface AdminPayment {
  id: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  courseSlug?: string;
  courseName?: string;
  planName: string;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed';
  orderId: string;
  paymentId?: string;
  createdAt: string;
  paidAt?: string;
}

export const adminService = {
  overview: async (): Promise<Overview> => (await api.get('/admin/overview')).data.data,

  enquiries: async (p: { status?: EnquiryStatus; page?: number; limit?: number }): Promise<Paged<Enquiry>> =>
    (await api.get('/admin/enquiries', { params: p })).data,
  updateEnquiry: async (id: string, status: EnquiryStatus) =>
    (await api.patch(`/admin/enquiries/${id}`, { status })).data.data,

  users: async (p: { search?: string; page?: number; limit?: number }): Promise<Paged<AdminUser>> =>
    (await api.get('/admin/users', { params: p })).data,
  updateUser: async (id: string, patch: { isActive?: boolean; role?: Role }): Promise<AdminUser> =>
    (await api.patch(`/admin/users/${id}`, patch)).data.data,

  plans: async (): Promise<AdminPlan[]> => (await api.get('/admin/plans')).data.data,
  createPlan: async (body: PlanInput): Promise<AdminPlan> => (await api.post('/admin/plans', body)).data.data,
  updatePlan: async (id: string, body: Partial<PlanInput>): Promise<AdminPlan> =>
    (await api.patch(`/admin/plans/${id}`, body)).data.data,

  payments: async (p: { page?: number; limit?: number }): Promise<Paged<AdminPayment>> =>
    (await api.get('/admin/payments', { params: p })).data
};
