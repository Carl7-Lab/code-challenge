import {} from '@radix-ui/react-select';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface props {
  name: string;
  label: string;
  description: string;
  options: { value: string; label: string }[];
}

const SelectInput = ({ name, label, description, options }: props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full space-y-3'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder='Seleccione una opcion' />
              </SelectTrigger>
              <SelectContent>
                {options.map((option, index) => (
                  <SelectItem key={index} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectInput;
