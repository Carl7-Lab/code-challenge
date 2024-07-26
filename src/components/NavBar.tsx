'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav className='w-full pt-[20px] pl-[60px] pr-[60px] flex justify-between'>
      <Link href={'/'} className=''>
        <Image src={'next.svg'} alt={'Logo'} width={200} height={50} priority />
      </Link>
      <Link
        href={'/create-object'}
        // className=''
        className={`inline-flex items-center px-4 py-2 font-medium text-center text-white bg-slate-700 hover:bg-slate-900 rounded-lg ${pathname === '/create-object' ? 'hidden' : ''}`}
      >
        Crear Objeto
      </Link>
    </nav>
  );
};

export default NavBar;
