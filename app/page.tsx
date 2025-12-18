'use client';

import * as React from 'react';
import { DICE_FACES } from '@/utils/constants';
import { Game, type DiceFace } from '@/utils/types';
import { PlayerSide } from '@/components/game/player';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

const SHUFFLES = 5;
const WINNING_SCORE = 15;
const PLAYERS = ["p1", "p2"];

export default function Home() {
  const [game, setGame] = React.useState<Game>({
    start: false,
    winner: undefined,
    active: PLAYERS[0],
    p1: 0,
    p2: 0
  })

  const [dice, setDice] = React.useState<DiceFace | undefined>();
  const [isRolling, setIsRolling] = React.useState(false);

  function rollDice() {
    setIsRolling(true);
    return new Promise<void>(r => {
      let lastExtract = -1;
      for (let i = 0; i < SHUFFLES; i++) {
        let extract;
        do {
          extract = Math.floor(Math.random() * DICE_FACES.length);
        } while (extract === lastExtract);
        
        lastExtract = extract;
        
        setTimeout(
          () => {
            setDice(DICE_FACES[extract]);
            if (i === SHUFFLES - 1) {
              setIsRolling(false);
              r();
            }
          },
          (i + 1) * 250
        );
      }
    });
  }

  function onGameStart() {
    setGame({
      ...game,
      winner: undefined,
      p1: 0,
      p2: 0,
      start: true
    })
    setTimeout(() => rollDice(), 200)
  }

  async function playTurn(recipient: "p1" | "p2") {
    const value = game.active === recipient ? dice!.value : -dice!.value
    const newScore = game[recipient] += value
    const winner = newScore === WINNING_SCORE ? recipient : undefined
    setGame({
      ...game,
      [recipient]: newScore,
      winner
    })

    if (winner) return

    await rollDice()
    nextTurn()
  }

  function nextTurn() {
    const currentIndex = PLAYERS.indexOf(game.active);
    setGame({
      ...game,
      active: PLAYERS[(currentIndex + 1) % PLAYERS.length]
    })
  }

  return (
    <>
      <div
        className={`${dice?.color} min-h-dvh flex flex-col items-center justify-center relative`}
      >
        <div className="flex row-span-3 items-center col-span-2 justify-center lg:text-[500px] text-[350px]">
          {dice?.value}
        </div>

        {game.start ? 
          <>
            <PlayerSide 
              disabled={isRolling}
              active={game.active === "p1"}
              score={game.p1}
              onClick={() => playTurn("p1")}
              className='left-0'
            />
            <PlayerSide 
              disabled={isRolling}
              active={game.active === "p2"}
              score={game.p2}
              onClick={() => playTurn("p2")}
              className='right-0'
            />
          </>
          : 
          <div className='flex flex-col items-center gap-5 text-center'>
            <h1 className='md:text-8xl text-4xl  text-center'>Are you ready?</h1>
            <Button className="text-3xl italic h-20 w-32" onClick={() => onGameStart()}>
              YEAH!
            </Button>
            <p className='text-2xl'>
              First player to reach {WINNING_SCORE} wins.<br/>
              ez.
            </p>
          </div>
        }
      </div>

      <Dialog open={Boolean(game.winner)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='text-center'>And the winner is</DialogTitle>
          </DialogHeader>
          <DialogDescription className='flex flex-col items-center gap-2 text-6xl !text-black'>
            <span>
              {game.winner}
            </span>
            {WINNING_SCORE}!!!
          </DialogDescription>
          <Button className='bg-red-500 h-24' onClick={() => onGameStart()}>
            AGAIN
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
