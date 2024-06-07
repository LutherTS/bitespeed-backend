import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  /*
  const contact = await prisma.contact.create({
    data: {
      phoneNumber: "123456",
      email: "lorraine@hillvalley.edu",
      linkPrecedence: "primary",
    },
  });
  console.log(contact);
  */
  const contacts = await prisma.contact.findMany();
  console.log(contacts);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
