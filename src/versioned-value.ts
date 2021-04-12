import { useEffect, useRef, useState } from "react";
import { VersionedObserver, VersionedValueWithStateAdapter } from "./types";

export function makeVersionedValue<T>(defaultValue: T, setter: (newValue: T) => boolean = () => true): VersionedValueWithStateAdapter<T> {
    const observers: Set<VersionedObserver<T>> = new Set();

    const versionedValue: VersionedValueWithStateAdapter<T> = new Proxy({
        value: defaultValue,
        revision: 0,
        observe: (cb: (newValue: T) => any) => {
            observers.add(cb);

            return () => {
                observers.delete(cb);
            };
        },
        useAsState: () => {
            const [ value, setValue ] = useState<T>(() => versionedValue.value);
            const revision = useRef(versionedValue.revision);

            if (revision.current !== versionedValue.revision) {
                setValue(versionedValue.value);
                revision.current = versionedValue.revision;
            }

            useEffect(() => versionedValue.observe((newValue: T) => {
                setValue(newValue);
                revision.current = versionedValue.revision;
            }));

            return [value, newValue => {
                revision.current = versionedValue.revision + 1;
                versionedValue.value = newValue;
            }, versionedValue];
        }
    } as VersionedValueWithStateAdapter<T>, {
        set(target, property, value) {
            switch (property) {
                case "value":
                    if (!setter(value)) return false;
                    target.value = value;
                    // @ts-ignore
                    target.revision++;

                    for (const observer of observers) {
                        observer(value);
                    }

                    break;
                default:
                    return false;
            }

            return true;
        }
    });

    return versionedValue;
}