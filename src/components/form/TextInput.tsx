import React from 'react';
import { useFormContext } from 'react-hook-form';
import { DynamicFieldName } from '@/interface/DynamicFieldName';
import { ObjectProps } from '@/interface/ObjectType';
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
  name: keyof ObjectProps | DynamicFieldName;
  label?: string;
  description?: string;
  placeholder?: string;
  isRequired?: boolean;
}

const TextInput = ({
  name,
  label,
  description,
  placeholder,
  isRequired = false,
}: props) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className='space-y-3 w-full'>
          {label && (
            <FormLabel>
              {label} {isRequired && <span className='text-red-500'>*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export default TextInput;
