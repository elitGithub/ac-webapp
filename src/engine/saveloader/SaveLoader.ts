type StorageType = "cloud" | "browser" | "disk";

type SaveData = Record<string, any>;

export class SaveLoader {
    async save(
        key: string,
        data: SaveData,
        storageType: StorageType
    ): Promise<void> {
        try {
            switch (storageType) {
                case "cloud":
                    await this.saveToCloud(key, data);
                    break;
                case "browser":
                    this.saveToBrowser(key, data);
                    break;
                case "disk":
                    await this.saveToDisk(key, data);
                    break;
                default:
                    throw new Error("Unsupported storage type.");
            }
        } catch (error) {
            console.error("Save error:", error);
            throw error;
        }
    }

    async load(
        key: string,
        storageType: StorageType
    ): Promise<Record<string, any>> {
        try {
            let loadedData: Record<string, any>;

            switch (storageType) {
                case "cloud":
                    loadedData = await this.loadFromCloud(key);
                    break;
                case "browser":
                    loadedData = this.loadFromBrowser(key);
                    break;
                case "disk":
                    loadedData = await this.loadFromDisk(key);
                    break;
                default:
                    throw new Error("Unsupported storage type");
            }

            return loadedData;
        } catch (error) {
            console.error("Load error:", error);
            throw error;
        }
    }

    private async saveToCloud(
        key: string,
        data: Record<string, any>
    ): Promise<void> {}

    private async loadFromCloud(key: string): Promise<SaveData> {
        return {};
    }

    private saveToBrowser(key: string, data: SaveData): void {
        // Save user progress data to local browser using localStorage
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(key, serializedData);
        } catch (error) {
            console.error("Error saving data to browser:", error);
        }
    }

    private loadFromBrowser(key: string): SaveData {
        // Get data from local browser storage
        const serializedData = localStorage.getItem(key);
        if (serializedData) {
            return JSON.parse(serializedData);
        } else {
            return {};
        }
    }

    private async saveToDisk(key: string, data: SaveData): Promise<void> {}

    private async loadFromDisk(key: string): Promise<SaveData> {
        return {};
    }
}
