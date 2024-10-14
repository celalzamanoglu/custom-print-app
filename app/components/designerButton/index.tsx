import React from 'react';
import { Button } from '@nextui-org/react';

interface DesignerButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

export function DesignerButton({ icon: Icon, label, onClick }: DesignerButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <Button
        color="default"
        variant="light"
        isIconOnly
        className="w-12 h-12 rounded-full"
        onClick={onClick}
      >
        <Icon className="text-xl" />
      </Button>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
}
