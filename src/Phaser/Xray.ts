import Phaser from 'phaser';
import SceneFactory from './SceneFactory';

type SpriteLayer= {
    layer: 'nude' | 'clothed' | 'underwear';
    key: string;
    url: string;
    action: 'add' | 'make';
}

type SpritePosition = {
    x: number;
    y: number;
}

export default class Xray extends SceneFactory {
  private allSprites: Record<string, Phaser.GameObjects.Image> = {};
    private brush!: Phaser.GameObjects.Image;
    private renderTexture!: Phaser.GameObjects.RenderTexture;

    constructor(private sprites: SpriteLayer[], private position: SpritePosition) {
        super('xray-image');
    }

    preload() {
        this.sprites.forEach(image => {
            this.load.image(
                image.key,
                image.url
            );
        });
    }

    create() {
        this.sprites.forEach(sprite => {
          if (sprite.action === 'add') {
            // Assuming this.add.image is a function that creates an image
            this.allSprites[sprite.layer] = this.add.image(this.position.x, this.position.y, sprite.key).setOrigin(0.5);
          }

          if (sprite.action === 'make') {
            // Assuming this.add.image is a function that creates an image
            this.allSprites[sprite.layer] = this.make
              .image({
                key: sprite.key,
                add: false,
              })
              .setPosition(this.position.x, this.position.y)
              .setOrigin(0.5, 0.5);
          }
        });


        const width = this.allSprites['nude'].width;
        const height = this.allSprites['nude'].height;

        this.renderTexture = this.add.renderTexture(this.position.x, this.position.y, width, height);
        this.renderTexture.setOrigin(0.5, 0.5);
        this.renderTexture.draw(this.allSprites['clothed'], width * 0.5, height * 0.5);

        this.brush = this.make.image({
            key: 'reveal_mask',
            add: false,
        });

        this.renderTexture.setInteractive();
        this.renderTexture.on(Phaser.Input.Events.POINTER_MOVE, this.handlePointerMove, this);
    }

    private handlePointerMove(pointer: any) {
        this.renderTexture.clear();
        this.renderTexture.draw(this.allSprites['clothed'], this.allSprites['clothed'].width * 0.5, this.allSprites['clothed'].height * 0.5);

        const x = pointer.x - this.renderTexture.x + (this.renderTexture.width * 0.5);
        const y = pointer.y - this.renderTexture.y + (this.renderTexture.height * 0.5);
        const clothedBounds = this.allSprites['clothed'].getBounds();
        const nudeBounds = this.allSprites['clothed'].getBounds();
        // Check if pointer is within both sprites' bounds
        if (clothedBounds.contains(pointer.x, pointer.y) && nudeBounds.contains(pointer.x, pointer.y)) {
            // Compute the overlapping area of the two sprites
            const intersectionX = Math.min(clothedBounds.x, nudeBounds.x);
            const intersectionY = Math.min(clothedBounds.y, nudeBounds.y);
            const intersectionRight = Math.min(clothedBounds.right, nudeBounds.right);
            const intersectionBottom = Math.min(clothedBounds.bottom, nudeBounds.bottom);
            const intersectionWidth = intersectionRight - intersectionX;
            const intersectionHeight = intersectionBottom - intersectionY;

            // Only erase if pointer is within the intersection of the two sprites
            if (intersectionWidth > 0 && intersectionHeight > 0) {
                const intersectionRect = new Phaser.Geom.Rectangle(intersectionX, intersectionY, intersectionWidth, intersectionHeight);
                if (Phaser.Geom.Rectangle.Contains(intersectionRect, pointer.x, pointer.y)) {
                    this.renderTexture.erase(this.brush, x, y);
                }
            }
        }
    }
}
