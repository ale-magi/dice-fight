
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function PlayerSide({
  score,
  onClick,
  active,
  disabled,
  className
}: {
  score: number;
  onClick: () => void;
  active: boolean
  disabled: boolean
  className?: string
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        className,
        "group bg-transparent h-dvh w-1/2 absolute rounded-none grid grid-rows-4 items-center justify-center text-5xl text-black",
        active && "bg-black/15",
      )}
    >
      <HelperSmile show={active} icon=":)"/>
      <HelperSmile show={!active} icon=":("/>

      <span className={cn("row-span-1", active && "animate-pulse")}>{score}</span>
    </Button>
  );
}

function HelperSmile({show, icon}: {show: boolean; icon: string}) {
  if (show) return <span className="opacity-0 row-span-4 transition-all duration-700 group-hover:opacity-100 text-7xl">{icon}</span>
}
