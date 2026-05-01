import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  type AISectionContent,
  aiSectionSchema,
} from "@/content-lib/schemas/ai-section.schema";
import {
  type HomeContent,
  homeSchema,
} from "@/content-lib/schemas/home.schema";
import {
  type ProcessContent,
  processSchema,
} from "@/content-lib/schemas/process.schema";
import {
  type ServicesIndex,
  servicesIndexSchema,
} from "@/content-lib/schemas/services.schema";
import {
  type SiteContent,
  siteSchema,
} from "@/content-lib/schemas/site.schema";

export type Locale = "es" | "en";

const CONTENT_ROOT = path.join(process.cwd(), "content");

async function readJson<T>(relativePath: string): Promise<T> {
  const absolutePath = path.join(CONTENT_ROOT, relativePath);
  const raw = await readFile(absolutePath, "utf-8");
  return JSON.parse(raw) as T;
}

export async function loadHome(locale: Locale): Promise<HomeContent> {
  const raw = await readJson<unknown>(`${locale}/home.json`);
  return homeSchema.parse(raw);
}

export async function loadServicesIndex(
  locale: Locale,
): Promise<ServicesIndex> {
  const raw = await readJson<unknown>(`${locale}/services/_index.json`);
  return servicesIndexSchema.parse(raw);
}

export async function loadAISection(locale: Locale): Promise<AISectionContent> {
  const raw = await readJson<unknown>(`${locale}/ai-section.json`);
  return aiSectionSchema.parse(raw);
}

export async function loadProcess(locale: Locale): Promise<ProcessContent> {
  const raw = await readJson<unknown>(`${locale}/process.json`);
  return processSchema.parse(raw);
}

export async function loadSite(): Promise<SiteContent> {
  const absolutePath = path.join(CONTENT_ROOT, "site.json");
  const raw = await readFile(absolutePath, "utf-8");
  const parsed = JSON.parse(raw) as unknown;
  return siteSchema.parse(parsed);
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const services = await loadServicesIndex("es");
  return services.services.map((s) => s.slug);
}
