import React from 'react';
import FamilyInput from './FamilyInput';
import { Button } from '../ui/button';
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from '../ui/responsive-modal';

interface props {
  name: string;
  label: string;
  description: string;
}

const FamilyModal = ({ name, label, description }: props) => {
  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button type='button'>Agregar Miembro Familiar</Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>{label}</ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <FamilyInput name={name} label={label} description={description} />
        <ResponsiveModalFooter>
          <ResponsiveModalClose asChild>
            <Button variant='secondary'>Cerrar</Button>
          </ResponsiveModalClose>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default FamilyModal;
