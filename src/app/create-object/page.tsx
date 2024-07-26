import React, { useEffect } from 'react';
import ObjectForm from '@/components/form/ObjectForm';

const CreatePage = () => {
  return (
    <main className='flex min-h-screen flex-col justify-between p-4 md:p-8 lg:p-16 xl:p-24 max-w-5xl mx-auto'>
      <ObjectForm />
    </main>
  );
};

export default CreatePage;
