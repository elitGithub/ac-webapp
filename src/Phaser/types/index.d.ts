export {};

declare global {
    interface Window {
        ac?: {
            [key: string]: any;
        };
    }
}
