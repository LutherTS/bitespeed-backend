import { useFetcher } from "@remix-run/react";
import Form from "~/components/form";
import Reset from "~/components/reset";

export default function FormPage() {
  const fetcher = useFetcher();

  return (
    <>
      <Form />
      <Reset />
    </>
  );
}
