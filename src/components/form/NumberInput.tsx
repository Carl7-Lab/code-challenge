import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface props {
  name: string;
  label: string;
  placeholder: string;
  description: string;
  min?: number;
  max?: number;
  step?: number;
}

const NumberInput = ({
  name,
  label,
  description,
  placeholder,
  min = 0,
  max,
  step = 1,
}: props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='space-y-3 w-full'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type='number'
              min={min}
              max={max}
              step={step}
              placeholder={placeholder}
              value={field.value ?? ''}
              onChange={(e) =>
                field.onChange(
                  e.target.value === '' ? undefined : Number(e.target.value)
                )
              }
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NumberInput;
