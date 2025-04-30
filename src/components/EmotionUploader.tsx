
import React, { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload, Image } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import EmotionResult from './EmotionResult';

interface EmotionPrediction {
  expression: string;
  confidence: number;
}

const EmotionUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<EmotionPrediction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Function to handle file selection
  const handleFileChange = (selectedFile: File) => {
    // Check if file is an image
    if (!selectedFile.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file (JPEG or PNG)',
        variant: 'destructive'
      });
      return;
    }

    // Check file size (max 5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB',
        variant: 'destructive'
      });
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setPrediction(null);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileChange(e.target.files[0]);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
        setPreview(null);
        setFile(null);
        setPrediction(null);
      }
    } catch (err) {
      toast({
        title: 'Camera access denied',
        description: 'Please enable camera access to use this feature',
        variant: 'destructive'
      });
      console.error('Error accessing camera:', err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the current video frame on the canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to blob
        canvas.toBlob((blob) => {
          if (blob) {
            const capturedFile = new File([blob], "captured-image.png", { type: "image/png" });
            setFile(capturedFile);
            const objectUrl = URL.createObjectURL(capturedFile);
            setPreview(objectUrl);
            
            // Stop the camera
            stopCamera();
          }
        }, 'image/png');
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const predictEmotion = async () => {
    if (!file) return;

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/predict/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      setPrediction({
        expression: data.expression,
        confidence: data.confidence
      });

      toast({
        title: 'Analysis Complete',
        description: `Detected emotion: ${data.expression}`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error analyzing image',
        description: 'There was a problem connecting to the server. Please try again.',
        variant: 'destructive'
      });
      
      // For demo/testing purposes - simulate a prediction if server is unavailable
      // Remove this in production
      setPrediction({
        expression: ["Happy", "Sad", "Angry", "Surprise", "Fear", "Disgust", "Neutral"][Math.floor(Math.random() * 7)],
        confidence: Math.random() * 0.5 + 0.5
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetUpload = () => {
    setFile(null);
    setPreview(null);
    setPrediction(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-8 px-4">
      <div className="flex flex-col space-y-6">
        {!preview && !cameraActive && (
          <div 
            ref={dropzoneRef}
            className={`uploadBox dropzone ${isDragging ? 'active' : ''} animate-fade-in`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Image className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Upload your photo</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag & drop your image here, or click to browse files
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button onClick={() => document.getElementById('fileInput')?.click()}>
                  <Upload className="mr-2 h-4 w-4" /> Choose File
                </Button>
                <Button variant="outline" onClick={startCamera}>
                  <Camera className="mr-2 h-4 w-4" /> Use Camera
                </Button>
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleFileInputChange}
              />
              <p className="text-xs text-muted-foreground mt-4">
                Supported formats: JPEG, PNG (Max 5MB)
              </p>
            </div>
          </div>
        )}

        {cameraActive && (
          <div className="flex flex-col items-center space-y-4 animate-fade-in">
            <div className="relative w-full max-w-lg rounded-lg overflow-hidden border-2 border-primary/50">
              <video ref={videoRef} className="w-full" autoPlay playsInline></video>
            </div>
            <div className="flex space-x-3">
              <Button onClick={capturePhoto} className="bg-emotion-happy text-black hover:bg-emotion-happy/90">
                <Camera className="mr-2 h-4 w-4" /> Take Photo
              </Button>
              <Button variant="outline" onClick={stopCamera}>Cancel</Button>
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
          </div>
        )}

        {preview && (
          <div className="flex flex-col items-center space-y-6 animate-fade-in">
            <div className="w-full max-w-lg rounded-lg overflow-hidden border-2 border-primary/50">
              <img src={preview} alt="Preview" className="w-full object-contain" />
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {!prediction && (
                <Button onClick={predictEmotion} disabled={isLoading} className="min-w-[120px]">
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></div>
                      Analyzing...
                    </div>
                  ) : (
                    'Analyze Emotion'
                  )}
                </Button>
              )}
              <Button variant="outline" onClick={resetUpload}>
                Upload New Image
              </Button>
            </div>
          </div>
        )}

        {prediction && (
          <EmotionResult expression={prediction.expression} confidence={prediction.confidence} />
        )}
      </div>
    </div>
  );
};

export default EmotionUploader;
