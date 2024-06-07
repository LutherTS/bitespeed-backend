import type { MetaFunction } from "@remix-run/node";

import Identify from "~/components/identify";
import Reset from "~/components/reset";

export const meta: MetaFunction = () => {
  return [
    { title: "Bitespeed Backend Task" },
    { name: "description", content: "Identity Reconciliation" },
  ];
};

// Switch to JSON Body now makes this unnecessary.
export default function Index() {
  return (
    <>
      <Identify />
      <Reset />
    </>
  );
}
