import { useFetcher } from "@remix-run/react";

export default function Reset() {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action="/reset" method="post">
        <button>Reset database</button>
      </fetcher.Form>
    </>
  );
}
