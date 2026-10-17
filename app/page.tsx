import { episodes } from "@/lib/episodes";
import { Opening } from "@/components/scenes/Opening";
import { Customer } from "@/components/scenes/Customer";
import { IssueStage } from "@/components/scenes/IssueStage";
import { AfterTheDrop } from "@/components/scenes/AfterTheDrop";
import { Evidence } from "@/components/scenes/Evidence";
import { OpenQuestions } from "@/components/scenes/OpenQuestions";
import { NextIssue } from "@/components/scenes/NextIssue";

export default function Home() {
  const sugar = episodes.find((e) => e.issued.value?.food === "sugar");
  const protein = episodes.find((e) => e.issued.value?.food === "protein");
  return (
    <>
      <Opening episodes={episodes} />
      <Customer episodes={episodes} />
      {sugar && protein ? <IssueStage sugar={sugar} protein={protein} /> : null}
      <AfterTheDrop />
      <Evidence episodes={episodes} />
      <OpenQuestions />
      <NextIssue episodes={episodes} />
    </>
  );
}
