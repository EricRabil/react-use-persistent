export interface VersionedValue<T> {
    value: T;
    readonly revision: number;
    readonly observe: (cb: (newValue: T) => any) => () => void;
}

export type VersionedObserver<T> = Parameters<VersionedValue<T>["observe"]>[0];

export interface VersionedValueWithStateAdapter<T> extends VersionedValue<T> {
    readonly useAsState: () => [T, (newValue: T) => void, VersionedValueWithStateAdapter<T>];
}