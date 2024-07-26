import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import TextInput from './TextInput';
import { Button } from '../ui/button';
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

const FamilyInput = ({ name, label, description }: props) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as keyof typeof control._fields,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className='space-y-3 w-full'>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div>
              {fields.map((item, index) => (
                <div key={item.id} className='space-y-3 mb-4'>
                  <div className='flex gap-2'>
                    <TextInput
                      name={`${name}[${index}].name`}
                      placeholder={`Nombre`}
                    />
                    <TextInput
                      name={`${name}[${index}].lastName`}
                      placeholder={`Apellido`}
                    />
                    <TextInput
                      name={`${name}[${index}].ci`}
                      placeholder={`CI`}
                    />
                  </div>
                  <Button
                    type='button'
                    variant='destructive'
                    onClick={() => remove(index)}
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
              <Button
                type='button'
                onClick={() => append({ name: '', lastName: '', ci: '' })}
              >
                Agregar
              </Button>
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FamilyInput;
