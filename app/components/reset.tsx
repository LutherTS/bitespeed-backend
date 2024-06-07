import { useFetcher } from "@remix-run/react";
import { JsonifyObject } from "type-fest/source/jsonify";

type ResetResponse = JsonifyObject<{
  message: string;
}>;

export default function Reset() {
  const fetcher = useFetcher<ResetResponse>();

  return (
    <>
      <fetcher.Form action="/reset" method="post">
        <button>Reset database</button>
      </fetcher.Form>
      {fetcher.data && (
        <>
          <p>{fetcher.data.message}</p>
        </>
      )}
    </>
  );
}
