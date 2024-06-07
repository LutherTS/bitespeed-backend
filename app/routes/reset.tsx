import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { prisma } from "~/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("Deleting existing entries in Contact table...");
  const deleteContacts = await prisma.contact.deleteMany({});

  console.log("Contact table reset.");
  console.log(deleteContacts);

  return null;
};

export const loader = async () => redirect("/");
