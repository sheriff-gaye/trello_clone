"use client"

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useMobileSideBar } from '@/hooks/use-mobile-sidebar'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Sidebar } from './SideBar'

const MobileSideBar = () => {

    const onOpen=useMobileSideBar((state)=>state.onOpen);
    const onClose=useMobileSideBar((state)=>state.onClose);
    const isOpen=useMobileSideBar((state)=>state.isOpen);


    const pathname=usePathname();


    const [mounted , isMounted]=useState(false);

    useEffect(()=>{

        isMounted(true);

    },[])


    useEffect(()=>{
        onClose();

    },[pathname,onClose])

    if(!mounted){
        return null
    }
  return (
   <>

   <Button className='block md:hidden mr-2'  variant="ghost" size="sm" onClick={onOpen}>
    <Menu className='h-4 w-4'/>
   </Button>
   <Sheet open={isOpen} onOpenChange={onClose}>
    <SheetContent side="left" className='p-2 pt-10'>
        <Sidebar storageKey='t-sidebar-state'/>
    </SheetContent>
   </Sheet>
   </>
  )
}

export default MobileSideBar