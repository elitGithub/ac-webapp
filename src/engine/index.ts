export * from "./enginesys";

export type ContextFunction<T extends Function> = (context: T, ...args: any) => any;