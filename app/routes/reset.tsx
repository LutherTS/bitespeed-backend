import { json, redirect } from "@remix-run/node";
import { prisma } from "~/db.server";

export const action = async () => {
  // console.log("Deleting existing entries in Contact table...");
  const deleteContacts = await prisma.contact.deleteMany({});

  // console.log("Contact table reset. Delete count shown below.");
  // console.log(deleteContacts);

  return json(
    {
      message: `Contacts reset. ${deleteContacts.count} ${
        deleteContacts.count === 1 ? "contact" : "contacts"
      } deleted.`,
    },
    { status: 200 }
  );
};

export const loader = async () => redirect("/");
