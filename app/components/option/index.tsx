import React from 'react';

interface OptionProps<T> {
  title: string;
  options: T[];
  value: T;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
}

export const Option = <T,>({ title, options, value, onChange, getOptionLabel, getOptionValue }: OptionProps<T>) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold' }}>{title}</h3>
      <select 
        style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '0.25rem', marginTop: '0.5rem' }}
        value={getOptionValue(value)}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={getOptionValue(option)} value={getOptionValue(option)}>
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
    </div>
  );
}
