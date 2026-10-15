import { publicConfig } from "../config/public";
import { secretIds } from "./data";
import type { SecretId } from "./types";

const progressKey = "wufu.opening-signals.v2";

async function createSecretKey() {
  const source = `${publicConfig.brandName}-${publicConfig.campaignYear}-discoveries`;
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(source));

  return crypto.subtle.importKey("raw", bytes, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

export async function saveProgress(found: SecretId[]) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    await createSecretKey(),
    new TextEncoder().encode(JSON.stringify(found)),
  );
  const packed = new Uint8Array(iv.length + encrypted.byteLength);
  packed.set(iv);
  packed.set(new Uint8Array(encrypted), iv.length);
  localStorage.setItem(progressKey, btoa(String.fromCharCode(...packed)));
}

export async function loadProgress(): Promise<SecretId[]> {
  try {
    const raw = localStorage.getItem(progressKey);
    if (!raw) return [];

    const packed = Uint8Array.from(atob(raw), (character) => character.charCodeAt(0));
    const clear = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: packed.slice(0, 12) },
      await createSecretKey(),
      packed.slice(12),
    );
    const value: unknown = JSON.parse(new TextDecoder().decode(clear));

    return Array.isArray(value) ? value.filter((id): id is SecretId => secretIds.includes(id)) : [];
  } catch {
    return [];
  }
}
