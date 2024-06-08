import type { MetaFunction } from "@remix-run/node";

// import Identify from "~/components/identify";
// import Reset from "~/components/reset";

export const meta: MetaFunction = () => {
  return [
    { title: "Bitespeed Backend Task" },
    { name: "description", content: "Identity Reconciliation" },
  ];
};

// The switch to JSON Body now makes this unnecessary.
export default function Index() {
  return (
    <>
      {/* <Identify />
      <Reset /> */}
      <h1>Bitespeed Backend Task - Identity Reconciliation</h1>
      <p>Hit the /identify endpoint with the relevant data.</p>
      <p>Hit the /reset endpoint to reset the database.</p>
      <p>
        Please let me know what you think at luther@tchofo-safo-portofolio.me.
      </p>
    </>
  );
}
