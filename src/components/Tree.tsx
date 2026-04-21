"use client";

import { Todo } from "@/types/todo";
import Image from "next/image";

type Fruit = {
  incompleteTodos: Todo[];
};

export default function Tree({ incompleteTodos }: Fruit) {
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

  const FRUIT_SPOTS = [
    { top: "20%", left: "22%" },
    { top: "35%", left: "55%" },
    { top: "47%", left: "15%" },
    { top: "52%", left: "75%" },
    { top: "13%", left: "60%" },
    { top: "28%", left: "80%" },
    { top: "57%", left: "50%" },
    { top: "45%", left: "37%" },
    { top: "5%", left: "42%" },
    { top: "28%", left: "37%" },
  ];

  return (
    <div>
      <div className="relative">
        <Image
          src="/images/tree.webp"
          alt="tree drawing"
          width={256}
          height={334}
          className="w-64 drop-shadow-md"
          style={{ filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.2))" }}
        />
        {FRUIT_SPOTS.slice(0, incompleteTodos.length).map((pos, index) => (
          <Image
            key={incompleteTodos[index]._id}
            src={categoryImages[incompleteTodos[index].category]}
            alt={categoryAlts[incompleteTodos[index].category]}
            width={32}
            height={32}
            className="absolute w-8 h-8 fruit-sway drop-shadow-md"
            style={{
              left: pos.left,
              top: pos.top,
              animationDelay: `${index * 0.3}s`,
              filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
            }}
          />
        ))}
      </div>
    </div>
  );
}
