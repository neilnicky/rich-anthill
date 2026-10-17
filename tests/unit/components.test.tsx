import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { episodes, byDay, sourceById } from "@/lib/episodes";
import { RegisterStrip } from "@/components/register/RegisterStrip";
import { StatusLabel } from "@/components/status/StatusLabel";
import { ReelCell } from "@/components/media/ReelCell";
import { CitationChip } from "@/components/citation/CitationChip";
import { HalftonePlate } from "@/components/media/HalftonePlate";
import { media } from "@/content/media";

vi.mock("next/navigation", () => ({ usePathname: () => "/", useRouter: () => ({ push: vi.fn() }) }));

describe("RegisterStrip", () => {
  it("marks the latest day as today and links every issued day", () => {
    render(<RegisterStrip episodes={episodes} variant="hero" upcoming={4} />);
    const links = screen.getAllByRole("link");
    expect(links.map((l) => l.getAttribute("href"))).toEqual(["/days/1", "/days/2", "/days/3"]);
    expect(links[2]).toHaveAttribute("aria-current", "date");
    expect(screen.getByText(/Not yet issued/)).toBeInTheDocument();
  });

  it("shows New only for days after the last visit", async () => {
    window.localStorage.setItem("rich-anthill:lastSeenDay", "2");
    render(<RegisterStrip episodes={episodes} variant="row" />);
    expect(await screen.findAllByText("New")).toHaveLength(1);
  });

  it("shows no New marker on a first visit", () => {
    render(<RegisterStrip episodes={episodes} variant="row" />);
    expect(screen.queryByText("New")).toBeNull();
  });
});

describe("StatusLabel", () => {
  it("always carries its status in words", () => {
    render(
      <>
        <StatusLabel status="confirmed" />
        <StatusLabel status="reported" />
        <StatusLabel status="unknown" />
        <StatusLabel status="science" />
      </>,
    );
    for (const t of ["Confirmed", "Reported, not yet confirmed", "Not yet known", "Published study"]) {
      expect(screen.getByText(t)).toBeInTheDocument();
    }
  });
});

describe("ReelCell", () => {
  it("loads nothing from Instagram until asked, then falls back after 8s", () => {
    vi.useFakeTimers();
    const { container } = render(<ReelCell episode={byDay(3)!} />);
    expect(container.querySelector("iframe")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Play Day 3 reel/ }));
    const frame = container.querySelector("iframe")!;
    expect(frame.getAttribute("src")).toBe("https://www.instagram.com/reel/DekBUZKs3S4/embed/");
    expect(screen.getByText("Loading reel…")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(8000));
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.getByText(/would not load here/)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("treats a blocked frame's load event as a failure, not a reel", () => {
    vi.useFakeTimers();
    const { container } = render(<ReelCell episode={byDay(1)!} />);
    fireEvent.click(screen.getByRole("button", { name: /Play Day 1 reel/ }));
    fireEvent.load(container.querySelector("iframe")!);
    expect(screen.getByText("Loading reel…")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(8000));
    expect(screen.getByText(/would not load here/)).toBeInTheDocument();
    vi.useRealTimers();
  });

  it("shows the reel once the embed reports in, and ignores other origins", () => {
    vi.useFakeTimers();
    const { container } = render(<ReelCell episode={byDay(1)!} />);
    fireEvent.click(screen.getByRole("button", { name: /Play Day 1 reel/ }));
    const source = container.querySelector("iframe")!.contentWindow;
    act(() => {
      window.dispatchEvent(new MessageEvent("message", { origin: "https://evil.example", source, data: "{}" }));
    });
    expect(screen.getByText("Loading reel…")).toBeInTheDocument();
    act(() => {
      window.dispatchEvent(
        new MessageEvent("message", { origin: "https://www.instagram.com", source, data: '{"type":"MEASURE"}' }),
      );
    });
    expect(screen.queryByText("Loading reel…")).toBeNull();
    act(() => vi.advanceTimersByTime(8000));
    expect(container.querySelector("iframe")).not.toBeNull();
    expect(screen.queryByText(/would not load here/)).toBeNull();
    vi.useRealTimers();
  });

  it("always offers a plain Instagram link", () => {
    render(<ReelCell episode={byDay(1)!} />);
    expect(screen.getByRole("link", { name: /Open Day 1 on Instagram/ })).toHaveAttribute(
      "href",
      "https://www.instagram.com/rich_anthill/reel/Deewk4GuUZa/",
    );
  });
});

describe("CitationChip", () => {
  it("opens the full reference in place and closes with Escape", () => {
    render(<CitationChip source={sourceById("S8")!} />);
    const chip = screen.getByRole("button", { name: /Show source S8/ });
    expect(chip).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(chip);
    expect(chip).toHaveAttribute("aria-expanded", "true");
    const panel = screen.getByRole("region", { name: "Source S8" });
    expect(panel).toHaveTextContent("doi:10.1098/rspb.2012.0051");
    expect(panel).toHaveTextContent(/Queenless/);
    fireEvent.keyDown(panel, { key: "Escape" });
    expect(chip).toHaveAttribute("aria-expanded", "false");
    expect(chip).toHaveFocus();
  });
});

describe("HalftonePlate", () => {
  it("labels every stand-in as not this colony", () => {
    render(<HalftonePlate media={media.crumb} />);
    expect(screen.getByText(/Stand-in photograph\. Not this colony\./)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: media.crumb.alt })).toBeInTheDocument();
  });
});
