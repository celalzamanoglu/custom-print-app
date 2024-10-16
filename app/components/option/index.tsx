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
  renderValue?: (option: T) => React.ReactNode;
  classNames?: Record<string, string>;
}

export function Option<T>({
  title,
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  renderStartContent,
  renderValue,
  classNames,
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
        renderValue={renderValue ? () => renderValue(value) : undefined}
        classNames={classNames}
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
