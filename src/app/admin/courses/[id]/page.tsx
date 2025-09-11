// app/courses/[id]/page.tsx  <-- client component
'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import VideoUploadForm from '../../components/videouploadform';

export default function Page() {
  const params = useParams();
  // params?.id can be string | undefined
  useEffect(() => {
    console.log('Client-side id:', params?.id); // browser console
  }, [params]);

  if (!params?.id) return <div>Invalid course ID</div>;

  const courseId = Number(params.id);

  return (
    <div>
      <VideoUploadForm
        courseId={courseId}
        onSuccess={() => console.log('Video uploaded successfully')}
      />
    </div>
  );
}
