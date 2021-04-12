import { VersionedValue, VersionedValueWithStateAdapter } from "./types";
import { makeVersionedValue } from "./versioned-value";

const persistentCache: Map<string, VersionedValue<any>> = new Map();

function read<T>(key: string, defaultValue: T): T {
    const value = localStorage.getItem(key);
    if (!value) return defaultValue;

    try {
        return JSON.parse(value);
    } catch {
        return defaultValue;
    }
}

const versionedValueFactory = <T>(key: string, defaultValue: T) => makeVersionedValue(read(key, defaultValue), newValue => {
    localStorage.setItem(key, JSON.stringify(newValue));
    return true;
});

export function getPersistentValue<T>(key: string, defaultValue: T): VersionedValueWithStateAdapter<T> {
    if (persistentCache.has(key)) return persistentCache.get(key) as VersionedValueWithStateAdapter<T>;
    else return persistentCache.set(key, versionedValueFactory(key, defaultValue)).get(key) as VersionedValueWithStateAdapter<T>;
}
