
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 EmotionPeek. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">About</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
