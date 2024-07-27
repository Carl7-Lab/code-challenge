import React from 'react';
import { Controller } from 'react-hook-form';
import TextInput from './TextInput';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';

interface props {
  open: boolean;
  control: any;
  fields: any[];
  remove: any;
  handleClose: () => void;
}

const AddFamilyMemberModal = ({
  open,
  control,
  fields,
  remove,
  handleClose,
}: props) => {
  return (
    <AlertDialog
      open={open}
      // onOpenChange={handleClose}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Agregar miembro de la familia</AlertDialogTitle>
        </AlertDialogHeader>
        {fields.length > 0 && (
          <div key={fields[fields.length - 1].id}>
            <Controller
              control={control}
              name={`family.${fields.length - 1}.name`}
              render={({ field }) => (
                <TextInput {...field} label='Nombre: ' isRequired />
              )}
            />
            <Controller
              control={control}
              name={`family.${fields.length - 1}.lastName`}
              render={({ field }) => (
                <TextInput {...field} label='Apellido: ' isRequired />
              )}
            />
            <Controller
              control={control}
              name={`family.${fields.length - 1}.ci`}
              render={({ field }) => (
                <TextInput {...field} label='CI: ' isRequired />
              )}
            />
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              handleClose();
              console.log(fields.length);
              remove(fields.length - 1);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              handleClose();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddFamilyMemberModal;
