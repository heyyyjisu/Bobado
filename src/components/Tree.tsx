"use client";

import { Todo } from "@/types/todo";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Fruit = {
  incompleteTodos: Todo[];
};

export default function Tree({ incompleteTodos }: Fruit) {
  const [fruitPositions, setFruitPositions] = useState<
    { x: number; y: number }[]
  >([]);

  const categoryImages = {
    important: "/images/important.webp",
    canwait: "/images/canwait.webp",
    deadline: "/images/deadline.webp",
    habit: "/images/habit.webp",
    uncategorized: "/images/uncategorized.webp",
  };

  const categoryAlts = {
    important: "apple",
    canwait: "grape",
    deadline: "orange",
    habit: "lemon",
    uncategorized: "peach",
  };

  const treeRef = useRef<HTMLImageElement>(null);

  function seedFromId(id: string): number {
    return id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }

  function generatePosition(treeWidth: number, treeHeight: number, id: string) {
    const fruitSize = 32;
    const seed1 = (seedFromId(id) % 100) / 100;
    const seed2 = (seedFromId(id.split("").reverse().join("")) % 100) / 100;
    const x = treeWidth * 0.15 + seed1 * (treeWidth * 0.7 - fruitSize);
    const y = treeHeight * 0.05 + seed2 * (treeHeight * 0.6 - fruitSize);
    return { x, y };
  }

  const handleTreeLoad = useCallback(() => {
    if (!treeRef.current) return;
    const treeWidth = treeRef.current.width;
    const treeHeight = treeRef.current.height;

    const positions: { x: number; y: number }[] = [];

    incompleteTodos.forEach((todo) => {
      const pos = generatePosition(treeWidth, treeHeight, todo._id);
      positions.push(pos);
    });

    setFruitPositions(positions);
  }, [incompleteTodos]);

  useEffect(() => {
    if (treeRef.current?.complete) {
      handleTreeLoad();
    }
  }, [incompleteTodos]);

  return (
    <div>
      <div className="relative">
        <Image
          ref={treeRef}
          src="/images/tree.webp"
          alt="tree drawing"
          width={256}
          height={334}
          loading="eager"
          priority
          onLoad={handleTreeLoad}
          className="w-64 drop-shadow-md"
          style={{ filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.2))" }}
        />
        {fruitPositions.slice(0, incompleteTodos.length).map((pos, index) => (
          <Image
            key={incompleteTodos[index]._id}
            src={categoryImages[incompleteTodos[index].category]}
            alt={categoryAlts[incompleteTodos[index].category]}
            width={32}
            height={32}
            className="absolute w-8 h-8 fruit-sway drop-shadow-md"
            style={{
              left: pos.x,
              top: pos.y,
              animationDelay: `${index * 0.3}s`,
              filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
            }}
          />
        ))}
      </div>
    </div>
  );
}
