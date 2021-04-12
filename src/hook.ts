import { getPersistentValue } from "./persistent-value";
import { VersionedValueWithStateAdapter } from "./types";

export function usePersistent<T = any>(key: string, defaultValue: T): [T, (newValue: T) => void, VersionedValueWithStateAdapter<T>] {
    return getPersistentValue(key, defaultValue).useAsState();
}