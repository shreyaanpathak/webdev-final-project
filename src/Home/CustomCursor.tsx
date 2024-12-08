import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      requestAnimationFrame(() => {
        if (dotRef.current && outlineRef.current) {
          dotRef.current.style.left = `${clientX}px`;
          dotRef.current.style.top = `${clientY}px`;
          outlineRef.current.style.left = `${clientX}px`;
          outlineRef.current.style.top = `${clientY}px`;
        }
      });
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  );
};

export default CustomCursor;
