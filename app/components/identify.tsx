import { useFetcher } from "@remix-run/react";

export default function Indentify() {
  const fetcher = useFetcher();

  return (
    <>
      <fetcher.Form action="/identify" method="post">
        <label htmlFor="phone-number">Phone number</label>
        <input type="text" id="phone-number" name="phonenumber" />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />
        <button type="submit">Submit</button>
      </fetcher.Form>
    </>
  );
}
