
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="border-b bg-gradient-to-r from-primary/5 to-accent/10">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center">
            <div className="bg-primary/10 p-2 rounded-full mr-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold">
                EP
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                EmotionPeek
              </h1>
              <p className="text-xs text-muted-foreground">Facial Expression Recognition</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground italic">
              Detect emotions from your photos instantly
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
