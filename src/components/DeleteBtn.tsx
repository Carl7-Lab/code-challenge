import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';

const DeleteBtn = ({ id }: { id: string }) => {
  const uri = process.env.NEXT_PUBLIC_URI!;

  const deleteRecord = async () => {
    try {
      const response = await fetch(`${uri}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        console.log('was not ok');
        throw new Error('Network response was not ok');
      }
      console.log('eliminado...');
      window.location.reload();
    } catch (error: any) {
      console.log('error: ', error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>Eliminar</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente tu
            objeto y eliminará tus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={deleteRecord}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBtn;
