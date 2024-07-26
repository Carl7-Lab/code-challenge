import { useRouter } from 'next/navigation';
import React from 'react';
import DeleteBtn from './DeleteBtn';
import ObjectDetailModal from './ObjectDetailModal';
import { ObjectData } from './table/ObjectTable';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

interface props {
  object: ObjectData;
}

const ObjectCard = ({ object }: props) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/edit-object/${object._id}`);
  };

  return (
    <Card className='w-full shadow-md'>
      <CardHeader>
        <CardTitle>
          {object.name} {object.lastName}
        </CardTitle>
        <CardDescription>
          CI: {object.ci} <br />
          Fecha de Nacimiento:
          {object.dateOfBirth
            ? new Date(object.dateOfBirth).toLocaleDateString()
            : 'No disponible'}{' '}
          <br />
          RUC: {object.hasRUC ? object.rucNumber : 'No tiene'}
        </CardDescription>
      </CardHeader>
      {object.hasFarm && (
        <CardContent>
          Nombre de la Finca: {object.farmName} <br />
          Héctareas: {object.farmHa} <br />
          Cultivos: {object.crops.join(', ')}
        </CardContent>
      )}
      <CardFooter className='flex justify-between'>
        <DeleteBtn id={object._id} />
        <div className='flex gap-2'>
          <Button variant='secondary' onClick={handleEditClick}>
            Editar
          </Button>
          <ObjectDetailModal object={object} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ObjectCard;
