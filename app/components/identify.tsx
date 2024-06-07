import { useFetcher } from "@remix-run/react";
import { JsonifyObject } from "type-fest/source/jsonify";

type ContactResponse = JsonifyObject<{
  contact?: {
    primaryContactId: number;
    emails: string[];
    phoneNumbers: string[];
    secondaryContactIds: number[];
  };
}>;

export default function Indentify() {
  const fetcher = useFetcher<ContactResponse>();

  return (
    <>
      <fetcher.Form action="/identify" method="post">
        <label htmlFor="phone-number">Phone number</label>
        <input type="text" id="phone-number" name="phonenumber" />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />
        <button type="submit">Submit</button>
      </fetcher.Form>
      {fetcher.data && (
        <>
          <p>Primary contact ID: {fetcher.data.contact?.primaryContactId}</p>
          <p>Emails: {fetcher.data.contact?.emails.join(", ")}</p>
          <p>Phone numbers: {fetcher.data.contact?.phoneNumbers.join(", ")}</p>
          <p>
            Secondary contact IDs:{" "}
            {fetcher.data.contact?.secondaryContactIds &&
            fetcher.data.contact?.secondaryContactIds.length > 0
              ? fetcher.data.contact?.secondaryContactIds.join(", ")
              : "none"}
          </p>
        </>
      )}
    </>
  );
}
