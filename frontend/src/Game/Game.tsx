import React, { useEffect, useRef } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH, GRAVITY } from "./Constants";
import { Player } from "./Player";
import { Ground } from "./Ground";
import { Camera } from "./Camera";
import { DarkSky } from "./DarkSky";
import { LightSky } from "./LightSky";
import { CloudySky } from "./CloudySky";
import "./Game.css";
import { Tree } from "./Tree";
import { Slash } from "./Slash";

import highPalm from "../assets/scenery/trees/high-palm.png";
import mediumPalm from "../assets/scenery/trees/medium-palm.png";
import largeTree from "../assets/scenery/trees/large-tree.png";

import { Cube } from "./Cube";
import { Cloud } from "./Cloud";
import { Props } from "./Props";

const Game: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys: React.RefObject<Record<string, boolean>> = useRef<
    Record<string, boolean>
  >({});

  /*
   * All game assets are declared here
   */
  const player = useRef(Player.getInstance(GRAVITY));

  const camera = useRef(Camera.getInstance());

  const darkSky = useRef(new DarkSky(CANVAS_WIDTH, CANVAS_HEIGHT));
  const lightSky = useRef(new LightSky(CANVAS_WIDTH, CANVAS_HEIGHT));
  const cloudySky = useRef(new CloudySky(CANVAS_WIDTH, CANVAS_HEIGHT));

  const ground = useRef(new Ground(CANVAS_WIDTH, CANVAS_HEIGHT));

  const tree1 = useRef(new Tree(CANVAS_WIDTH, CANVAS_HEIGHT, mediumPalm));
  const tree2 = useRef(new Tree(CANVAS_WIDTH, CANVAS_HEIGHT, highPalm, 200));
  const tree3 = useRef(new Tree(CANVAS_WIDTH, CANVAS_HEIGHT, largeTree, 400));

  const cube = useRef(new Cube(CANVAS_WIDTH, CANVAS_HEIGHT, 300));

  const slash = useRef(new Slash(CANVAS_WIDTH, CANVAS_HEIGHT));

  const cloud = useRef(new Cloud(CANVAS_WIDTH, CANVAS_HEIGHT));
  const props = useRef(new Props([100, 250, 500]));

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
      console.log("pressed", e.key);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const gameLoop = () => {
      player.current.handleUserInput(keys);

      camera.current.follow(player.current);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (tree1.current.inRangeOf(player.current.pos))
        tree1.current.handleUserInput(keys);
      else if (tree2.current.inRangeOf(player.current.pos))
        tree2.current.handleUserInput(keys);
      slash.current.handleUserInput(keys);
      props.current.handleUserInput(keys);

      if (cube.current.inRangeOf(player.current.pos)) {
        // play sound
      }

      darkSky.current.render(ctx);
      lightSky.current.render(ctx);
      cloudySky.current.render(ctx);
      cloud.current.render(ctx);
      tree1.current.render(ctx);
      tree2.current.render(ctx);
      tree3.current.render(ctx);
      ground.current.render(ctx);
      cloudySky.current.render(ctx);
      player.current.render(ctx);
      slash.current.assignPos(player.current.pos);
      slash.current.render(ctx);
      cube.current.render(ctx);
      props.current.render(ctx);

      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ border: "1px solid black" }}
      />
      <button onClick={() => props.current.randomize()}>
        Générer des objets au sol
      </button>
    </div>
  );
};

export default Game;
