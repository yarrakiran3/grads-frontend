'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  s3ObjectKey: string;
  orderIndex: number;
}

const SimpleVideoPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get data from URL parameters
  const courseId = searchParams.get('courseId');
  const courseTitle = searchParams.get('courseTitle');
  const videoId = searchParams.get('videoId');
  const videosData = searchParams.get('videos');
  
  // Parse videos from URL parameter
  const videos: Video[] = videosData ? JSON.parse(decodeURIComponent(videosData)) : [];
  const currentVideo = videos.find(v => v.id === parseInt(videoId || '0'));
  
  // Fix the URL construction - add https:// protocol
  const fullVideoUrl = currentVideo?.s3ObjectKey 
    ? `https://dpkqhvm92flq3.cloudfront.net/${currentVideo.s3ObjectKey}` 
    : '';

  useEffect(() => {
    // Set current video index
    const index = videos.findIndex(v => v.id === parseInt(videoId || '0'));
    setCurrentVideoIndex(index);
  }, [videoId, videos]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleEnded = () => {
      setPlaying(false);
      // Auto-play next video
      if (currentVideoIndex < videos.length - 1) {
        playNextVideo();
      }
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [currentVideoIndex, videos]);

  const togglePlayPause = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (playing) {
        videoElement.pause();
      } else {
        videoElement.play().catch(console.error);
      }
    }
  };

  const playPreviousVideo = () => {
    if (currentVideoIndex > 0) {
      const prevVideo = videos[currentVideoIndex - 1];
      navigateToVideo(prevVideo);
    }
  };

  const playNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      const nextVideo = videos[currentVideoIndex + 1];
      navigateToVideo(nextVideo);
    }
  };

  const navigateToVideo = (video: Video) => {
    const params = new URLSearchParams({
      courseId: courseId || '',
      courseTitle: courseTitle || '',
      videoId: video.id.toString(),
      videos: encodeURIComponent(JSON.stringify(videos))
    });
    router.push(`/videoplayer?${params.toString()}`);
  };

  const handleBack = () => {
    router.push(`/mycourses/${courseId}`);
  };

  const handleVideoClick = (video: Video) => {
    navigateToVideo(video);
  };

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h3 className="text-lg font-medium mb-2">Video not found</h3>
          <button 
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Course
          </button>
          
          <div className="text-white text-center">
            <h2 className="font-semibold">{courseTitle}</h2>
            <p className="text-sm text-gray-400">{currentVideo.title}</p>
          </div>
          
          <div className="text-white text-sm">
            Video {currentVideoIndex + 1} of {videos.length}
          </div>
        </div>
      </div>

      {/* Video Player Container */}
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Main Video Area */}
        <div className="flex-1 bg-black flex flex-col justify-center">
          <div className="relative max-w-5xl mx-auto w-full">
            <div className="relative">
              {/* Simple HTML5 Video Player with Default Controls */}
              <video
                ref={videoRef}
                src={fullVideoUrl}
                className="w-full aspect-video bg-black"
                controls={true}
                controlsList="nodownload"
                preload="metadata"
                onError={(e) => {
                  console.error('Video error:', e);
                  console.log('Video URL:', fullVideoUrl);
                }}
              />
            </div>

            {/* Simple Custom Controls Overlay */}
            <div className="absolute bottom-16 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="flex items-center justify-center space-x-8 text-white">
                <button
                  onClick={playPreviousVideo}
                  disabled={currentVideoIndex === 0}
                  className="hover:text-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                  title="Previous Video"
                >
                  <SkipBack className="h-10 w-10" />
                </button>

                <button
                  onClick={togglePlayPause}
                  className="hover:text-gray-300 p-4 bg-red-600 rounded-full transition-colors hover:bg-red-700"
                  title={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </button>

                <button
                  onClick={playNextVideo}
                  disabled={currentVideoIndex === videos.length - 1}
                  className="hover:text-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                  title="Next Video"
                >
                  <SkipForward className="h-10 w-10" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Video List */}
        <div className="w-full lg:w-80 bg-gray-900 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-white font-semibold mb-4">Course Videos</h3>
            <div className="space-y-2">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    video.id === currentVideo.id
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 ${
                      video.id === currentVideo.id
                        ? 'bg-white text-red-600'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{video.title}</p>
                      <p className="text-xs opacity-75">Video {index + 1}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleVideoPlayer;