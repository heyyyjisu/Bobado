export default function DecorativeTree() {
  const fruits = [
    { src: "/images/important.png", top: "20%", left: "25%" },
    { src: "/images/habit.png", top: "30%", left: "50%" },
    { src: "/images/canwait.png", top: "47%", left: "15%" },
    { src: "/images/deadline.png", top: "42%", left: "75%" },
    { src: "/images/uncategorized.png", top: "10%", left: "60%" },
  ];

  return (
    <div className="relative w-48 mx-auto mb-6">
      <img
        src="/images/tree.png"
        className="w-full drop-shadow-md"
        style={{ filter: "drop-shadow(4px 4px 6px rgba(0,0,0,0.2))" }}
      />
      {fruits.map((fruit, index) => (
        <img
          key={index}
          src={fruit.src}
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
