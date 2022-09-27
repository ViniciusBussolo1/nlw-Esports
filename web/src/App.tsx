import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { CreatedAdBanner } from "./components/CreatedAdBanner";
import { CreateAdModal } from "./components/CreateAdModal";
import { GameBanner } from "./components/GameBanner";

import axios from "axios";

import "./styles/main.css";
import logoImg from "./assets/logo-nlw-esports.svg";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 200px)": {
        slides: { perView: 2.2, spacing: 5 },
      },
      "(min-width: 400px)": {
        slides: { perView: 2.5, spacing: 5 },
      },
      "(min-width: 600px)": {
        slides: { perView: 3.5, spacing: 5 },
      },
      "(min-width: 800px)": {
        slides: { perView: 4.5, spacing: 5 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 5.5, spacing: 10 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 6.5, spacing: 10 },
      },
    },
    mode: "free",
    slides: { origin: "center", perView: 5.5, spacing: 10 },
  });

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto px-4 flex flex-col items-center my-20 sm:px-8 md:px-10 ">
      <img src={logoImg} alt="" />

      <h1 className="text-3xl text-white font-black mt-20 md:text-5xl lg:text-6xl">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text ">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div ref={sliderRef} className="mt-16 keen-slider">
        {games.map((game) => {
          return (
            <div key={game.id} className="keen-slider__slide">
              <GameBanner
                bannerUrl={game.bannerUrl}
                title={game.title}
                adsCount={game._count.ads}
              />
            </div>
          );
        })}
      </div>

      <Dialog.Root>
        <CreatedAdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}

export default App;
