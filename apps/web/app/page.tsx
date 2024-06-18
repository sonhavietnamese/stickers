import { CounterButton } from "@repo/ui";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white p-24">
      <CounterButton />
    </main>
  );
}
