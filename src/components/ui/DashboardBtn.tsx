'use client'

import React from 'react'
import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserRole } from '@/hooks/useUserRole';

const DashboardBtn = () => {
    
    const {isCandidate, isLoading} = useUserRole();
    if(isCandidate || isLoading) return null;

  return (
    <Link href={"/dashboard"}>
      <Button className="gap-2 font-medium" size={"sm"}>
        <LayoutDashboard className="size-4" />
        Dashboard
      </Button>
    </Link>
  );
}

export default DashboardBtn
