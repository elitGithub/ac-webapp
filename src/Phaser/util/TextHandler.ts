import Phaser from 'phaser';
import { gameText } from '../types/types';
import {
  BLACK_HEX, BLACK_TEXT_COLOR,
  COLUMNS,
  HOVER_COLOR_HEX, IDLE_COLOR_HEX,
  SMS_HEADER_CONFIG,
  TEXT_MESSAGE_CONTACT_NUMBER_CONFIG, TEXT_TIMESTAMP_CONFIG,
  TEXT_WRITE_SPEED
} from '../config';
import { HudSceneBottom } from '../uiScenes/HudSceneBottom';
import EventsManager from './EventsManager';
import SceneFactory from '../SceneFactory';
import Character from '../GameState/Character';

class TextHandler {
  private readonly lines: gameText;
  private textObject: Phaser.GameObjects.Text | null;
  private currentIndex: number;
  private readonly typeSpeed: number;
  private textMaxWidth!: number;
  private typing: Phaser.Time.TimerEvent | null;
  private hudSceneBottom: HudSceneBottom;
  private eventsManager: EventsManager;
  private nextLineIsPhone = false;
  private nextLineIsScrolling = false;

  constructor(private scene: SceneFactory, lines: gameText, hudSceneBottom: HudSceneBottom, eventsManager: EventsManager) {
    this.lines = lines;
    this.textObject = null;
    this.currentIndex = 0;
    this.typeSpeed = TEXT_WRITE_SPEED;
    this.typing = null;
    this.hudSceneBottom = hudSceneBottom;
    this.eventsManager = eventsManager;
  }

  initializeText(gameWidth: number, textConfig: Phaser.Types.GameObjects.Text.TextStyle): Phaser.GameObjects.Text {
    this.textMaxWidth = gameWidth * (10 / COLUMNS);
    this.textObject = this.scene.make.text({
      x: 0,
      y: 0,
      text: '',
      style: textConfig
    }).setWordWrapWidth(this.textMaxWidth).setVisible(false);
    return this.textObject;
  }

  showNewPhoneMessage() {
    this.showDialogPhoneMessage();
    this.eventsManager.emit('dialog-mode-phone-messages', this.lines[this.currentIndex]);
  }

  showNextLine(): void {
    if (this.currentIndex < this.lines.length) {
      const nextIndex = this.currentIndex + 1; // Get the index of the next line
      if (this.currentIndex >= this.lines.length) {
        this.eventsManager.emit('text-finished-scrolling');
        return;
      }

      const currentLine = this.lines[this.currentIndex]; // Get the current line
      const nextLine = this.lines[nextIndex]; // Get the next line
      this.nextLineIsPhone = nextLine.dialogMode === 'phoneMessage';
      this.nextLineIsScrolling = nextLine.dialogMode === 'scrollingText';
      this.hudSceneBottom.hideArrow(); // Hide the arrow when a new line starts typing
      this.textObject?.setText('');

      if (currentLine.sound) {
        this.scene.sound.play(currentLine.sound);
      }
      let charIndex = 0;
      if (currentLine.dialogMode === 'phoneMessage') {
        this.showNewPhoneMessage();
      } else if (currentLine.dialogMode === 'scrollingText') {
        // Continue normally for scrolling text
        this.typing = this.scene.time.addEvent({
          delay: this.typeSpeed,
          callback: () => {
            this.textObject?.setText(this.textObject?.text + nextLine.content[charIndex]);
            charIndex++;
            if (charIndex === nextLine.content.length) {
              this.currentIndex = nextIndex;
              this.typing = null;
              if (this.currentIndex === this.lines.length) {
                this.eventsManager.emit('text-finished-scrolling');
              } else {
                // Show the arrow when the line is finished typing
                this.hudSceneBottom.showArrow();
              }
            }
          },
          repeat: nextLine.content.length - 1
        });
        this.textObject?.setVisible(true);
      }
    }
  }

  private showDialogPhoneMessage() {
    const { width, height } = this.scene.sys.game.canvas;
    this.scene.stateMachine.state.phone.showPhone('sms-app', width, height, this.scene, () => {
      // TODO: abstract the container into a config
      const { key, container: wallpaper } = this.scene.graphicsHandler.createContainer(width / 4.23, 766, 1, 0, 0);
      this.scene.graphicsHandler.createGradient(key, this.scene.stateMachine.state.phone.smsAppBackgroundGradient);
      wallpaper.setDepth(this.scene.layerManager.topMostLayer);
      wallpaper.setPosition(458, 172);

      const {
        key: headerKey,
        container: header
      } = this.scene.graphicsHandler.createContainer(wallpaper.width - 7, 82, 1, 4, 0.5);

      const {
        key: sendIconContainerKey,
        container: sendIconContainer
      } = this.scene.graphicsHandler.createContainer(60, 45, 1, wallpaper.width - 80, wallpaper.height - 60);
      this.scene.graphicsHandler.createEmptyRectangle(key, wallpaper.width - (sendIconContainer.width * 1.8), 45, 15, wallpaper.height - 60, BLACK_HEX, 1);
      const sendIcon = this.scene.add.sprite(3 + sendIconContainer.width / 2, sendIconContainer.height / 2, 'send_icon');

      this.scene.graphicsHandler.createGradient(headerKey, this.scene.stateMachine.state.phone.greenRectangle);
      this.scene.graphicsHandler.createGradient(sendIconContainerKey, this.scene.stateMachine.state.phone.greenRectangle, 'roundedRect');

      const topLine = this.scene.add.rectangle(
        wallpaper.width / 2,
        80,
        wallpaper.width,
        10, // Adjust this value to change the line thickness
        BLACK_HEX
      );

      const horizontalLineRight = this.scene.add.rectangle(
        wallpaper.width,
        (wallpaper.height / 2) + 3,
        7,
        wallpaper.height + 7,
        BLACK_HEX
      );
      //
      const horizontalLineLeft = this.scene.add.rectangle(
        0,
        (wallpaper.height / 2) + 3,
        7,
        wallpaper.height + 7,
        BLACK_HEX
      );


      const bottomLine = this.scene.add.rectangle(
        wallpaper.width / 2,
        wallpaper.height + 3,
        wallpaper.width + 3,
        7,
        BLACK_HEX
      );

      const sendAreaLine = this.scene.add.rectangle(
        wallpaper.width / 2,
        680,
        wallpaper.width + 3,
        2,
        BLACK_HEX
      );
      const line = this.lines[this.currentIndex];
      // TODO: abstract character creation
      const contact: Character = this.scene.stateMachine.state[line.speaker];

      const contactName = this.scene.make.text({
        x: 22 + wallpaper.width / 2,
        y: (header.height / 2) - 25,
        text: contact.stats.name,
        style: SMS_HEADER_CONFIG
      }).setWordWrapWidth(wallpaper.width / 2, true);

      const contactNumber = this.scene.make.text({
        x: wallpaper.width / 2,
        y: (header.height / 2) + contactName.height - 25,
        text: contact.stats.phone_no,
        style: TEXT_MESSAGE_CONTACT_NUMBER_CONFIG
      }).setWordWrapWidth(wallpaper.width / 2, true);

      const contactIcon = this.scene.add.sprite(header.width - 50, (header.height / 2) - 5, contact.stats.icon);
      const arrow = this.scene.add.sprite(0, 0, 'arrow_back');
      arrow.setPosition(arrow.width / 3, (header.height / 2));
      arrow.setInteractive();

      const appName = this.scene.make.text({
        x: arrow.width / 2,
        y: 5 + (arrow.y / 2),
        text: this.scene.stateMachine.state.phone.phoneApp('sms-app')?.name ?? '',
        style: SMS_HEADER_CONFIG
      }).setWordWrapWidth(wallpaper.width / 2, true);
      appName.setInteractive();
      arrow.on('pointerover', () => {
        arrow.setTintFill(HOVER_COLOR_HEX, HOVER_COLOR_HEX, HOVER_COLOR_HEX, HOVER_COLOR_HEX);
        this.scene.game.canvas.style.cursor = 'pointer';
      });
      appName.on('pointerover', () => {
        arrow.setTintFill(HOVER_COLOR_HEX, HOVER_COLOR_HEX, HOVER_COLOR_HEX, HOVER_COLOR_HEX);
        this.scene.game.canvas.style.cursor = 'pointer';
      });

      arrow.on('pointerout', () => {
        arrow.clearTint();
        appName.setColor(BLACK_TEXT_COLOR);
        appName.clearTint(); // BLACK_TEXT_COLOR
        this.scene.game.canvas.style.cursor = 'default';
      });
      appName.on('pointerout', () => {
        arrow.clearTint();
        appName.setColor(BLACK_TEXT_COLOR);
        appName.clearTint();
        this.scene.game.canvas.style.cursor = 'default';
      });
      sendIcon.on('pointerover', () => {
        sendIcon.setTintFill(HOVER_COLOR_HEX, HOVER_COLOR_HEX, HOVER_COLOR_HEX, HOVER_COLOR_HEX);
        this.scene.game.canvas.style.cursor = 'pointer';
      });
      sendIcon.on('pointerout', () => {
        sendIcon.clearTint();
        this.scene.game.canvas.style.cursor = 'default';
      });

      contactIcon.setScale(0.35);
      sendIcon.setScale(0.35);
      sendIcon.setInteractive();
      arrow.setScale(0.4);
      this.scene.layerManager.setObjectDepth(header);
      wallpaper.add(topLine);
      wallpaper.add(horizontalLineRight);
      wallpaper.add(horizontalLineLeft);
      wallpaper.add(bottomLine);
      header.add(contactName);
      header.add(contactNumber);
      header.add(contactIcon);
      header.add(appName);
      header.add(arrow);
      wallpaper.add(header);
      wallpaper.add(sendAreaLine);
      sendIconContainer.add(sendIcon);
      wallpaper.add(sendIconContainer);
      this.scene.stateMachine.state.phone.addMessageToConversation(contact, line.speaker, line.content, this.scene.stateMachine.state.time, true);

      const currentConv = this.scene.stateMachine.state.phone.conversations[contact.stats.id];

      const leftHorizontalLine = this.scene.add.rectangle(
        wallpaper.width / 4.5,
        header.y + header.height + 20,
        wallpaper.width / 4,
        1,
        IDLE_COLOR_HEX
      );

      const rightHorizontalLine = this.scene.add.rectangle(
        wallpaper.width - 65,
        header.y + header.height + 20,
        wallpaper.width / 4,
        1,
        IDLE_COLOR_HEX
      );


      const currentTimeStampText = this.scene.make.text({
        x: (wallpaper.width / 3) + 18,
        y: header.y + header.height + 8,
        text: currentConv.time,
        style: TEXT_TIMESTAMP_CONFIG
      });


      wallpaper.add(leftHorizontalLine);
      wallpaper.add(currentTimeStampText);
      wallpaper.add(rightHorizontalLine);
      currentConv.messages.forEach((message, index) => {
        if (!message.text) {
          return;
        }

        let x = (wallpaper.width / 2) - 15;
        const { container: magicalContainer } = this.scene.graphicsHandler.createContainer(wallpaper.width - 7, 82, 1, 20);
        let y = 0;
        let backgroundTexture = 'incoming-text';
        if (message.who !== 'player') {
          const icon = this.scene.add.circle(wallpaper.width / 15, wallpaper.height / 5, 20, 0xFFFFFF);
          const contactIcon = this.scene.add.sprite(icon.x, icon.y, contact.stats.icon);
          contactIcon.setScale(.35);
          magicalContainer.add(icon);
          magicalContainer.add(contactIcon);
          y = icon.y;
        }
        if (message.who === 'player') {
          x = x + 50;
          y = 0;
          backgroundTexture = 'outgoing-text';
        }
        const smsBackground = this.scene.add.image(x, y + 50, backgroundTexture);
        smsBackground.setSize(10, 10);
        magicalContainer.add(smsBackground);

        const textSomething = this.scene.make.text({
          x: magicalContainer.width / 6,
          y,
          text: message.text,
          style: TEXT_MESSAGE_CONTACT_NUMBER_CONFIG
        }).setWordWrapWidth(wallpaper.width / 2, true);
        magicalContainer.add(textSomething);
        wallpaper.add(magicalContainer);
      });
    });
  }

  finishLine(): void {
    if (this.typing) {
      this.scene.sound.stopAll();
      return;
    } else if (this.currentIndex < this.lines.length) {
      this.showNextLine();
    }

    if (this.currentIndex === this.lines.length) {
      this.eventsManager.emit('text-finished-scrolling');
    }
  }

  skipLine(): void {
    let line = this.lines[this.currentIndex];
    if (this.typing) {
      this.scene.sound.stopAll();
      // User skipped a line that was being typed
      this.textObject?.setText(line.content);
      this.typing.destroy();
      this.typing = null;
      this.currentIndex++;
      if (this.currentIndex === this.lines.length) {
        this.eventsManager.emit('text-finished-scrolling');
      } else {
        // Show the arrow if the line was skipped
        this.hudSceneBottom.showArrow();
      }
    } else if (this.currentIndex < this.lines.length) {
      this.showNextLine();
    }
  }


  updateTextPosition(x: number, y: number): void {
    if (this.textObject) {
      this.textObject.setPosition(x, y);
    }
  }
}

export default TextHandler;
