interface TotalProps {
  paperSize: {x: number, y: number};
  printColor: number;
  quantity: number;
}


export const Total = ({ paperSize, printColor, quantity }: TotalProps) => {
  const total = paperSize.x * paperSize.y * 0.35 * quantity * 7 * (printColor === 2 ? 1.3 : printColor === 4 ? 1.8 : 1) / 10000
  return <div>Your Total: €{total.toFixed(2)}</div>;
};