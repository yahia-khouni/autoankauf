import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { carMakes } from "../src/data/car-makes";

const prisma = new PrismaClient();

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureAdminUser() {
  const email = "admin@autoankauf.de";
  const password = "admin123"; // Change this after first login

  const existing = await prisma.admin.findUnique({ where: { email } });

  if (existing) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.create({
    data: {
      email,
      passwordHash,
      name: "Admin",
      role: "ADMIN",
    },
  });

  console.log(`✓ Admin created: ${admin.email}`);
  console.log(`  Password: ${password}`);
  console.log(`  → Change your password after first login!`);
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
  await ensureAdminUser();
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
