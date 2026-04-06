#!/usr/bin/env python3
"""
Setup script for Autoankauf Next.js project.
Creates all necessary directories and generates initial placeholder files.

Run this with: python create_dirs.py
"""
import os
from pathlib import Path

base_path = Path(__file__).parent.resolve()
print(f"Setting up project at: {base_path}")

directories = [
    "prisma",
    "src/app/[locale]/(main)",
    "src/app/[locale]/standorte/[state]/[city]",
    "src/app/[locale]/blog/[slug]",
    "src/app/[locale]/kontakt",
    "src/app/[locale]/ueber-uns",
    "src/app/[locale]/so-funktionierts",
    "src/app/[locale]/impressum",
    "src/app/[locale]/datenschutz",
    "src/app/[locale]/agb",
    "src/app/api/leads/[id]",
    "src/app/api/cars/makes/[id]",
    "src/app/api/contact",
    "src/components/ui",
    "src/components/layout",
    "src/components/forms",
    "src/components/sections",
    "src/lib",
    "src/data",
    "src/messages",
    "src/types",
    "public/images",
    "src/app/admin",
    "src/app/admin/leads/[id]",
]

# Create directories
for directory in directories:
    dir_path = base_path / directory
    dir_path.mkdir(parents=True, exist_ok=True)
    print(f"✓ Created: {directory}")

print("\n✅ All directories created successfully!")
print("\nNext steps:")
print("1. Run: npm install")
print("2. Copy .env.example to .env and fill in values")
print("3. Run: npx prisma generate")
print("4. Run: npm run dev")
