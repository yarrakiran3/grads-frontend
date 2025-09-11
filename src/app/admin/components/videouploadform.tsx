// components/VideoUploadForm.tsx
'use client'

import { useState, FormEvent } from 'react'
import { Upload, X, FileVideo, Loader2 } from 'lucide-react'
import { apiClient, apiUtils } from '@/app/api/api'
import { set } from 'zod'

interface VideoUploadFormProps {
  courseId: number
  onSuccess?: () => void
  onError?: (error: string) => void
}

interface VideoData {
  id: number
  courseId: number
  title: string
  s3ObjectKey: string
  orderIndex: number
  fileSizeBytes: number
}

interface ApiResponse {
  success: boolean
  data?: VideoData
  message: string
  error?: string
}

export default function VideoUploadForm({ courseId, onSuccess, onError }: VideoUploadFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [orderIndex, setOrderIndex] = useState<number | ''>('')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
    const [error, setError] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (isVideoFile(droppedFile)) {
        setFile(droppedFile)
        if (!title) {
          setTitle(droppedFile.name.replace(/\.[^/.]+$/, ""))
        }
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (isVideoFile(selectedFile)) {
        setFile(selectedFile)
        setError(null)
        if (!title) {
          setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""))
        }
      }
    }
  }

  const isVideoFile = (file: File): boolean => {
    return file.type.startsWith('video/')
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const removeFile = () => {
    setFile(null)
    setTitle('')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!file) {
      onError?.('Please select a video file')
      return
    }

    if (!title.trim()) {
      onError?.('Please enter a video title')
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title.trim())
      
      if (orderIndex !== '') {
        formData.append('orderIndex', orderIndex.toString())
      }

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + Math.random() * 30, 90))
      }, 500)

      const response = await apiClient.post<ApiResponse>
      (`/videos/upload/${courseId}`, formData,{
        headers:{
            'Content-Type': 'multipart/form-data'
        }
      }
                
        )

      clearInterval(progressInterval)
      setUploadProgress(100)

      

      if (response.status === 200 && response.data.success) {
        onSuccess?.()
        // Reset form
        setFile(null)
        setTitle('')
        setOrderIndex('')
        setUploadProgress(0)
      } else {
        
        throw new Error(response.data.error || 'Upload failed')
      }
    } catch (error:any) {
        console.log(error.original?.response?.data?.error);
        setError(error.original?.response?.data?.error || 'Upload failed')
      onError?.(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Video</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Area */}
        <div>
            {
            error && 
                <div>
                    <p className="text-red-600 text-sm mb-2">{error}</p>
                </div>
            
            }
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Video File
          </label>
          
          {!file ? (
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <FileVideo className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  Drop your video here, or{' '}
                  <label className="text-blue-600 hover:text-blue-500 cursor-pointer">
                    browse
                    <input
                      type="file"
                      className="hidden"
                      accept="video/*"
                      onChange={handleFileSelect}
                    />
                  </label>
                </p>
                <p className="text-sm text-gray-500">
                  Support for MP4, MOV, AVI, WebM files
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-3">
                <FileVideo className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Video Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter video title"
            required
          />
        </div>

        {/* Order Index Input */}
        <div>
          <label htmlFor="orderIndex" className="block text-sm font-medium text-gray-700 mb-2">
            Order Index (Optional)
          </label>
          <input
            type="number"
            id="orderIndex"
            value={orderIndex}
            onChange={(e) => setOrderIndex(e.target.value ? parseInt(e.target.value) : '')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Auto-generated if not provided"
            min="1"
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave empty to auto-assign the next available order
          </p>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">Uploading...</span>
              <span className="text-gray-700">{Math.round(uploadProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading || !file || !title.trim()}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isUploading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="-ml-1 mr-2 h-4 w-4" />
              Upload Video
            </>
          )}
        </button>
      </form>
    </div>
  )
}
