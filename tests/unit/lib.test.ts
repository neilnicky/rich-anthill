import { afterEach, describe, expect, it, vi } from "vitest";
import { byDay, cellLabel, dayCode, formatDate, issuedLabel, latest, neighbours, sourceById } from "@/lib/episodes";
import { issueSentence, issuedLine } from "@/lib/copy";
import { readLastSeen, writeLastSeen } from "@/lib/lastSeen";
import { episodes } from "@/lib/episodes";

describe("episode helpers", () => {
  it("finds the latest day and neighbours", () => {
    expect(latest().day).toBe(3);
    expect(byDay(2)?.date).toBe("2026-10-15");
    expect(byDay(99)).toBeUndefined();
    expect(neighbours(1).prev).toBeUndefined();
    expect(neighbours(3).next).toBeUndefined();
  });

  it("formats codes and dates", () => {
    expect(dayCode(3)).toBe("№ 003");
    expect(dayCode(120)).toBe("№ 120");
    expect(formatDate("2026-10-16")).toBe("16 Oct 2026");
  });

  it("never guesses a label for an unknown day", () => {
    expect(issuedLabel(byDay(2)!)).toBe("Contents unconfirmed");
    expect(cellLabel(byDay(2)!)).toBe("Unconfirmed");
    expect(issuedLine(byDay(2)!)).toBe("Contents unconfirmed");
  });

  it("builds the opening copy from data only", () => {
    expect(issuedLine(latest())).toBe("Protein issued");
    expect(issueSentence(episodes)).toBe("Day 1 was sugar. Day 3 was protein.");
  });

  it("only resolves publishable sources", () => {
    expect(sourceById("S8")?.year).toBe(2012);
    expect(sourceById("S6")).toBeUndefined();
  });
});

describe("lastSeen storage", () => {
  afterEach(() => vi.restoreAllMocks());

  it("only moves forward", () => {
    writeLastSeen(2);
    writeLastSeen(1);
    expect(readLastSeen()).toBe(2);
    writeLastSeen(3);
    expect(readLastSeen()).toBe(3);
  });

  it("returns null and stays silent when storage throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(readLastSeen()).toBeNull();
    expect(() => writeLastSeen(3)).not.toThrow();
  });

  it("ignores junk values", () => {
    window.localStorage.setItem("rich-anthill:lastSeenDay", "banana");
    expect(readLastSeen()).toBeNull();
  });
});
