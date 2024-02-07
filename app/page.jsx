"use client"
import { useState } from "react";
import Header from "@/components/Header";

export default function home() {
  const [preGame, setPreGame] = useState(true);
  const [inGame, setInGame] = useState(false);
  const [postGame, setPostGame] = useState(false);

  function fullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    var docElm = document.documentElement;
    if (!isInFullScreen) {
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
  // start game
  function handlePreGame() {
    if (preGame || !inGame || !postGame) {
      setPreGame(false);
      setInGame(true);
      setPostGame(false);
      fullscreen();
      setTimeout(() => {
        detectMouseMovement();
        detectKeyboardPressed();
      }, 50);
    }
  }
  // game over
  function handleInGame() {
    if (!preGame || inGame || !postGame) {
      setPreGame(false);
      setInGame(false);
      setPostGame(true);
      document.removeEventListener('mousemove', handleInGame, false);
      document.removeEventListener('keypress', handleInGame, false)
    }
  }
  // to restart agme
  function handlePostGame() {
    setPreGame(true);
    setInGame(false);
    setPostGame(false);
    fullscreen();
  }

  function detectMouseMovement() {
    document.addEventListener('mousemove', handleInGame, false);
  }

  function detectKeyboardPressed() {
    document.addEventListener('keypress', handleInGame, false);
  }
  return (
    <>
    {/* start page */}
      <div className={preGame ? "block animate-fade-down animate-once" : "hidden"}>
        <Header></Header>
        <div className="text-center mt-40">
          <h1 className="text-8xl font-semibold">'Do Nothing'</h1>
          <h2 className="text-5xl">Game</h2>
        </div>
        <div className="flex justify-center mt-10">
          <ol>
            <li>1. Do not move your mouse!</li>
            <li>2. Do not press any key!</li>
            <li>3. Just relax and do nothing</li>
          </ol>
        </div>
        <div className="flex justify-center mt-10">
          <button className="p-2 px-10 rounded-3xl border hover:bg-slate-300" onClick={handlePreGame}>Start</button>
        </div>
      </div>

      {/* in-game page */} 
      <div className={inGame ? "block" : "hidden"}>
        <div className="text-center mt-60">
          You have done nothing for the past <br /><span className="text-5xl font-semibold">1 hours 30 seconds</span>
        </div>
      </div>

      {/* post-game page */} 
      <div className={postGame ? "block" : "hidden"}>
        <div className="text-center mt-60">
          <h1 className="text-5xl font-semibold">GAME OVER</h1>
          <h2 className="mt-10">You <span className="font-semibold">DID</span> something just now. You lasted for <br></br><span className="text-2xl font-semibold">1 hour 30 minutes</span></h2>
        </div>
        <div className="flex justify-center mt-5">
          <button className="p-2 px-10 rounded-3xl border hover:bg-slate-300" onClick={handlePostGame}>Try again</button></div>
      </div>
    </>
  )
}