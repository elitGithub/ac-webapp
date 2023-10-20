import { Howl } from "howler";

interface SoundEffect {
    [key: string]: Howl;
}

interface BackgroundMusicOptions {
    loop: boolean;
    id: string;
    loopStart?: number; // Loop start time in seconds
    volume?: number;
    fade?: number; // Fade-in duration in milliseconds
}

export class AudioManager {
    private backgroundMusic: Howl | null = null;
    private soundEffects: SoundEffect = {};

    private defaultOptions: BackgroundMusicOptions = {
        id: "",
        loop: false,
        loopStart: 0,
        volume: 0.8,
        fade: 0,
    };

    // Load and play background music
    playBackgroundMusic(src: string, options?: BackgroundMusicOptions): void {
        if (this.backgroundMusic) {
            this.backgroundMusic.stop();
            this.backgroundMusic.unload();
        }

        options = { ...this.defaultOptions, ...options };

        this.backgroundMusic = new Howl({
            src: [src],
            volume: 0.01, // Start with volume 0 for fade-in
            preload: true,
            onload: () => {
                if (this.backgroundMusic) {
                    // Ensure the audio is fully loaded before accessing duration
                    const duration = this.backgroundMusic.duration();

                    this.backgroundMusic._sprite = {
                        loop: [options?.loopStart || 0, duration * 1000, true],
                    };

                    let id = this.backgroundMusic.play("loop");

                    if (options?.fade && options.fade > 0) {
                        // Apply fade-in effect if specified
                        this.backgroundMusic.fade(
                            0,
                            options.volume!,
                            options.fade,
                            id
                        );
                    } else {
                        // Start playing without fade-in
                        this.backgroundMusic.volume(options?.volume!);
                    }
                }
            },
            onplay: () => {},
            onloaderror: (id, error) => {
                console.error(
                    `Error loading background music: id=${id} error=${error}`
                );
            },
            onplayerror: (id, error) => {
                console.error(
                    `Error playing background music: id=${id} error=${error}`
                );
            },
        });
    }

    // Stop the background music
    stopBackgroundMusic() {
        if (this.backgroundMusic) {
            this.backgroundMusic.stop();
        }
    }

    // Pause the background music
    pauseBackgroundMusic(): void {
        if (this.backgroundMusic) {
            this.backgroundMusic.pause();
        }
    }

    // Resume the background music
    resumeBackgroundMusic(): void {
        if (this.backgroundMusic) {
            this.backgroundMusic.play();
        }
    }

    playSoundEffect(src: string, options: BackgroundMusicOptions): void {
        const name = this.getSoundEffectNameFromSrc(src);

        options = { ...this.defaultOptions, ...options };

        if (this.soundEffects[name]) {
            this.soundEffects[name].unload();
        }

        this.soundEffects[name] = new Howl({
            src: [src],
            volume: 0,
            onend: () => {
                // Handle sound effect end
            },
        });

        if (options.fade && options.fade > 0) {
            // Apply fade-in effect if specified
            this.soundEffects[name].fade(0, options.volume!, options.fade);
        } else {
            // Start playing without fade-in
            this.soundEffects[name].volume(options.volume!);
        }

        let id = this.soundEffects[name].play();

        if (options?.position) {
            this.soundEffects[name].pos(
                options.position.x,
                options.position.y,
                options.position.z,
                id
            );
        }
    }

    // Stop a specific sound effect. name is defined as the audio file name.
    stopSoundEffect(name: string): void {
        if (this.soundEffects[name]) {
            this.soundEffects[name].stop();
        }
    }

    // Stop all sound effects
    stopAllSoundEffects(): void {
        for (const name in this.soundEffects) {
            if (Object.prototype.hasOwnProperty.call(this.soundEffects, name)) {
                this.soundEffects[name].stop();
                this.soundEffects[name].unload();
                delete this.soundEffects[name];
            }
        }
    }

    private getSoundEffectNameFromSrc(src: string): string {
        const fileName = src.split("/").pop() || "";

        const name = fileName.replace(".ogg", "");

        return name;
    }
}
