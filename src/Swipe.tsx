import React, { useRef, useState } from 'react';

interface SwipeProps {
  style: Record<string, string>;
  colorList: Array<string>;
}

export default function Swipe({ style, colorList }: SwipeProps) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [colorIndex, setColorIndex] = useState<number>(0); // 현재 색깔 인덱스
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      setIsDragging(true);
      setStartX(e.pageX);
      cardRef.current.style.cursor = 'grabbing';
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && cardRef.current) {
      const x = e.pageX - startX;
      const opacity = 1 - Math.min(1, Math.abs(x) / cardRef.current.offsetWidth); // Adjust opacity calculation
      cardRef.current.style.transform = `translateX(${x}px)`;
      cardRef.current.style.opacity = `${opacity}`;
    }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && cardRef.current) {
      const currentX = e.pageX - startX;
      const threshold = cardRef.current.offsetWidth * 0.5;
      if (Math.abs(currentX) > threshold) {
        updateColor();
      }
      resetDragState();
    }
  };

  const resetDragState = () => {
    if (cardRef.current) {
      setIsDragging(false);
      cardRef.current.style.cursor = 'grab';
      cardRef.current.style.transform = '';
      cardRef.current.style.opacity = '1'; // Reset opacity when drag ends
    }
  };

  const updateColor = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colorList.length); // 다음 색깔로 업데이트
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '300px',
        height: '300px',
        overflow: 'visible',
      }}
    >
      <div
        style={{
          width: '300px',
          height: '300px',
          backgroundColor: colorList[(colorIndex + 1) % colorList.length],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {colorList[(colorIndex + 1) % colorList.length]}
      </div>
      <div
        ref={cardRef}
        onMouseDown={onMouseDown}
        onMouseMove={isDragging ? onMouseMove : undefined}
        onMouseUp={onMouseUp}
        onMouseLeave={resetDragState}
        style={{
          width: '300px',
          height: '300px',
          backgroundColor: colorList[colorIndex],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          cursor: 'grab',
          userSelect: 'none',
          zIndex: 2,
        }}
      >
        {colorList[colorIndex]}
      </div>
    </div>
  );
}
