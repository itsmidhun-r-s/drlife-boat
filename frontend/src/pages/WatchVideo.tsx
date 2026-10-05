import { Link, useParams, useSearchParams } from 'react-router-dom';
import MuxPlayer from '@mux/mux-player-react';
import { AlertCircle, Lock } from 'lucide-react';
import SEO from '../components/common/SEO';
import EmptyState from '../components/common/EmptyState';
import { buttonVariants } from '../components/common/buttonVariants';
import { useVideoAccess } from '../hooks/useVideoAccess';

const WatchVideo = () => {
  const { videoId = '' } = useParams();
  const [params] = useSearchParams();
  // The course page links here with ?level=low|medium|high
  const level = params.get('level') ?? 'low';

  const { canAccess, playbackUrl, video, isLoading, error, upgradeRequired } = useVideoAccess(
    videoId,
    level
  );

  if (!canAccess) {
    return (
      <EmptyState
        icon={Lock}
        title={upgradeRequired ? 'Upgrade to watch this lesson' : 'Subscription required'}
        description="An active plan that includes this lesson is needed to start playback."
        action={
          <Link to="/pricing" className={buttonVariants()}>
            View plans
          </Link>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <SEO title={video?.title ?? 'Lesson'} />
      <h1 className="mb-6 text-2xl font-bold">{video?.title ?? 'Lesson'}</h1>

      {isLoading && <div className="skeleton aspect-video" />}

      {error && (
        <EmptyState
          icon={AlertCircle}
          title="Couldn't load this video"
          description="Please refresh the page or try again in a moment."
        />
      )}

      {playbackUrl && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-card">
          <MuxPlayer
            src={playbackUrl}
            streamType="on-demand"
            accentColor="#ff9400"
            title={video?.title}
            className="aspect-video w-full"
          />
        </div>
      )}
    </div>
  );
};

export default WatchVideo;
