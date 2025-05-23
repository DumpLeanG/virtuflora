'use client';

import { useAppDispatch } from '@/lib/hooks';
import { useEffect } from 'react';
import  { type Breakpoint, setBreakpoint } from '@/lib/features/screen/screenSlice';

const getBreakpoint = (width: number): Breakpoint => {
    if (width >= 1536) return '2xl';
    if (width >= 1280) return 'xl';
    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    return 'sm';
};

export const ScreenTracker = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      const breakpoint = getBreakpoint(window.innerWidth);
      dispatch(setBreakpoint(breakpoint));
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return null;
};