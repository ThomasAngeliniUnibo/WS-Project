export function pickValue<T extends Record<string, unknown>, K extends keyof T>(
  ...keys: K[]
): (base: T) => Pick<T, K> {
  return base => {
    const entries = keys.map(key => [key, (base[key] as any).value]);
    return Object.fromEntries(entries);
  };
}
