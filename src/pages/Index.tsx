
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmotionUploader from '@/components/EmotionUploader';
import InfoCard from '@/components/InfoCard';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto">
          <section className="py-10 px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Facial Expression Analyzer</h2>
              <p className="text-muted-foreground">
                Upload a photo or take a snapshot with your camera to instantly analyze
                facial expressions and detect emotions with advanced AI.
              </p>
            </div>
            
            <EmotionUploader />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <InfoCard
                title="How It Works"
                description="Our simple 3-step process"
              >
                <ol className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center rounded-full bg-primary/10 h-6 w-6 text-xs mr-3 mt-0.5">1</span>
                    <span>Upload a photo or take one with your camera</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center rounded-full bg-primary/10 h-6 w-6 text-xs mr-3 mt-0.5">2</span>
                    <span>Click "Analyze Emotion" to process the image</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center rounded-full bg-primary/10 h-6 w-6 text-xs mr-3 mt-0.5">3</span>
                    <span>View the detected emotion and confidence score</span>
                  </li>
                </ol>
              </InfoCard>
              
              <InfoCard
                title="Privacy First"
                description="Your data stays private"
              >
                <p className="text-sm">
                  Your photos are processed securely and never stored on our servers. 
                  All processing is done in real-time, ensuring your privacy is protected.
                </p>
              </InfoCard>
              
              <InfoCard
                title="Emotions Detected"
                description="Our AI recognizes 7 emotions"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emotion-happy mr-2"></div>
                    <span className="text-sm">Happy</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emotion-sad mr-2"></div>
                    <span className="text-sm">Sad</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emotion-angry mr-2"></div>
                    <span className="text-sm">Angry</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emotion-fear mr-2"></div>
                    <span className="text-sm">Fear</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emotion-disgust mr-2"></div>
                    <span className="text-sm">Disgust</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emotion-surprise mr-2"></div>
                    <span className="text-sm">Surprise</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-emotion-neutral mr-2"></div>
                    <span className="text-sm">Neutral</span>
                  </div>
                </div>
              </InfoCard>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
