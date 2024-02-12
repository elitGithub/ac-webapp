import Phaser from 'phaser';
import { GradientStyle } from '../types/types';
import { UniqueIdsGenerator } from './UniqueIdGenerator';
import SceneFactory from '../SceneFactory';

class GraphicsHandler {
  public containers: Record<string, Phaser.GameObjects.Container> = {};
  private graphics!: Phaser.GameObjects.Graphics;

  constructor(public scene: SceneFactory) {
    this.scene = scene;
  }


  createContainer(width: number, height: number, containerHeightRatio: number, x: number = 0, y: number = 0) {
    const key = UniqueIdsGenerator.generateTrueRandomString();
    const containerHeight = height * containerHeightRatio;

    // Create a transparent container for the text
    const container = this.scene.add.container(x, y);
    container.setSize(width, containerHeight);
    this.containers[key] = container;
    return { key, container };
  }

  createEmptyRectangle(containerKey: string, width: number, height: number, x: number, y: number, borderColor: number, borderWidth: number) {
    // Create a Graphics object for the container
    this.graphics = this.scene.add.graphics();

    this.graphics.lineStyle(borderWidth, borderColor);

// Draw the border around the container
    this.graphics.strokeRect(
      x,y,
      width + borderWidth,
      height + borderWidth
    );

    // Add the graphics object to the container
    this.containers[containerKey].add(this.graphics);
  }

  createBorder(scene: SceneFactory, height: number, width: number, lineWidth: number, color: any, alpha: number) {
    const border = scene.add.graphics();
    border.lineStyle(lineWidth, color, alpha);
    border.strokeRect(0, 0, width, height);
    return border;
  }

  createGradient(containerKey: string, gradientStyle: GradientStyle, shape: string = 'rectangle') {
    if (!this.containers[containerKey]) {
      return;
    }
    // Create a Graphics object for the container
    this.graphics = this.scene.add.graphics();

    // Set the gradient fill style
    this.graphics.fillGradientStyle(
      gradientStyle.topLeft,
      gradientStyle.topRight,
      gradientStyle.bottomLeft,
      gradientStyle.bottomRight,
      gradientStyle.alphaTopLeft,
      gradientStyle.alphaTopRight,
      gradientStyle.alphaBottomLeft,
      gradientStyle.alphaBottomRight);

    switch (shape) {
      case 'roundedRect':
        this.graphics.fillRoundedRect(0, 0, this.containers[containerKey].width, this.containers[containerKey].height, 10);
        break;
      case 'rectangle':
        this.graphics.fillRect(0, 0, this.containers[containerKey].width, this.containers[containerKey].height);
        break;
      default:
        break;
    }
    // Add the graphics object to the container
    this.containers[containerKey].add(this.graphics);
  }



  updateContainerPosition(key: string, gameHeight: number, containerHeightRatio: number, x = 0) {
    const containerHeight = gameHeight * containerHeightRatio;
    this.containers[key].setPosition(x, gameHeight - containerHeight);
  }
}

export default GraphicsHandler;
