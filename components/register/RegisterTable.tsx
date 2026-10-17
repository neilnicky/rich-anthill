import Link from "next/link";
import type { Episode } from "@/lib/schema";
import { dayCode, formatDate, issuedLabel } from "@/lib/episodes";
import { FoodMark } from "@/components/marks/Marks";
import { StatusLabel } from "@/components/status/StatusLabel";
import styles from "./RegisterTable.module.css";

/** One row per day: what went in, what the reel showed, how sure anyone is. */
export function RegisterTable({ episodes, caption }: { episodes: Episode[]; caption: string }) {
  return (
    <div className={styles.scroller}>
      <table className={styles.table}>
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Posted</th>
            <th scope="col">Issued</th>
            <th scope="col">Observed in the reel</th>
            <th scope="col">Reel</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((ep) => (
            <tr key={ep.day} data-status={ep.issued.status}>
              <th scope="row">
                <Link href={`/days/${ep.day}`} className={styles.day}>
                  {dayCode(ep.day)}
                  <span className="visually-hidden">: Day {ep.day}</span>
                </Link>
              </th>
              <td className={styles.date}>
                <StatusLabel status="confirmed">{formatDate(ep.date)}</StatusLabel>
              </td>
              <td>
                <span className={styles.issued}>
                  <FoodMark episode={ep} size={20} className={styles.mark} />
                  {issuedLabel(ep)}
                </span>
                <StatusLabel status={ep.issued.status} />
              </td>
              <td>
                {ep.observations.length ? (
                  <ul className={styles.obs}>
                    {ep.observations.map((o, i) => (
                      <li key={i}>
                        {o.value} <StatusLabel status={o.status} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className={styles.empty}>Not yet recorded</span>
                )}
              </td>
              <td>
                <a href={ep.reel.url} target="_blank" rel="noopener noreferrer" className={styles.reel}>
                  Instagram<span aria-hidden="true"> ↗</span>
                  <span className="visually-hidden"> (Day {ep.day}, opens in a new tab)</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
