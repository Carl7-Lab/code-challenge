'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ObjectProps } from '@/interface/ObjectType';
import BooleanRadioGroup from './BooleanRadioGroup';
import DatePickerInput from './DatePickerInput';
import FamilyModal from './FamilyModal';
import FamilyTable from './FamilyTable';
import MultiSelectInput from './MultiSelectInput';
import NumberInput from './NumberInput';
import SelectInput from './SelectInput';
import TextInput from './TextInput';
import { objectSchema } from '../../schema/objectSchema';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Form } from '../ui/form';
import { Option } from '../ui/multiple-selector';

interface props {
  formValues?: ObjectProps;
  id?: string;
}

const defaultValuesForm: ObjectProps = {
  name: '',
  lastName: '',
  ci: '',
  dateOfBirth: undefined,
  hasRUC: undefined,
  rucNumber: '',
  gender: undefined,
  hasFarm: undefined,
  farmHa: undefined,
  farmName: '',
  crops: [],
  family: [],
  hasWorkers: undefined,
  totalWorkers: undefined,
  menWorkers: undefined,
  womanWorkers: undefined,
  over18Workers: undefined,
  under18Workers: undefined,
  minorWorkersOcuppacion: '',
  hasPregnandWorkers: undefined,
  pregnandWorkers: undefined,
  pregnandWorkersOcuppacion: '',
};

const genderOptions = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Femenino' },
];

const cropOptions: Option[] = [
  { label: 'Maiz', value: 'maiz' },
  { label: 'Cacao', value: 'cacao' },
  { label: 'Verde', value: 'verde' },
];

const ObjectForm = ({ formValues, id }: props) => {
  const router = useRouter();
  const form = useForm<z.output<typeof objectSchema>>({
    resolver: zodResolver(objectSchema),
    defaultValues: !!formValues
      ? {
          ...formValues,
          dateOfBirth: new Date(formValues?.dateOfBirth as Date),
        }
      : defaultValuesForm,
  });
  const uri = process.env.NEXT_PUBLIC_URI!;
  const [family, setFamily] = useState<any[]>([]);

  const onSubmit = async (data: z.output<typeof objectSchema>) => {
    console.log('data: ', data);

    // if (!formValues) {
    //   try {
    //     const response = await fetch(`${uri}`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     });
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     router.push('/');
    //   } catch (error) {
    //     console.log('error: ', error);
    //   }
    // } else {
    //   try {
    //     const response = await fetch(`${uri}/${id}`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-type': 'application/json',
    //       },
    //       body: JSON.stringify(data),
    //     });
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     router.push('/');
    //   } catch (error) {
    //     console.log('error: ', error);
    //   }
    // }
  };

  return (
    <Form {...form}>
      <Card className='w-full shadow-md'>
        <CardHeader>
          <CardTitle className='mt-10 scroll-m-20 border-b pb-2 text-5xl font-extrabold tracking-tight transition-colors first:mt-0'>
            {!formValues ? 'Formulario de creación' : 'Formulario de edición'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
            <h2 className='mt-10 scroll-m-20 border-b pb-2 text-3xl font-extrabold tracking-tight transition-colors first:mt-0'>
              Información Personal
            </h2>
            <div className='flex gap-2'>
              <TextInput
                name='name'
                label='Nombre:'
                description='Su nombre.'
                isRequired
              />
              <TextInput
                name='lastName'
                label='Apellido:'
                description='Su apellido.'
                isRequired
              />
            </div>
            <div className='flex gap-2'>
              <TextInput
                name='ci'
                label='Cédula de Identidad (CI):'
                description='Ingrese su número de cédula.'
                isRequired
              />
              <DatePickerInput
                name='dateOfBirth'
                label='Fecha de Nacimiento:'
                description='Seleccione su fecha de nacimiento.'
                isRequired
              />
              <SelectInput
                name='gender'
                label='Género:'
                description='Seleccione su género.'
                options={genderOptions}
                isRequired
              />
            </div>
            <h2 className='mt-10 scroll-m-20 border-b pb-2 text-3xl font-extrabold tracking-tight transition-colors first:mt-0'>
              Información Profesional
            </h2>
            <div className='flex gap-2'>
              <BooleanRadioGroup
                control={form.control}
                name='hasRUC'
                label='¿Tiene RUC?:'
                description='Seleccione si tiene RUC.'
                isRequired
              />
            </div>
            <div
              className={`flex gap-2 w-[50%] ${form.watch('hasRUC') ? '' : 'hidden'}`}
            >
              <TextInput
                name='rucNumber'
                label='Número de RUC:'
                description='Su RUC'
              />
            </div>
            <h2 className='mt-10 scroll-m-20 border-b pb-2 text-3xl font-extrabold tracking-tight transition-colors first:mt-0'>
              Información de la Finca
            </h2>
            <div className='flex gap-2'>
              <BooleanRadioGroup
                control={form.control}
                name={'hasFarm'}
                label={'¿Tiene finca?:'}
                description={'Indique si tiene una finca'}
                isRequired
              />
            </div>
            <div
              className={`flex gap-2 ${form.watch('hasFarm') ? '' : 'hidden'}`}
            >
              <NumberInput
                name='farmHa'
                label='Hectáreas de la finca:'
                description='Número de hectáreas.'
                placeholder='Ej. 10.5'
                min={0}
                step={0.01}
              />
              <TextInput
                name='farmName'
                label='Nombre de la finca:'
                description='Ingrese el nombre de su finca.'
              />
              <MultiSelectInput
                name={'crops'}
                label={'Cultivos:'}
                description={'Seleccione los cultivos presentes en su finca.'}
                placeholder={'Seleccione cultivo(s)'}
                options={cropOptions}
              />
            </div>
            <h2 className='mt-10 scroll-m-20 border-b pb-2 text-3xl font-extrabold tracking-tight transition-colors first:mt-0'>
              Información Familiar
            </h2>
            <div className='flex gap-2'>
              <div className='w-full space-y-3'>
                <FamilyModal
                  name={'family'}
                  label={'Miembro Familiar'}
                  description={'Detalles del miembro familiar'}
                />
                <FamilyTable name={'family'} />
              </div>
            </div>
            <h2 className='mt-10 scroll-m-20 border-b pb-2 text-3xl font-extrabold tracking-tight transition-colors first:mt-0'>
              Información de Trabajadores
            </h2>
            <div className='flex gap-2'>
              <BooleanRadioGroup
                control={form.control}
                name={'hasWorkers'}
                label={'¿Tienes trabajadores?:'}
                description={'Indique si tiene trabajadores a su cargo.'}
                isRequired
              />
            </div>
            <div className={`${form.watch('hasWorkers') ? '' : 'hidden'}`}>
              <div className='flex gap-2'>
                <NumberInput
                  name='totalWorkers'
                  label='Total de trabajadores:'
                  description='Número total de trabajadores.'
                  placeholder='Ej. 20'
                  min={0}
                />
                <NumberInput
                  name='menWorkers'
                  label='Trabajadores hombres:'
                  description='Número de hombres.'
                  placeholder='Ej. 10'
                  min={0}
                />
              </div>
              <div className='flex gap-2'>
                <NumberInput
                  name='womanWorkers'
                  label='Trabajadoras mujeres:'
                  description='Número de mujeres.'
                  placeholder='Ej. 15'
                  min={0}
                />
                <NumberInput
                  name='over18Workers'
                  label='Trabajadores mayores de 18 años:'
                  description='Número de mayores de 18 años.'
                  placeholder='Ej. 8'
                  min={0}
                />
              </div>
              <div className='flex gap-2'>
                <NumberInput
                  name='under18Workers'
                  label='Trabajadores menores de 18 años:'
                  description='Número de menores de 18 años.'
                  placeholder='Ej. 5'
                  min={0}
                />
                <TextInput
                  name='minorWorkersOcuppacion'
                  label='Ocupación de los trabajadores menores de edad:'
                  description='Describa la ocupación de los trabajadores menores de edad.'
                />
              </div>
              <div className='flex gap-2'>
                <BooleanRadioGroup
                  control={form.control}
                  name={'hasPregnandWorkers'}
                  label={'¿Tiene trabajadoras embarazadas?:'}
                  description={'Indique si tiene trabajadoras embarazadas.'}
                  isRequired
                />
              </div>
              <div
                className={`flex gap-2 ${form.watch('hasPregnandWorkers') ? '' : 'hidden'}`}
              >
                <NumberInput
                  name='pregnandWorkers'
                  label='Trabajadoras embarazadas:'
                  description='Número de trabajadoras embarazadas.'
                  placeholder='Ej. 3'
                  min={0}
                />
                <TextInput
                  name='pregnandWorkersOcuppacion'
                  label='Ocupación de las trabajadoras embarazadas:'
                  description='Describa la ocupación de las trabajadoras embarazadas.'
                />
              </div>
            </div>
            <Button
              type='submit'
              // onClick={() => {
              //   console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
              //   console.log('values: ', form.getValues());
              //   console.log('Errors: ', form.formState.errors);
              // }}
              className='w-full text-xl h-[50px] font-extrabold'
            >
              {!formValues ? 'Crear' : 'Editar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
};

export default ObjectForm;
