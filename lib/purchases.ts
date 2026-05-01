import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import { getStore } from "@netlify/blobs";

export type Purchase = {
  id: string;
  course_name: string;
  has_live_session: number;
  progress_percentage: number;
};

type FileShape = Record<string, Purchase[]>;

const STORE_NAME = "regents-purchases";

function useNetlifyBlobs(): boolean {
  return process.env.NETLIFY === "true";
}

async function readFileStore(): Promise<FileShape> {
  const fp = path.join(process.cwd(), "data", "purchases.local.json");
  try {
    const raw = await fs.readFile(fp, "utf8");
    return JSON.parse(raw) as FileShape;
  } catch {
    return {};
  }
}

async function writeFileStore(data: FileShape) {
  const fp = path.join(process.cwd(), "data", "purchases.local.json");
  await fs.mkdir(path.dirname(fp), { recursive: true });
  await fs.writeFile(fp, JSON.stringify(data, null, 2), "utf8");
}

async function blobGetPurchases(userId: string): Promise<Purchase[]> {
  const store = getStore(STORE_NAME);
  const data = await store.get(userId, { type: "json" });
  if (Array.isArray(data)) return data as Purchase[];
  return [];
}

async function blobSetPurchases(userId: string, list: Purchase[]) {
  const store = getStore(STORE_NAME);
  await store.setJSON(userId, list);
}

export async function getPurchases(userId: string): Promise<Purchase[]> {
  if (useNetlifyBlobs()) {
    return blobGetPurchases(userId);
  }
  const all = await readFileStore();
  return all[userId] ?? [];
}

export async function addPurchaseIfNew(
  userId: string,
  courseName: string,
): Promise<Purchase | null> {
  const existing = await getPurchases(userId);
  if (existing.some((p) => p.course_name === courseName)) {
    return null;
  }
  const purchase: Purchase = {
    id: randomUUID(),
    course_name: courseName,
    has_live_session: 0,
    progress_percentage: 0,
  };
  const next = [...existing, purchase];
  if (useNetlifyBlobs()) {
    await blobSetPurchases(userId, next);
  } else {
    const all = await readFileStore();
    all[userId] = next;
    await writeFileStore(all);
  }
  return purchase;
}

export async function updatePurchaseProgress(
  userId: string,
  purchaseId: string,
  progress: number,
): Promise<void> {
  const list = await getPurchases(userId);
  const idx = list.findIndex((p) => p.id === purchaseId);
  if (idx === -1) return;
  list[idx] = { ...list[idx], progress_percentage: progress };
  if (useNetlifyBlobs()) {
    await blobSetPurchases(userId, list);
  } else {
    const all = await readFileStore();
    all[userId] = list;
    await writeFileStore(all);
  }
}

export async function getPurchaseById(
  userId: string,
  purchaseId: string,
): Promise<Purchase | undefined> {
  const list = await getPurchases(userId);
  return list.find((p) => p.id === purchaseId);
}
