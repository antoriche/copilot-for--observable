export async function get(key: string): Promise<string | null> {
  return chrome.storage.local.get([key]).then((result) => {
    return result[key] || null;
  });
}

export async function set(key: string, value: string | null) {
  console.log("set storage", key, value);
  return chrome.storage.local.set({ [key]: value });
}
