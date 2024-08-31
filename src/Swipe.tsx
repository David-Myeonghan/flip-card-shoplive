import { useState } from 'react';

interface SwipeProps {
  style: Record<string, string>;
  colorList: Array<string>;
}

export default function Swipe({ style, colorList }: SwipeProps) {
  return <div style={style}>Swipe</div>;
}
