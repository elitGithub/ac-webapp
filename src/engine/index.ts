export * from "./enginesys";

export type ContextFunction<T> = (context: T, ...args: any) => any;