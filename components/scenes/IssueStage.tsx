"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Episode, Status } from "@/lib/schema";
import { StatusLabel } from "@/components/status/StatusLabel";
import { proteinPlates, sugarPlates, type Plates } from "./Goods";
import styles from "./IssueStage.module.css";

type Props = { sugar: Episode; protein: Episode };

const noop = () => () => {};

// Final offset of the ink plate against the mark plate, by status. Mirrors tokens.css.
const REG: Record<Status, [number, number]> = { confirmed: [0, 0], reported: [2, -1], unknown: [6, -4] };

/**
 * The signature scene. Scroll moves each good's ink plates towards register:
 * a confirmed fact lands exactly; a reported one stops a step short.
 */
export function IssueStage({ sugar, protein }: Props) {
  const reduce = useReducedMotion();
  // false on the server and during hydration, true after: the static stack is the no-JS fallback
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const animated = mounted && !reduce;
  return animated ? <Pinned sugar={sugar} protein={protein} /> : <Static sugar={sugar} protein={protein} />;
}

function Steps({ sugar, protein }: Props) {
  return [
    <div key="1" className={styles.step}>
      <p className={styles.day}>Day {sugar.day}</p>
      <p className={styles.line}>The Service promises sugar, every day, from now on.</p>
      <StatusLabel status={sugar.issued.status} />
    </div>,
    <div key="2" className={styles.step}>
      <p className={styles.day}>Day {protein.day}</p>
      <p className={styles.line}>The Service brings whey protein instead.</p>
      <StatusLabel status={protein.issued.status} />
    </div>,
    <div key="3" className={styles.step}>
      <p className={styles.day}>Since then</p>
      <p className={styles.line}>
        Ant colonies do different things with sugar and with protein. That difference is now part of the experiment,
        planned or not.
      </p>
      <p className={styles.note}>Each good prints in register once someone checks the reel.</p>
    </div>,
  ];
}

function Static(props: Props) {
  const steps = Steps(props);
  return (
    <section className={styles.static} aria-labelledby="issue-title">
      <div className={`wrap ${styles.staticGrid}`}>
        <h2 id="issue-title" className={styles.title}>
          The issue
        </h2>
        <div className={styles.goodsRow}>
          <Good plates={sugarPlates(props.sugar)} status={props.sugar.issued.status} label="Sugar ration packet, Day 1" />
          <Good plates={proteinPlates(props.protein)} status={props.protein.issued.status} label="Whey protein tin, Day 3" />
        </div>
        <div className={styles.staticSteps}>{steps}</div>
      </div>
    </section>
  );
}

function Pinned(props: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const steps = Steps(props);
  // Each line leaves before the next arrives: no two sentences on screen at once.
  const o1 = useTransform(p, [0, 0.34, 0.38], [1, 1, 0]);
  const o2 = useTransform(p, [0.4, 0.44, 0.7, 0.74], [0, 1, 1, 0]);
  const o3 = useTransform(p, [0.76, 0.8, 1], [0, 1, 1]);
  const y1 = useTransform(p, [0.34, 0.38], [0, -12]);
  const y2 = useTransform(p, [0.4, 0.44, 0.7, 0.74], [12, 0, 0, -12]);
  const y3 = useTransform(p, [0.76, 0.8], [12, 0]);
  const tinPresence = useTransform(p, [0.34, 0.46], [0.22, 1]);
  const meter = useTransform(p, [0, 1], [0, 1]);
  return (
    <section ref={ref} className={styles.pinned} aria-labelledby="issue-title">
      <div className={styles.sticky}>
        <div className={`wrap ${styles.stage}`}>
          <h2 id="issue-title" className={styles.title}>
            The issue
          </h2>
          <div className={styles.goodsRow}>
            <MovingGood
              plates={sugarPlates(props.sugar)}
              status={props.sugar.issued.status}
              p={p}
              range={[0.04, 0.32]}
              label="Sugar ration packet, Day 1"
            />
            <MovingGood
              plates={proteinPlates(props.protein)}
              status={props.protein.issued.status}
              p={p}
              range={[0.44, 0.7]}
              presence={tinPresence}
              label="Whey protein tin, Day 3"
            />
          </div>
          <div className={styles.steps}>
            <motion.div style={{ opacity: o1, y: y1 }}>{steps[0]}</motion.div>
            <motion.div style={{ opacity: o2, y: y2 }}>{steps[1]}</motion.div>
            <motion.div style={{ opacity: o3, y: y3 }}>{steps[2]}</motion.div>
          </div>
          <div className={styles.meter} aria-hidden="true">
            <motion.span style={{ scaleY: meter }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Good({ plates, status, label }: { plates: Plates; status: Status; label: string }) {
  const [x, y] = REG[status];
  return (
    <div className={styles.good} data-status={status} role="img" aria-label={label}>
      <div className={styles.layer}>{plates.stock}</div>
      <div className={`${styles.layer} ${styles.mark}`}>{plates.mark}</div>
      <div className={`${styles.layer} ${styles.ink}`} style={{ transform: `translate(${x}px, ${y}px)` }}>
        {plates.ink}
      </div>
    </div>
  );
}

function MovingGood({
  plates,
  status,
  p,
  range,
  presence,
  label,
}: {
  plates: Plates;
  status: Status;
  p: MotionValue<number>;
  range: [number, number];
  presence?: MotionValue<number>;
  label: string;
}) {
  const [fx, fy] = REG[status];
  const ix = useTransform(p, range, [-22, fx]);
  const iy = useTransform(p, range, [14, fy]);
  const mx = useTransform(p, range, [16, 0]);
  const my = useTransform(p, range, [-10, 0]);
  return (
    <motion.div className={styles.good} data-status={status} role="img" aria-label={label} style={{ opacity: presence }}>
      <div className={styles.layer}>{plates.stock}</div>
      <motion.div className={`${styles.layer} ${styles.mark}`} style={{ x: mx, y: my }}>
        {plates.mark}
      </motion.div>
      <motion.div className={`${styles.layer} ${styles.ink}`} style={{ x: ix, y: iy }}>
        {plates.ink}
      </motion.div>
    </motion.div>
  );
}
