import { episodes } from "@/lib/episodes";
import { Descent } from "@/components/film/Descent";
import { Colony } from "@/components/film/Colony";
import { DaysReel } from "@/components/film/DaysReel";
import { Underground } from "@/components/film/Underground";
import { Log } from "@/components/film/Log";
import { Questions } from "@/components/film/Questions";
import { NextDay } from "@/components/film/NextDay";

/** The documentary: descend to the food, meet the colony, run the days, go underground, read the log, wait. */
export default function Home() {
  return (
    <>
      <Descent episodes={episodes} />
      <Colony episodes={episodes} />
      <DaysReel episodes={episodes} />
      <Underground />
      <Log episodes={episodes} />
      <Questions />
      <NextDay episodes={episodes} />
    </>
  );
}
