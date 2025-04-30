
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface EmotionResultProps {
  expression: string;
  confidence: number;
}

const EmotionResult: React.FC<EmotionResultProps> = ({ expression, confidence }) => {
  // Map emotion to color
  const getEmotionColor = (emotion: string): string => {
    const colorMap: Record<string, string> = {
      'Angry': 'emotion-angry',
      'Disgust': 'emotion-disgust',
      'Fear': 'emotion-fear',
      'Happy': 'emotion-happy',
      'Neutral': 'emotion-neutral',
      'Sad': 'emotion-sad',
      'Surprise': 'emotion-surprise'
    };
    
    return colorMap[emotion] || 'primary';
  };

  // Get emoji for emotion
  const getEmotionEmoji = (emotion: string): string => {
    const emojiMap: Record<string, string> = {
      'Angry': '😠',
      'Disgust': '🤢',
      'Fear': '😨',
      'Happy': '😊',
      'Neutral': '😐',
      'Sad': '😢',
      'Surprise': '😮'
    };
    
    return emojiMap[emotion] || '🤔';
  };

  // Get description for emotion
  const getEmotionDescription = (emotion: string): string => {
    const descMap: Record<string, string> = {
      'Angry': 'Signs of frustration or irritation detected.',
      'Disgust': 'Expression indicates aversion or revulsion.',
      'Fear': 'Displays signs of being alarmed or frightened.',
      'Happy': 'Showing joy and contentment in your expression.',
      'Neutral': 'Balanced expression without strong emotion.',
      'Sad': 'Expression indicates unhappiness or sorrow.',
      'Surprise': 'Signs of astonishment or being startled.'
    };
    
    return descMap[emotion] || 'Expression analyzed successfully.';
  };

  const emotionColor = getEmotionColor(expression);
  const confidencePercent = Math.round(confidence * 100);

  return (
    <div className="w-full animate-fade-in">
      <Card className="shadow-md border-t-4" style={{ borderTopColor: `var(--${emotionColor})` }}>
        <CardContent className="pt-6">
          <div className="text-center mb-4">
            <div className="text-6xl mb-2">{getEmotionEmoji(expression)}</div>
            <h2 className="text-2xl font-bold">{expression}</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {getEmotionDescription(expression)}
            </p>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Confidence Score</span>
              <span className="text-sm font-bold">{confidencePercent}%</span>
            </div>
            <Progress 
              value={confidencePercent} 
              className="h-2" 
              indicatorClassName={`bg-${emotionColor}`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmotionResult;
