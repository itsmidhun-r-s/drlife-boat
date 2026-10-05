import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';

const ACCESS_HIERARCHY: Record<string, string[]> = {
  low: ['low'],
  medium: ['low', 'medium'],
  high: ['low', 'medium', 'high']
};

export const useVideoAccess = (videoId: string, videoAccessLevel: string) => {
  const { user } = useAuthStore();

  const canAccess = (() => {
    if (!user?.subscription) return false;
    if (user.subscription.status !== 'active') return false;
    if (new Date(user.subscription.endDate) < new Date()) return false;

    const allowed = ACCESS_HIERARCHY[user.subscription.planType] || [];
    return allowed.includes(videoAccessLevel);
  })();

  const { data, isLoading, error } = useQuery({
    queryKey: ['video-playback', videoId],
    queryFn: async () => {
      const { data } = await api.get(`/videos/${videoId}/playback`);
      return data.data;
    },
    enabled: canAccess && !!videoId,
    staleTime: 5 * 60 * 1000,
    retry: false
  });

  return {
    canAccess,
    playbackUrl: data?.playbackUrl as string | undefined,
    video: data?.video,
    isLoading,
    error,
    upgradeRequired: !canAccess && !!user
  };
};
