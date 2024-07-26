'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ObjectForm from '@/components/form/ObjectForm';
import { ObjectProps } from '@/interface/ObjectType';

const EditPage = () => {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const uri = process.env.NEXT_PUBLIC_URI!;

  const getObjectById = async ({ id }: { id: string }) => {
    try {
      const response = await fetch(`${uri}/${id}`, {
        cache: 'no-store',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData(jsonData.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getObjectById({ id: params.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className='flex min-h-screen flex-col justify-between p-4 md:p-8 lg:p-16 xl:p-24 max-w-5xl mx-auto'>
      <ObjectForm formValues={data as ObjectProps} id={params.id} />
    </main>
  );
};

export default EditPage;
