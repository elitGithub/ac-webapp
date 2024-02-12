export const DEBUG = true; // This should depend on the environment
export const COLUMNS = 12; // This denotes how we assume the screen is split.
export const HEADER_FONT_SIZE = '1.5rem';
export const BUTTON_FONT_SIZE = '2rem';
export const LIGHT_FONT = 'ComicHelvetic_Light';
export const MEDIUM_FONT = 'ComicHelvetic_Medium';

export const SMS_HEADER_COLOR = '#0acc4a';
export const SMS_HEADER_COLOR_HEX = 0x0ACC4A;
export const SMS_HEADER_COLOR_LINDSEY = '#1B90F9';
export const BLACK_TEXT_COLOR = '#151515';
export const BLACK_HEX = 0x151515;

export const BUTTON_TEXT_COLOR = '#694E33';
export const ACCENT_COLOR = '#0099cc';
export const IDLE_COLOR = '#888888';
export const IDLE_COLOR_HEX= 0x888888;
export const IDLE_SMALL_COLOR = '#aaaaaa';
export const BLACK_COLOR_HEX = 0xaaaaaa;
export const HOVER_COLOR = '#66c1e0';
export const HOVER_COLOR_HEX = 0x66c1e0ff;
export const SELECTED_COLOR = '#ffffff';
export const INSENSITIVE_COLOR = '#8888887f';
export const INSENSITIVE_COLOR_HEX = 0x8888887f;
export const MUTED_COLOR = '#003d51';
export const HOVER_MUTED_COLOR = '#005b7a';
export const TEXT_COLOR = '#ffffff';
export const WHITE_COLOR = '#ffffff';
export const WHITE_COLOR_HEX = 0xeeeeee;
export const GAME_FONT_SIZE = '2.5rem';

export const TEXT_WRITE_SPEED = 20;
export const GAME_HEIGHT = 1080;
export const GAME_WIDTH = 1920;
export const ONE_SIXTH = 1 / 6;

export const MAIN_MENU_BUTTONS: Phaser.Types.GameObjects.Text.TextStyle = {
    fontFamily: LIGHT_FONT,
    fontSize: BUTTON_FONT_SIZE,
    color: BUTTON_TEXT_COLOR,
    stroke: BLACK_TEXT_COLOR,
    align: 'center',
};

export const ROLLING_TEXT_CONFIG: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: GAME_FONT_SIZE,
    fontFamily: MEDIUM_FONT,
    color: WHITE_COLOR,
    stroke: BUTTON_TEXT_COLOR,
    strokeThickness: 3,
};

export const SMS_HEADER_CONFIG: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: HEADER_FONT_SIZE,
    fontFamily: LIGHT_FONT,
    color: BLACK_TEXT_COLOR,
    stroke: BLACK_TEXT_COLOR,
    strokeThickness: 1
}

export const TEXT_MESSAGE_CONTACT_NUMBER_CONFIG: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '1rem',
    fontFamily: LIGHT_FONT,
    color: BLACK_TEXT_COLOR,
};

export const TEXT_TIMESTAMP_CONFIG: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '1.3rem',
    fontFamily: MEDIUM_FONT,
    color: IDLE_COLOR,
};

export const TIME_OF_DAY_NAME = [
    "night",
    "night",
    "night",
    "night",
    "night",
    "night",
    "night",
    "day",
    "day",
    "day",
    "day",
    "day",
    "day",
    "day",
    "day",
    "day",
    "day",
    "day",
    "day",
    "day",
    "day",
    "day",
    "night",
    "night",
];

export const DAY_OF_WEEK_NAME = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

export const DAY_OF_WEEK_SHORT = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
];
