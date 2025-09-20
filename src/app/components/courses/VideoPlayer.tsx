import { useState, useRef, useEffect } from 'react';
import { courseAPI } from '@/app/api/api';
import { Video } from '@/app/model/course';

const VideoPlayer = ({ video, courseId, onProgress }:{video:Video,courseId:number,onProgress:boolean}) => {
  const videoRef:any = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  // CloudFront URL for video streaming
  const videoUrl = `${process.env.NEXT_PUBLIC_CLOUDFRONT_URL}/${video.s3ObjectKey}`;

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateTime = () => setCurrentTime(videoElement.currentTime);
    const updateDuration = () => setDuration(videoElement.duration);
    
    const updateProgress = () => {
      const progressPercent = (videoElement.currentTime / videoElement.duration) * 100;
      setProgress(progressPercent);
      
      // Update progress every 10 seconds
      if (Math.floor(videoElement.currentTime) % 10 === 0) {
        courseAPI.updateProgress(courseId, video.id, progressPercent)
          .catch(console.error);
      }
    };

    videoElement.addEventListener('timeupdate', updateTime);
    videoElement.addEventListener('timeupdate', updateProgress);
    videoElement.addEventListener('loadedmetadata', updateDuration);
    videoElement.addEventListener('play', () => setIsPlaying(true));
    videoElement.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      videoElement.removeEventListener('timeupdate', updateTime);
      videoElement.removeEventListener('timeupdate', updateProgress);
      videoElement.removeEventListener('loadedmetadata', updateDuration);
      videoElement.removeEventListener('play', () => setIsPlaying(true));
      videoElement.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, [video.id, courseId]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleSeek = (e:any) => {
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const seekTime = percent * duration;
    
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (time:number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full aspect-video"
        poster="/video-placeholder.jpg"
      />
      
      {/* Custom Controls */}
      <div className="bg-gray-900 text-white p-4">
        <div className="flex items-center space-x-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          {/* Progress Bar */}
          <div className="flex-1">
            <div
              className="bg-gray-700 h-2 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>
          
          {/* Time Display */}
          <div className="text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
        
        {/* Video Title */}
        <div className="mt-2">
          <h3 className="text-lg font-semibold">{video.title}</h3>
          <div className="text-sm text-gray-400">
            Progress: {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
