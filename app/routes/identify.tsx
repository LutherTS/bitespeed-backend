import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { prisma } from "~/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  /* FROM FORM DATA TO BE READAPTED TO JSON BODY
  const form = await request.formData();
  const phoneNumber = form.get("phonenumber") || "";
  const email = form.get("email") || "";
  */

  const data = await request.json();
  const phoneNumber = data.phoneNumber || "";
  const email = data.email || "";

  if (typeof phoneNumber !== "string" || typeof email !== "string") {
    return null;
  }

  let primaryContactId;
  let emails;
  let phoneNumbers;
  let secondaryIds;

  const exactContact = await prisma.contact.findFirst({
    where: { AND: [{ phoneNumber }, { email }] },
  });

  if (exactContact) {
    console.log("Exact contact already exists.");
    primaryContactId =
      exactContact.linkPrecedence === "primary"
        ? exactContact.id
        : exactContact.linkedId;
  } else {
    const contactByPhoneNumber = await prisma.contact.findFirst({
      where: { phoneNumber },
    });
    const contactByEmail = await prisma.contact.findFirst({
      where: { email },
    });

    if (!contactByPhoneNumber && !contactByEmail) {
      if (phoneNumber === "" || email === "") {
        console.log(
          "Error. Cannot create a brand-new contact without both a phone number and an email."
        );
        return null;
      } else {
        console.log(
          "Creating a brand-new contact from new phone number and new email."
        );
        const newContact = await prisma.contact.create({
          data: {
            phoneNumber,
            email,
            linkPrecedence: "primary",
          },
        });
        primaryContactId = newContact.id;
      }
    }

    if (contactByPhoneNumber && !contactByEmail) {
      if (contactByPhoneNumber && email === "") {
        console.log("Preexisting contact by phone number, no email provided.");
      } else {
        console.log("Creating new secondary contact with new email.");
        await prisma.contact.create({
          data: {
            phoneNumber,
            email,
            linkPrecedence: "secondary",
            linkedId:
              contactByPhoneNumber.linkPrecedence === "primary"
                ? contactByPhoneNumber.id
                : contactByPhoneNumber.linkedId,
          },
        });
      }
      primaryContactId =
        contactByPhoneNumber.linkPrecedence === "primary"
          ? contactByPhoneNumber.id
          : contactByPhoneNumber.linkedId;
    }

    if (contactByEmail && !contactByPhoneNumber) {
      if (contactByEmail && phoneNumber === "") {
        console.log("Preexisting contact by email, no phone number provided.");
      } else {
        console.log("Creating new secondary contact with new phone number.");
        await prisma.contact.create({
          data: {
            phoneNumber,
            email,
            linkPrecedence: "secondary",
            linkedId:
              contactByEmail.linkPrecedence === "primary"
                ? contactByEmail.id
                : contactByEmail.linkedId,
          },
        });
      }
      primaryContactId =
        contactByEmail.linkPrecedence === "primary"
          ? contactByEmail.id
          : contactByEmail.linkedId;
    }

    // exactContact is already catched on top so the following are bound
    // to be different, and since they both are findFirst they are also
    // bound to be both primaries in their own right.
    if (contactByEmail && contactByPhoneNumber) {
      const contacts = [contactByEmail, contactByPhoneNumber];
      const primaries = contacts.filter((e) => e.linkPrecedence === "primary");

      if (primaries.length === 2) {
        console.log("Conflicting primaries.");
        contacts.sort(
          // @ts-ignore
          // It works. Typescript just doesn't understand this yet.
          (a, b) => a.createdAt - b.createdAt
        );

        await prisma.contact.update({
          where: { id: contacts[1].id },
          data: {
            linkPrecedence: "secondary",
            linkedId: contacts[0].id,
          },
        });
        console.log("Latest primary turned into secondary.");
        primaryContactId = contacts[0].id;
      }

      if (primaries.length === 1) {
        console.log("No conflicting primaries.");
        primaryContactId = primaries[0].id;

        console.log(
          "However, the decision is made that in such instances, the secondary is reassigned to the primary provided."
        );
        const secondary = contacts.find(
          (e) => e.linkPrecedence === "secondary"
        );

        // impossible but for type safety
        if (!secondary) return null;

        await prisma.contact.update({
          where: { id: secondary.id },
          data: {
            linkedId: primaryContactId,
          },
        });
      }

      if (primaries.length === 0) {
        console.log(
          "Two secondaries found, once for phone number, one for email."
        );
        console.log(
          "Consequently, the decision is made that in such instances, only the earliest of their primaries will be shown. (Handly both cases when the primaries are common and uncommon.)"
        );

        // again impossible, but necessary for type safety
        if (!contactByPhoneNumber.linkedId || !contactByEmail.linkedId)
          return null;

        const theirPrimaries = await prisma.contact.findMany({
          where: {
            OR: [
              { id: contactByPhoneNumber.linkedId },
              { id: contactByEmail.linkedId },
            ],
          },
          orderBy: { createdAt: "asc" },
        });

        primaryContactId = theirPrimaries[0].id;
      }
    }
  }

  // Whatever the cases, in the absolute end I should return the following:

  // again for type safety
  if (typeof primaryContactId !== "number") {
    return null;
  }

  const contactEmails = await prisma.contact.findMany({
    select: {
      email: true,
    },
    where: {
      OR: [{ id: primaryContactId }, { linkedId: primaryContactId }],
    },
    // because the primary contact will always be the oldest
    orderBy: { createdAt: "asc" },
  });

  const contactPhoneNumbers = await prisma.contact.findMany({
    select: {
      phoneNumber: true,
    },
    where: {
      OR: [{ id: primaryContactId }, { linkedId: primaryContactId }],
    },
    // because again the primary contact will always be the oldest
    orderBy: { createdAt: "asc" },
  });

  const contactSecondaryIds = await prisma.contact.findMany({
    select: {
      id: true,
    },
    where: {
      linkedId: primaryContactId,
    },
    orderBy: { createdAt: "asc" },
  });

  // It is preferrable to reduce the amount of database calls.
  // Handling what's left with JavaScript should be the faster, safer way.
  emails = [...new Set(contactEmails.map((e) => e.email))];

  phoneNumbers = [...new Set(contactPhoneNumbers.map((e) => e.phoneNumber))];

  secondaryIds = contactSecondaryIds.map((e) => e.id);

  console.log({
    contact: {
      primaryContactId,
      emails,
      phoneNumbers,
      secondaryIds,
    },
  });

  return json(
    {
      contact: {
        primaryContactId,
        emails,
        phoneNumbers,
        secondaryIds,
      },
    },
    { status: 200 }
  );
};

export const loader = async () => redirect("/");
