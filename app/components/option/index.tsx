import React from 'react';
import { Select, SelectItem } from '@nextui-org/react';

interface OptionProps<T> {
  title: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  renderStartContent?: (option: T) => React.ReactNode;
}

export function Option<T>({
  title,
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  renderStartContent,
}: OptionProps<T>) {
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find((option) => getOptionValue(option) === e.target.value);
    if (selectedOption) {
      onChange(selectedOption);
    }
  };

  return (
    <div className="mb-4">
      <Select
        label={title}
        placeholder={`Select ${title}`}
        selectedKeys={[getOptionValue(value)]}
        onChange={handleSelectionChange}
        className="max-w-xs"
      >
        {options.map((option) => (
          <SelectItem
            key={getOptionValue(option)}
            value={getOptionValue(option)}
            startContent={renderStartContent ? renderStartContent(option) : undefined}
          >
            {getOptionLabel(option)}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
