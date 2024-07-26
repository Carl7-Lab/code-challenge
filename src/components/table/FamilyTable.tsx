import React from 'react';
import { FamilyProps } from '@/interface/ObjectType';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

interface props {
  familyMembers: FamilyProps[];
}

const FamilyTable = ({ familyMembers }: props) => {
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
        {familyMembers.length > 0 ? (
          familyMembers.map((member, index) => (
            <TableRow key={index}>
              <TableCell>{member.name}</TableCell>
              <TableCell>{member.lastName}</TableCell>
              <TableCell>{member.ci}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3}>No hay miembros familiares.</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default FamilyTable;
