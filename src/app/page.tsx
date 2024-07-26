'use client';
import { useEffect, useState } from 'react';
import ObjectCard from '@/components/ObjectCard';
import { ObjectData } from '@/components/table/ObjectTable';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getObjects = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_URI!, {
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
    getObjects();
  }, []);

  if (loading)
    return (
      <main className='flex min-h-screen flex-col justify-between p-4 md:p-8 lg:p-16 xl:p-24 max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className='space-y-2 h-[300px] w-full bg-white rounded-xl shadow-md'
              >
                <div className='p-[24px] space-y-1'>
                  <Skeleton className='h-[40px] w-[300px] rounded-xl' />
                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-[130px]' />
                    <Skeleton className='h-4 w-[250px]' />
                    <Skeleton className='h-4 w-[160px]' />
                  </div>
                </div>
                <div className='space-y-1 px-[24px] pb-[24px]'>
                  <Skeleton className='h-4 w-[250px]' />
                  <Skeleton className='h-4 w-[130px]' />
                  <Skeleton className='h-4 w-[200px]' />
                </div>
                <div className='flex justify-between px-[24px] pb-[24px]'>
                  <Skeleton className='w-[85px] h-[40px]' />
                  <div className='flex gap-2'>
                    <Skeleton className='w-[72px] h-[40px]' />
                    <Skeleton className='w-[112px] h-[40px]' />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <main className='flex min-h-screen flex-col justify-between p-4 md:p-8 lg:p-16 xl:p-24 max-w-6xl mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {data?.map((item: ObjectData) => (
          <ObjectCard key={item._id} object={item} />
        ))}
      </div>
    </main>
  );
}
