import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";
import { getStore } from "@netlify/blobs";

export type UserRecord = {
  id: string;
  email: string;
  /** bcrypt hash (or legacy plaintext until upgraded on next login) */
  password: string;
};

const BLOB_STORE = "regents-users";
const BLOB_KEY = "all";

function useNetlifyBlobs(): boolean {
  return process.env.NETLIFY === "true";
}

async function readLocalUsersFile(): Promise<{
  users: UserRecord[];
  persistPath: string;
}> {
  const primary = path.join(process.cwd(), "data", "users.json");
  try {
    await fs.access(primary);
    const raw = await fs.readFile(primary, "utf8");
    return { users: JSON.parse(raw) as UserRecord[], persistPath: primary };
  } catch {
    const sample = path.join(process.cwd(), "data", "users.sample.json");
    const raw = await fs.readFile(sample, "utf8");
    return { users: JSON.parse(raw) as UserRecord[], persistPath: primary };
  }
}

async function readAllUsers(): Promise<UserRecord[]> {
  if (useNetlifyBlobs()) {
    const store = getStore(BLOB_STORE);
    const data = await store.get(BLOB_KEY, { type: "json" });
    if (Array.isArray(data)) return data as UserRecord[];
    return [];
  }
  const { users } = await readLocalUsersFile();
  return users;
}

async function writeAllUsers(users: UserRecord[]): Promise<void> {
  if (useNetlifyBlobs()) {
    const store = getStore(BLOB_STORE);
    await store.setJSON(BLOB_KEY, users);
    return;
  }
  const fp = path.join(process.cwd(), "data", "users.json");
  await fs.mkdir(path.dirname(fp), { recursive: true });
  await fs.writeFile(fp, JSON.stringify(users, null, 2), "utf8");
}

export async function findUserByEmail(
  email: string,
): Promise<UserRecord | undefined> {
  const norm = email.trim().toLowerCase();
  const all = await readAllUsers();
  return all.find((u) => u.email.toLowerCase() === norm);
}

export async function findUserById(id: string): Promise<UserRecord | undefined> {
  const all = await readAllUsers();
  return all.find((u) => u.id === id);
}

export async function appendUser(user: UserRecord): Promise<void> {
  const all = await readAllUsers();
  if (all.some((u) => u.email.toLowerCase() === user.email.toLowerCase())) {
    throw new Error("Email already registered");
  }
  all.push(user);
  await writeAllUsers(all);
}

export async function updateUserFields(
  id: string,
  patch: Partial<Pick<UserRecord, "password" | "email">>,
): Promise<void> {
  const all = await readAllUsers();
  const idx = all.findIndex((u) => u.id === id);
  if (idx === -1) throw new Error("User not found");
  all[idx] = { ...all[idx], ...patch };
  await writeAllUsers(all);
}

/** New stable user id (Stripe metadata / session `sub`). */
export function newUserId(): string {
  return randomUUID();
}
