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
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface props {
  control: any;
  name: string;
  label: string;
  description: string;
  isRequired?: boolean;
}

const BooleanRadioGroup = ({
  control,
  name,
  label,
  description,
  isRequired = false,
}: props) => {
  const { getValues } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem id={name} className='space-y-3 w-full'>
          <FormLabel htmlFor={name} id={name}>
            {label} {isRequired && <span className='text-red-500'>*</span>}
          </FormLabel>
          <FormControl id={name}>
            <RadioGroup
              name={name}
              id={name}
              onValueChange={(value) => field.onChange(value === 'true')}
              className='flex flex-col space-y-1'
              value={String(getValues(name))}
            >
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='true' />
                </FormControl>
                <FormLabel className='font-normal'>Sí</FormLabel>
              </FormItem>
              <FormItem className='flex items-center space-x-3 space-y-0'>
                <FormControl>
                  <RadioGroupItem value='false' />
                </FormControl>
                <FormLabel className='font-normal'>No</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BooleanRadioGroup;
