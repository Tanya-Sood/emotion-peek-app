
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface InfoCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, icon, children }) => {
  return (
    <Card className="shadow-sm transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3">
        {icon && <div className="mb-2">{icon}</div>}
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default InfoCard;
