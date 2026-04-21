import Image from "next/image";

export default function DecorativeTree() {
  const fruits = [
    {
      src: "/images/important.webp",
      alt: "apple drawing",
      top: "20%",
      left: "25%",
    },
    {
      src: "/images/habit.webp",
      alt: "lemon drawing",
      top: "30%",
      left: "50%",
    },
    {
      src: "/images/canwait.webp",
      alt: "grape drawing",
      top: "47%",
      left: "15%",
    },
    {
      src: "/images/deadline.webp",
      alt: "orange drawing",
      top: "42%",
      left: "75%",
    },
    {
      src: "/images/uncategorized.webp",
      alt: "peach drawing",
      top: "10%",
      left: "60%",
    },
  ];

  return (
    <div className="relative w-64 mx-auto mb-6">
      <Image
        src="/images/tree.webp"
        alt="tree drawing"
        width={256}
        height={334}
        loading="eager"
        priority
        className="w-full drop-shadow-md"
        style={{ filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.2))" }}
      />
      {fruits.map((fruit, index) => (
        <Image
          key={index}
          src={fruit.src}
          alt={fruit.alt}
          width={32}
          height={32}
          className="fruit-sway absolute w-8 h-8 drop-shadow-md"
          style={{
            top: fruit.top,
            left: fruit.left,
            animationDelay: `${index * 0.3}s`,
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
          }}
        />
      ))}
    </div>
  );
}
