import { useFetcher } from "@remix-run/react";
import Form from "~/components/form";

export default function FormPage() {
  const fetcher = useFetcher();

  return (
    <>
      <Form />
    </>
  );
}
