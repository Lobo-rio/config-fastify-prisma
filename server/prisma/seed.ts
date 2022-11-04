import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: "https://github.com/Lobo-rio.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Example Pool New 1234",
      code: "BOL125",
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  //const participant = await prisma.participant.create({
  //  data: {
  //      poolId: pool.id,
  //      userId: user.id,
  //  }
  //});

  await prisma.game.create({
    data: {
      date: "2022-11-05T14:00:00.281Z",
      firstTeamCountryCode: "AR",
      secondTeamCountryCode: "DE",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-07T14:00:00.281Z",
      firstTeamCountryCode: "AR",
      secondTeamCountryCode: "BR",

      guesses: {
        create: {
          firstTeamPoints: 3,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
