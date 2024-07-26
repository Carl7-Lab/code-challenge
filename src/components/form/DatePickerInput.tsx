import { es } from 'date-fns/locale';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DateTimePicker } from '../ui/datetime-picker';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

interface props {
  name: string;
  label: string;
  description: string;
}

const DatePickerInput = ({ name, label, description }: props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className=' w-full space-y-3'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DateTimePicker
              locale={es}
              granularity='day'
              value={field.value}
              onChange={field.onChange}
              placeholder={'Seleccione la fecha'}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DatePickerInput;
