import React, { useState, useCallback } from "react";

const useDragDrop = () => {
  const [dropPosition, setDropPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleDragStart = useCallback((event: React.DragEvent) => {
    setDragging(true);
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    setDragOffset({ x: offsetX, y: offsetY });
    event.dataTransfer.setData("text/plain", "dragged-item");
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const x = event.clientX - dragOffset.x;
      const y = event.clientY - dragOffset.y;
      setDropPosition({ x, y });
      setDragging(false);
    },
    [dragOffset]
  );

  const handleDragEnd = useCallback(() => {
    setDragging(false);
  }, []);

  return {
    dropPosition,
    dragging,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
};

export default useDragDrop;
