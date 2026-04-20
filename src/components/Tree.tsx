"use client";

import { Todo } from "@/types/todo";
import { useEffect, useRef, useState } from "react";

type Fruit = {
  incompleteTodos: Todo[];
};

export default function Tree({ incompleteTodos }: Fruit) {
  const [fruitPositions, setFruitPositions] = useState<
    { x: number; y: number }[]
  >([]);

  const categoryImages = {
    important: "/images/important.png",
    canwait: "/images/canwait.png",
    deadline: "/images/deadline.png",
    habit: "/images/habit.png",
    uncategorized: "/images/uncategorized.png",
  };

  const treeRef = useRef<HTMLImageElement>(null);

  function handleTreeLoad() {
    if (!treeRef.current) return;
    const treeWidth = treeRef.current.width;
    const treeHeight = treeRef.current.height;

    const positions: { x: number; y: number }[] = [];

    incompleteTodos.forEach(() => {
      const pos = generatePosition(positions, treeWidth, treeHeight);
      positions.push(pos);
    });

    setFruitPositions(positions);
  }

  function generatePosition(
    existing: { x: number; y: number }[],
    treeWidth: number,
    treeHeight: number,
  ) {
    const fruitSize = 32;
    let x: number, y: number;
    let attempts = 0;

    do {
      x = treeWidth * 0.15 + Math.random() * (treeWidth * 0.7 - fruitSize);
      y = treeHeight * 0.05 + Math.random() * (treeHeight * 0.6 - fruitSize);
      attempts++;
    } while (
      attempts < 50 &&
      existing.some(
        (pos) => Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2) < fruitSize,
      )
    );
    return { x, y };
  }

  useEffect(() => {
    if (treeRef.current?.complete) {
      handleTreeLoad();
    }
  }, [incompleteTodos.length]);

  return (
    <div>
      <div className="relative">
        <img
          ref={treeRef}
          src="/images/tree.png"
          onLoad={handleTreeLoad}
          className="w-64 drop-shadow-md"
          style={{ filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.2))" }}
        />
        {fruitPositions.slice(0, incompleteTodos.length).map((pos, index) => (
          <img
            key={incompleteTodos[index]._id}
            src={categoryImages[incompleteTodos[index].category]}
            className="absolute w-8 h-8"
            style={{ left: pos.x, top: pos.y }}
          />
        ))}
      </div>
    </div>
  );
}
