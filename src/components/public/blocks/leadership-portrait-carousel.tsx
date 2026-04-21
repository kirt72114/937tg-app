"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MissingImage } from "@/components/shared/missing-image";

export type CarouselLeader = {
  id: string;
  name: string;
  rank: string;
  title: string;
  photoUrl: string | null;
};

export function LeadershipPortraitCarousel({
  leaders,
}: {
  leaders: CarouselLeader[];
}) {
  const [index, setIndex] = useState(0);

  if (leaders.length === 0) {
    return (
      <MissingImage
        label="No leaders assigned"
        className="h-80 w-64 mx-auto"
      />
    );
  }

  const safeIndex = Math.max(0, Math.min(index, leaders.length - 1));
  const current = leaders[safeIndex];
  const canPaginate = leaders.length > 1;

  function go(delta: number) {
    setIndex((prev) => {
      const next = prev + delta;
      if (next < 0) return leaders.length - 1;
      if (next >= leaders.length) return 0;
      return next;
    });
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center w-full">
        {canPaginate && (
          <button
            type="button"
            onClick={() => go(-1)}
            className="absolute left-0 md:-left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-military-navy shadow border border-muted-foreground/20 hover:bg-military-blue hover:text-white transition-colors"
            aria-label="Previous leader"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div className="flex flex-col items-center">
          {current.photoUrl ? (
            <img
              src={current.photoUrl}
              alt={`${current.rank} ${current.name}`}
              className="h-80 w-64 md:h-96 md:w-72 rounded object-cover object-top shadow-md bg-white"
            />
          ) : (
            <MissingImage
              label="Photo Missing"
              className="h-80 w-64 md:h-96 md:w-72"
            />
          )}
          <div className="mt-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-military-blue">
              {current.title}
            </p>
            <p className="text-base font-semibold text-military-navy">
              {current.rank} {current.name}
            </p>
          </div>
        </div>

        {canPaginate && (
          <button
            type="button"
            onClick={() => go(1)}
            className="absolute right-0 md:-right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-military-navy shadow border border-muted-foreground/20 hover:bg-military-blue hover:text-white transition-colors"
            aria-label="Next leader"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {canPaginate && (
        <div className="flex flex-wrap justify-center gap-2">
          {leaders.map((leader, i) => {
            const active = i === safeIndex;
            return (
              <button
                key={leader.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-16 w-14 md:h-20 md:w-16 rounded overflow-hidden border-2 transition-all ${
                  active
                    ? "border-military-gold scale-105 shadow"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                aria-label={`${leader.rank} ${leader.name}`}
                aria-current={active ? "true" : undefined}
              >
                {leader.photoUrl ? (
                  <img
                    src={leader.photoUrl}
                    alt=""
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <MissingImage className="h-full w-full" label="Missing" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
