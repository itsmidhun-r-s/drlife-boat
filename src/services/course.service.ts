import api from './api';

export interface Course {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  level?: string;
  category?: string;
}

export interface CourseVideo {
  _id: string;
  title: string;
  duration?: number | string;
  accessLevel?: 'low' | 'medium' | 'high';
}

export interface CourseModule {
  _id: string;
  title: string;
  description?: string;
  videos?: CourseVideo[];
}

const toArray = <T,>(payload: unknown, key: string): T[] => {
  if (Array.isArray(payload)) return payload as T[];
  const nested = (payload as Record<string, unknown> | null)?.[key];
  return Array.isArray(nested) ? (nested as T[]) : [];
};

export const courseService = {
  getAll: async (params?: { category?: string; level?: string }): Promise<Course[]> => {
    const { data } = await api.get('/courses', { params });
    return toArray<Course>(data.data, 'courses');
  },

  getBySlug: async (slug: string): Promise<Course> => {
    const { data } = await api.get(`/courses/${slug}`);
    return data.data?.course ?? data.data;
  },

  getModules: async (courseId: string): Promise<CourseModule[]> => {
    const { data } = await api.get(`/courses/${courseId}/modules`);
    return toArray<CourseModule>(data.data, 'modules');
  },

  getVideoPlayback: async (videoId: string) => {
    const { data } = await api.get(`/videos/${videoId}/playback`);
    return data.data;
  }
};
