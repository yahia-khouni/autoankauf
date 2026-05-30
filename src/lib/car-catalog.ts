import { carMakes } from "@/data/car-makes";
import { prisma } from "@/lib/db";

const CATALOG_INIT_KEY = "car_catalog_initialized_v2";

let bootstrappingPromise: Promise<void> | null = null;

function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function bootstrapCatalogIfNeeded() {
  const initialized = await prisma.setting.findUnique({
    where: { key: CATALOG_INIT_KEY },
    select: { key: true },
  });

  if (initialized) {
    return;
  }

  for (const makeData of carMakes) {
    const make = await prisma.carMake.upsert({
      where: { slug: makeData.slug },
      update: { name: makeData.name },
      create: {
        name: makeData.name,
        slug: makeData.slug,
      },
      select: { id: true },
    });

    const seenModelSlugs = new Set<string>();

    for (const modelName of makeData.models) {
      const baseSlug = toSlug(modelName) || "model";
      let slug = baseSlug;
      let suffix = 2;

      while (seenModelSlugs.has(slug)) {
        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
      }

      seenModelSlugs.add(slug);

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

  await prisma.setting.upsert({
    where: { key: CATALOG_INIT_KEY },
    update: { value: JSON.stringify({ initializedAt: new Date().toISOString() }) },
    create: {
      key: CATALOG_INIT_KEY,
      value: JSON.stringify({ initializedAt: new Date().toISOString() }),
    },
  });
}

export async function ensureCarCatalogInitialized() {
  if (!bootstrappingPromise) {
    bootstrappingPromise = bootstrapCatalogIfNeeded().finally(() => {
      bootstrappingPromise = null;
    });
  }

  await bootstrappingPromise;
}
