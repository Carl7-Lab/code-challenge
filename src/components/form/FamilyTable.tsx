import React from 'react';
import { useFormContext } from 'react-hook-form';
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
}

const FamilyTable = ({ name }: props) => {
  const { getValues, formState } = useFormContext();
  const familyMembers = getValues(name);

  return (
    <Table>
      <TableCaption>Lista de Miembros Familiares</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Cédula de Identidad (CI)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {familyMembers.map(
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
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
            Total: {familyMembers.length} miembros
          </TableCell>
          {!!formState.errors.family && (
            <TableCell colSpan={3} className='text-red-500 bg-red-100'>
              {formState.errors.family && 'Error'}
            </TableCell>
          )}
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default FamilyTable;
