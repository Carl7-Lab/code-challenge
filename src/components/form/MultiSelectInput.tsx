import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import MultipleSelector, { Option } from '../ui/multiple-selector';

interface props {
  name: string;
  label: string;
  description: string;
  options: Option[];
  placeholder?: string;
}

const MultiSelectInput = ({
  name,
  label,
  description,
  options,
  placeholder,
}: props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedOptions = options.filter((option) =>
          field.value?.includes(option.value)
        );

        return (
          <FormItem className='space-y-3 w-full'>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <MultipleSelector
                {...field}
                defaultOptions={options}
                placeholder={placeholder}
                emptyIndicator={
                  <p className='text-center text-lg leading-10 text-gray-600 dark:text-gray-400'>
                    No se encontraron resultados.
                  </p>
                }
                value={selectedOptions}
                onChange={(selectedOptions) => {
                  const values = selectedOptions.map((option) => option.value);
                  field.onChange(values);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default MultiSelectInput;
