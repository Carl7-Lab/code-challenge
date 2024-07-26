'use client';
import React from 'react';
import { ObjectProps } from '@/interface/ObjectType';
import FamilyTable from './FamilyTable';
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

export interface ObjectData extends ObjectProps {
  _id: string;
  createdAt: Date;
}

interface props {
  object: ObjectData;
}

const ObjectTable = ({ object }: props) => {
  return (
    <div key={object._id} className='mb-8 overflow-y-auto h-[600px]'>
      {/* max-w-5xl flex min-h-screen justify-between */}
      <h2 className='text-xl font-bold mb-4'>
        {object.name} {object.lastName}
      </h2>
      <Table className='max-w-5xl justify-between'>
        <TableCaption>Detalles del Objeto</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Campo</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>{object._id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>{object.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Apellido</TableCell>
            <TableCell>{object.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cédula de Identidad (CI)</TableCell>
            <TableCell>{object.ci}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fecha de Nacimiento</TableCell>
            <TableCell>
              {object.dateOfBirth
                ? new Date(object.dateOfBirth).toLocaleDateString()
                : 'No disponible'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>RUC</TableCell>
            <TableCell>
              {object.hasRUC ? object.rucNumber : 'No tiene RUC'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Género</TableCell>
            <TableCell>{object.gender}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Nombre de la Finca</TableCell>
            <TableCell>{object.farmName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Héctareas de la Finca</TableCell>
            <TableCell>{object.farmHa}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cultivos</TableCell>
            <TableCell>{object.crops.join(', ')}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ocupación de Trabajadores Menores</TableCell>
            <TableCell>{object.minorWorkersOcuppacion}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ocupación de Trabajadores Embarazadas</TableCell>
            <TableCell>{object.pregnandWorkersOcuppacion}</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              <strong>Fecha de Creación:</strong>{' '}
              {object.createdAt
                ? new Date(object.createdAt).toLocaleDateString()
                : 'No disponible'}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <h2 className='text-xl font-bold mb-4'>Familiares</h2>
      <FamilyTable familyMembers={object.family} />
    </div>
  );
};

export default ObjectTable;
