const locationSource = 'AnotherChance/public/assets/images/locations';

export const configuration = {
  'title': 'Bedroom',
  'background': `${locationSource}/home/bedroom/bedroom.webp`,
  'stateVariables': {
    'alarm': 'beeping',
    'flash_drive_taken': false,
    'clean': false,
    'poster_removed': false,
    'king_of_sweets': false,
    'night': false,
    'small_pc': null,
    'dollar1_spawned_today': false,
    'dollar1_taken_today': false,
    'dollar2_spawned_today': false,
    'dollar2_taken_today': false,
    'dollar3_spawned_today': false,
    'dollar3_taken_today': false,
    'book_taken': false
  },
  dynamicAssets: [
    {
      name: 'door',
      conditionType: 'simple',
      conditions: {},
      src: `${locationSource}/home/bedroom/door.webp`,
      position: [736, 395],
      actions: [
         {
           go: {
             to: 'Bathroom',
             condition: {},
           },
           interact: {
             dependsOn: 'focusedQuest', // In quest system -> focusedQuest
             condition: {
               focusedOn: ['kate_blowjob_dream'],
               focusedQuestStep: ['open_door'],
             },
             event: 'home_bedroom_door_interact_kate_blowjob_dream_open_door',
             name: 'Open Door'
           }
        }
      ]
      /**
       *      if mc["focus"]:
       *         if mc["focus"] == "kate_blowjob_dream":
       *           elif quest.kate_blowjob_dream == "get_dressed":
       *             actions.append(["go","Hallway","?home_bedroom_door_interact_kate_blowjob_dream_get_dressed"])
       *             return
       *           elif quest.kate_blowjob_dream == "school":
       *             actions.append(["go","Hallway","goto_home_hall"])
       *           elif quest.kate_blowjob_dream == "alarm":
       *             actions.append(["go","Hallway","?home_bedroom_door_interact_kate_blowjob_dream_alarm"])
       *             return
       *         elif mc["focus"] == "flora_bonsai":
       *           if quest.flora_bonsai == "water" and not quest.flora_bonsai['water_prompt']:
       *             actions.append(["go","Hallway","quest_flora_bonsai_water_prompt"])
       *         elif mc["focus"] == "jacklyn_statement":
       *           if quest.jacklyn_statement == "clothes":
       *             actions.append(["go","Hallway","?home_bedroom_door_jacklyn_statement_clothes"])
       *             return
       *         elif mc["focus"] == "mrsl_table":
       *           if quest.mrsl_table == "morning":
       *             actions.append(["go","Hallway","goto_home_hall"])
       *         elif mc["focus"] == "isabelle_locker":
       *           if quest.isabelle_locker in ("bedroom","email","wait"):
       *             actions.append(["go","Hallway","?quest_isabelle_locker_home_bedroom_door"])
       *             return
       *         elif mc["focus"] == "lindsey_piano":
       *           if quest.lindsey_piano == "listen_bedroom":
       *             if quest.lindsey_piano["lindsey_arrived"]:
       *               actions.append(["go","Hallway","?quest_lindsey_piano_listen_bedroom_door_leave"])
       *             else:
       *               actions.append(["interact","Open Door","quest_lindsey_piano_listen_bedroom_door"])
       *             return
       *         elif mc["focus"] == "kate_moment":
       *           if quest.kate_moment == "fun" and game.hour == 19:
       *             actions.append(["go","Hallway","?quest_kate_moment_fun_door"])
       *             return       */
    },
    {
      name: 'drawers',
      conditionType: 'simple',
      conditions: {},
      src: `${locationSource}/home/bedroom/drawers.webp`,
      position: [1419, 658]
    },
    {
      name: 'bookshelve_left',
      conditionType: 'simple',
      conditions: {},
      src: `${locationSource}/home/bedroom/bookshelve_left.webp`,
      position: [135, 359]
    },
    {
      name: 'colored_walls',
      conditionType: 'simple',
      conditions: { clean: true },
      src: `${locationSource}/home/bedroom/colored_walls.webp`,
      position: [0, 0]
    },
    {
      name: 'painting',
      conditionType: 'simple',
      conditions: { clean: true },
      src: `${locationSource}/home/bedroom/painting.webp`,
      position: [197, 150]
    },
    // King of Sweets poster, based on cleanliness and whether the poster was removed
    {
      name: 'king_of_sweets_wall',
      conditionType: 'simple',
      conditions: { clean: false, poster_removed: true },
      src: `AnotherChance/src/public/assets/images//locations/home/bedroom/king_of_sweets_wall.webp`,
      position: [162, 102]
    },
    {
      name: 'king_of_sweets_poster',
      conditionType: 'simple',
      conditions: { king_of_sweets: true },
      src: `${locationSource}/home/bedroom/king_of_sweets.webp`,
      position: [214, 152]
    },
    // Closet variations based on cleanliness
    {
      name: 'closet_clean',
      conditionType: 'simple',
      conditions: { clean: true },
      src: `${locationSource}/home/bedroom/closet_clean.webp`,
      position: [943, 332]
    },
    {
      name: 'closet2_clean',
      conditionType: 'simple',
      conditions: { clean: true },
      src: `${locationSource}/home/bedroom/closet2_clean.webp`,
      position: [1187, 238]
    },
    {
      name: 'closet',
      conditions: { clean: false },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/closet.webp`,
      position: [943, 332]
    },
    {
      name: 'bed',
      conditionType: 'simple',
      conditions: [
        {
          clean: true,
          src: `${locationSource}/home/bedroom/bed_clean.webp`,
        },
        {
          clean: false,
          src: `${locationSource}/home/bedroom/bed.webp`,
        },
      ],
      position: [315, 533]
    },
    // Carpet variations based on cleanliness
    {
      name: 'carpet_clean',
      conditions: { clean: true },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/carpet_clean.webp`,
      position: [255, 742]
    },
    {
      name: 'carpet',
      conditions: { clean: false },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/carpet.webp`,
      position: [255, 742]
    },
    // Desk variations based on cleanliness
    {
      name: 'desk_clean',
      conditions: { clean: true },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/desk_clean.webp`,
      position: [1060, 621]
    },
    {
      name: 'desk',
      conditions: { clean: false },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/desk.webp`,
      position: [1060, 564]
    },
    // TV and controller, variations based on cleanliness and if the controller is taken
    {
      name: 'tv_clean',
      conditions: { clean: true },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/tv_clean.webp`,
      position: [148, 628]
    },
    {
      name: 'tv',
      conditions: { clean: false },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/tv.webp`,
      position: [148, 628]
    },
    {
      name: 'controller_clean',
      conditions: { clean: true, controller_taken: false },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/controller_clean.webp`,
      position: [271, 801]
    },
    {
      name: 'controller',
      conditions: { clean: false, controller_taken: false },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/controller.webp`,
      position: [280, 726]
    },
    // Alarm condition based on quest progress and cleanliness
    {
      name: 'alarm',
      conditionType: 'complex',
      conditions: [
        {
          clean: true,
          needQuest: false,
          src: `${locationSource}/home/bedroom/ornamental_box.webp`,
          position: [310, 721]
        },
        {
          clean: false,
          needQuest: true,
          questNames: ['kate_blowjob_dream'],
          questIn: ['flora_knocking', 'open_door', 'get_dressed', 'school', 'awake', 'alarm'],
          stateVariables: [{ alarm: ['beeping', 'off'] }],
          src: `${locationSource}/home/bedroom/alarm.webp`,
          position: [305, 704]
        },
        {
          clean: false,
          needQuest: false,
          questIn: ['flora_knocking', 'open_door', 'get_dressed', 'school', 'awake', 'alarm'],
          stateVariables: [{ alarm: ['smashed', 'smashed_again'] }],
          src: `${locationSource}/home/bedroom/alarm_broken.webp`,
          position: [306, 698]
        }
      ]
    },
    {
      name: 'alarm_broken',
      conditions: { alarm: ['smashed', 'smashed_again'], clean: false },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/alarm_broken.webp`,
      position: [306, 698]
    },
    {
      name: 'bookshelves_right',
      conditions: {},
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/bookshelves_right.webp`,
      position: [1330, 32]
    },
    // Additional assets like table lamp, statuettes, and small_pc always present
    {
      name: 'table_lamp',
      conditionType: 'simple',
      conditions: {
        clean: true,
      },
      src: `${locationSource}/home/bedroom/table_lamp.webp`,
      position: [1554, 498]
    },
    {
      name: 'statuettes',
      conditionType: 'simple',
      conditions: { clean: false },
      src: `${locationSource}/home/bedroom/statuettes.webp`,
      position: [1534, 469]
    },
    {
      name: 'small_pc',
      conditionType: 'simple',
      conditions: {},
      src: `${locationSource}/home/bedroom/small_pc.webp`,
      position: [1143, 485]
    },
    // Sugarcubes visible under certain quest conditions
    {
      name: 'sugarcube5',
      conditionType: 'simple',
      conditions: { season: 1, sugarcube5_taken: false },
      src: `${locationSource}/home/bedroom/sugarcube5.webp`,
      position: [1118, 679]
    },
    {
      name: 'vhsplayer',
      conditions: { vhs: true },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/vhsplayer.webp`,
      position: [1353, 598]
    },
    {
      name: 'lindsey',
      conditions: { lindsey_present: true, lindsey_talking: false },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/lindsey.webp`,
      position: [465, 548]
    },
    {
      name: 'isabelle',
      conditions: { isabelle_present: true, isabelle_talking: false, season: 1 },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/isabelle.webp`,
      position: [901, 411]
    },
    {
      name: 'isabelle_autumn',
      conditionType: 'simple',
      conditions: { isabelle_present: true, isabelle_talking: false, season: 2 },
      src: `${locationSource}/home/bedroom/isabelle_autumn.webp`,
      position: [898, 411]
    },
    {
      name: 'maxine',
      conditionType: 'simple',
      conditions: { maxine_present: true, maxine_talking: false },
      src: `${locationSource}/home/bedroom/maxine.webp`,
      position: [526, 684]
    },
    {
      name: 'ouijaboard',
      conditionType: 'simple',
      conditions: { maxine_present: true },
      src: `${locationSource}/home/bedroom/ouijaboard.webp`,
      position: [471, 817]
    },
    {
      name: 'potted_plant',
      conditionType: 'simple',
      conditions: { clean: true },
      src: `${locationSource}/home/bedroom/potted_plant.webp`,
      position: [99, 725]
    },
    {
      name: 'pillow',
      conditionType: 'simple',
      conditions: { clean: false },
      src: `${locationSource}/home/bedroom/pillow.webp`,
      position: [669, 722]
    },
    {
      name: 'pizza_box',
      conditionType: 'simple',
      conditions: { clean: false },
      src: `${locationSource}/home/bedroom/pizza_box.webp`,
      position: [475, 832]
    },
    {
      name: 'spinach',
      conditionType: 'simple',
      conditions: { spinach_licking: true, spinach_talking: false },
      src: `${locationSource}/home/bedroom/spinach.webp`, // TODO this is actually complex conditions
      position: [629, 712]
    },
    {
      name: 'dollar1',
      conditionType: 'simple',
      conditions: { dollar1_spawned_today: true, dollar1_taken_today: false },
      src: `${locationSource}/home/bedroom/dollar1.webp`,
      position: [350, 566]
    },
    {
      name: 'dollar2',
      conditionType: 'simple',
      conditions: { dollar2_spawned_today: true, dollar2_taken_today: false },
      src: `${locationSource}/home/bedroom/dollar2.webp`,
      position: [1609, 521]
    },
    {
      name: 'dollar3',
      conditionType: 'simple',
      conditions: { dollar3_spawned_today: true, dollar3_taken_today: false },
      src: `${locationSource}/home/bedroom/dollar3.webp`,
      position: [1765, 356]
    },
    {
      name: 'book',
      conditionType: 'simple',
      conditions: { book_taken: false },
      src: `${locationSource}/home/bedroom/book.webp`,
      position: [231, 416]
    },
    {
      name: 'suit',
      conditions: { jacklyn_romance: 'suit_done' },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/suit.webp`, // TODO: modify to complex condition!
      position: [1221, 599]
    },
    {
      name: 'night_overlay',
      conditions: { night: true },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/overlay_night.webp`,
      position: [-16, -10]
    },
    {
      name: 'small_pc_google',
      conditionType: 'simple',
      conditions: { small_pc: 'google' },
      src: `${locationSource}/home/bedroom/small_pc_google.webp`,
      position: [1159, 502]
    },
    {
      name: 'small_pc_wikipedia',
      conditionType: 'simple',
      conditions: { small_pc: 'wikipedia' },
      src: `${locationSource}/home/bedroom/small_pc_wikipedia.webp`,
      position: [1159, 502]
    },
    // Flash Drive, visible if not taken
    {
      name: 'flash_drive',
      conditions: { flash_drive_taken: false },
      conditionType: 'simple',
      src: `${locationSource}/home/bedroom/flash_drive.webp`,
      position: [1511, 650]
    },
  ]
}

