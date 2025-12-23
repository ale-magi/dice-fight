interface DiceProps {
  className?: string;
  dotColor?: string;
}

export const DiceOne = ({ className, dotColor = "#000" }: DiceProps) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="12" fill={dotColor} />
  </svg>
);

export const DiceTwo = ({ className, dotColor = "#000" }: DiceProps) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="12" fill={dotColor} />
    <circle cx="75" cy="75" r="12" fill={dotColor} />
  </svg>
);

export const DiceThree = ({ className, dotColor = "#000" }: DiceProps) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="12" fill={dotColor} />
    <circle cx="50" cy="50" r="12" fill={dotColor} />
    <circle cx="75" cy="75" r="12" fill={dotColor} />
  </svg>
);

export const DiceFour = ({ className, dotColor = "#000" }: DiceProps) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="12" fill={dotColor} />
    <circle cx="75" cy="25" r="12" fill={dotColor} />
    <circle cx="25" cy="75" r="12" fill={dotColor} />
    <circle cx="75" cy="75" r="12" fill={dotColor} />
  </svg>
);

export const DiceFive = ({ className, dotColor = "#000" }: DiceProps) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="25" r="12" fill={dotColor} />
    <circle cx="75" cy="25" r="12" fill={dotColor} />
    <circle cx="50" cy="50" r="12" fill={dotColor} />
    <circle cx="25" cy="75" r="12" fill={dotColor} />
    <circle cx="75" cy="75" r="12" fill={dotColor} />
  </svg>
);

export const DiceSix = ({ className, dotColor = "#000" }: DiceProps) => (
  <svg className={className} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="25" cy="20" r="12" fill={dotColor} />
    <circle cx="25" cy="50" r="12" fill={dotColor} />
    <circle cx="25" cy="80" r="12" fill={dotColor} />
    <circle cx="75" cy="20" r="12" fill={dotColor} />
    <circle cx="75" cy="50" r="12" fill={dotColor} />
    <circle cx="75" cy="80" r="12" fill={dotColor} />
  </svg>
);


const DiceMap = {
  1: DiceOne,
  2: DiceTwo,
  3: DiceThree,
  4: DiceFour,
  5: DiceFive,
  6: DiceSix,
} as const;

export function DynamicDice({ value }: { value: number | undefined }) {
  if (!value) return null

  const DiceComponent = DiceMap[value as keyof typeof DiceMap];
  return <DiceComponent className="lg:size-[500px] size-[350px]" dotColor="#1a1a1a" />;
}