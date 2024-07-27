import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface props {
  name: string;
  remove: any;
}

const FamilyTable = ({ name, remove }: props) => {
  const { getValues, formState } = useFormContext();
  const familyMembers = getValues(name);

  console.log('FamilyTable errors: ', formState.errors);

  return (
    <Table>
      <TableCaption>Lista de Miembros Familiares</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Cédula de Identidad (CI)</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {familyMembers.map(
          (
            member: { name: string; lastName: string; ci: string },
            index: number
          ) => (
            <TableRow key={index}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.lastName}</TableCell>
              <TableCell>{member.ci}</TableCell>
            </TableRow>
          )
        )} */}
        {familyMembers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4}>Datos no disponibles.</TableCell>
          </TableRow>
        ) : (
          familyMembers.map((field: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{field.name}</TableCell>
              <TableCell>{field.lastName}</TableCell>
              <TableCell>{field.ci}</TableCell>
              <TableCell>
                <Button variant='destructive' onClick={() => remove(index)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={!!formState.errors.family ? 3 : 4}>
            Total: {familyMembers.length} miembros
          </TableCell>
          {!!formState.errors.family && (
            <TableCell colSpan={1} className='text-red-500 bg-red-100'>
              {formState.errors.family && 'Error'}
            </TableCell>
          )}
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default FamilyTable;
