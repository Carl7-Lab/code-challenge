import React from 'react';
import ObjectTable, { ObjectData } from './table/ObjectTable';
import { Button } from './ui/button';
import {
  ResponsiveModal,
  ResponsiveModalClose,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from './ui/responsive-modal';

interface props {
  object: ObjectData;
}

const ObjectDetailModal = ({ object }: props) => {
  return (
    <ResponsiveModal>
      <ResponsiveModalTrigger asChild>
        <Button type='button'>Ver detalles</Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent className='max-w-5xl'>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Detalles</ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <ObjectTable object={object} />
        <ResponsiveModalFooter>
          <ResponsiveModalClose asChild>
            <Button>Cerrar</Button>
          </ResponsiveModalClose>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default ObjectDetailModal;
