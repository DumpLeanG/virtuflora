'use client';

import { useAppDispatch } from '@/lib/hooks/hooks';
import { useEffect } from 'react';
import  { setWidthBreakpoint, setHeightBreakpoint } from '@/lib/features/screen/screenSlice';
import type { WidthBreakpoint, HeightBreakpoint } from '@/lib/features/screen/screenSlice';

const getWidthBreakpoint = (width: number): WidthBreakpoint => {
  if (width >= 1536) return '2xl';
  if (width >= 1280) return 'xl';
  if (width >= 1024) return 'lg';
  if (width >= 768) return 'md';
  if (width >= 640) return 'sm';
  return 'xs';
};

const getHeightBreakpoint = (height: number): HeightBreakpoint => {
  if (height <= 900) return 'h-sm';
  return 'h-lg';
};

export const ScreenTracker = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      dispatch(setWidthBreakpoint(getWidthBreakpoint(width)));
      dispatch(setHeightBreakpoint(getHeightBreakpoint(height)));
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return null;
};