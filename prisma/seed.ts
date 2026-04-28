import { PrismaClient } from "@prisma/client";
import { carMakes } from "../src/data/car-makes";

const prisma = new PrismaClient();

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureCarCatalog() {
  for (const makeData of carMakes) {
    const make = await prisma.carMake.upsert({
      where: { slug: makeData.slug },
      update: { name: makeData.name },
      create: {
        name: makeData.name,
        slug: makeData.slug,
      },
    });

    for (const modelName of makeData.models) {
      const slug = toSlug(modelName) || "model";

      await prisma.carModel.upsert({
        where: {
          makeId_slug: {
            makeId: make.id,
            slug,
          },
        },
        update: {
          name: modelName,
        },
        create: {
          name: modelName,
          slug,
          makeId: make.id,
        },
      });
    }
  }

  const makesCount = await prisma.carMake.count();
  const modelsCount = await prisma.carModel.count();
  console.log(`✓ Car catalog ready: ${makesCount} makes, ${modelsCount} models`);
}

async function main() {
  await ensureCarCatalog();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
