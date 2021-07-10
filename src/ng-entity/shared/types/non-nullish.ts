export type NonNullish<T> = T extends null | undefined ? never : T;
