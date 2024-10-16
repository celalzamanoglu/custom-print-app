import { Card } from '@nextui-org/react';
import { IconType } from 'react-icons';

interface StepCardProps {
  id: number;
  icon: IconType;
  title: string;
  description: string;
}

export const StepCard: React.FC<StepCardProps> = ({ id, icon: Icon, title, description }) => {
  return (
    <Card className="p-6 w-80 hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center">
        <div className="text-5xl mb-4 text-[#1c1c1e]">
          <Icon />
        </div>
        <h3 className="text-xl font-semibold mb-2">STEP {id}</h3>
        <h4 className="text-lg font-medium mb-2 text-center">{title}</h4>
        <p className="text-center">{description}</p>
      </div>
    </Card>
  );
};
