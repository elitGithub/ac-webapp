const locationSource = 'AnotherChance/public/assets/images/locations'

export const configuration = {
    'title': 'Bedroom',
    'background': `${ locationSource }/home/bedroom/bedroom.webp`,
    'stateVariables': {
        'alarm': 'beeping',
        'flash_drive_taken': false,
        'clean': false,
        'courage_badge': false,
        'poster_removed': false,
        'king_of_sweets': false,
        'capture_card': false,
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
            src: `${ locationSource }/home/bedroom/door.webp`,
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
        },
        {
            name: 'bed',
            conditionType: 'simple',
            conditions: [
                {
                    clean: true,
                    src: `${ locationSource }/home/bedroom/bed_clean.webp`,
                },
                {
                    clean: false,
                    src: `${ locationSource }/home/bedroom/bed.webp`,
                },
            ],
            position: [315, 533],
            actions: [
                {
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
        },
        {
            name: 'carpet',
            conditionType: 'simple',
            conditions: [
                {
                    clean: true,
                    src: `${ locationSource }/home/bedroom/carpet_clean.webp`,
                },
                {
                    clean: false,
                    src: `${ locationSource }/home/bedroom/carpet_clean.webp`,
                },
            ],
            position: [255, 742]
        },
        {
            name: 'drawers',
            conditionType: 'simple',
            conditions: {},
            src: `${ locationSource }/home/bedroom/drawers.webp`,
            position: [1419, 658]
        },
        {
            name: 'bookshelve_left',
            conditionType: 'simple',
            conditions: {},
            src: `${ locationSource }/home/bedroom/bookshelve_left.webp`,
            position: [135, 359]
        },
        {
            name: 'colored_walls',
            conditionType: 'simple',
            conditions: { clean: true },
            src: `${ locationSource }/home/bedroom/colored_walls.webp`,
            position: [0, 0]
        },
        {
            name: 'painting',
            conditionType: 'simple',
            conditions: { clean: true },
            src: `${ locationSource }/home/bedroom/painting.webp`,
            position: [197, 150]
        },
        // King of Sweets poster, based on cleanliness and whether the poster was removed
        {
            name: 'king_of_sweets_wall',
            conditionType: 'simple',
            conditions: { clean: false, poster_removed: true },
            src: `AnotherChance/public/assets/images/locations/home/bedroom/king_of_sweets_wall.webp`,
            position: [162, 102]
        },
        {
            name: 'king_of_sweets_poster',
            conditionType: 'simple',
            conditions: { clean: false, king_of_sweets: true },
            src: `${ locationSource }/home/bedroom/king_of_sweets.webp`,
            position: [214, 152]
        },
        // Closet variations based on cleanliness
        {
            name: 'closet_clean',
            conditionType: 'simple',
            conditions: { clean: true },
            src: `${ locationSource }/home/bedroom/closet_clean.webp`,
            position: [943, 332]
        },
        {
            name: 'closet2_clean',
            conditionType: 'simple',
            conditions: { clean: true },
            src: `${ locationSource }/home/bedroom/closet2_clean.webp`,
            position: [1187, 238]
        },
        {
            name: 'capture_card_on',
            conditionType: 'simple',
            conditions: { capture_card: true },
            src: `${ locationSource }/home/bedroom/capture_card_on.webp`,
            position: [1158, 502]
            //         scene.append([(1158,502),"home bedroom capture_card_on",("home_bedroom_computer",0,-17)])
        },
        {
            name: 'wire_vhs',
            conditionType: 'simple',
            conditions: { capture_card: true },
            src: `${ locationSource }/home/bedroom/wire_vhs.webp`,
            position: [1241, 591]
        },
        {
            name: 'closet',
            conditions: { clean: false },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/closet.webp`,
            position: [943, 332]
        },
        // Desk variations based on cleanliness
        {
            name: 'desk_clean',
            conditions: { clean: true },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/desk_clean.webp`,
            position: [1060, 621]
        },
        {
            name: 'desk',
            conditions: { clean: false },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/desk.webp`,
            position: [1060, 564]
        },
        {
            name: 'sports_magazine',
            conditions: { clean: true },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/sports_magazine.webp`,
            position: [77, 909]
        },
        {
            name: 'clothes',
            conditions: { clean: false },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/clothes.webp`,
            position: [897, 848]
        },
        {
            name: 'porn_magazine',
            conditions: { clean: false },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/porn_magazine.webp`,
            position: [77, 909]
        },
        {
            name: 'badge',
            conditions: { courage_badge: true },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/badge.webp`,
            position: [307, 435]
        },
        // TV and controller, variations based on cleanliness and if the controller is taken
        {
            name: 'tv_clean',
            conditions: { clean: true },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/tv_clean.webp`,
            position: [148, 628]
        },
        {
            name: 'tv',
            conditions: { clean: false },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/tv.webp`,
            position: [148, 628]
        },
        {
            name: 'controller_clean',
            conditions: { clean: true, controller_taken: false },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/controller_clean.webp`,
            position: [271, 801]
        },
        {
            name: 'controller',
            conditions: { clean: false, controller_taken: false },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/controller.webp`,
            position: [280, 726]
        },
        {
            name: 'ornamental_box',
            conditionType: 'simple',
            conditions: { clean: true },
            src: `${ locationSource }/home/bedroom/ornamental_box.webp`,
            position: [310, 721]
        },
        // Alarm condition based on quest progress and cleanliness
        {
            name: 'alarm',
            title: [
                {
                    questNames: ['kate_blowjob_dream'],
                    needQuest: true,
                    questIn: ['flora_knocking', 'open_door', 'get_dressed', 'school', 'awake', 'alarm'],
                    stateVariables: [{ 'alarm': ['smashed', 'beeping', 'off'] }],
                    label: 'Alarm'
                },
                {
                    questNames: [],
                    needQuest: false,
                    stateVariables: [{ 'alarm': ['smashed', 'smashed_again'] }],
                    label: 'Broken Alarm'
                },
                {
                    questNames: [],
                    needQuest: false,
                    stateVariables: [{ 'alarm': ['beeping', 'off'] }],
                    label: 'Alarm'
                }
            ],
            conditionType: 'complex',
            conditions: [
                {
                    needQuest: true,
                    questNames: ['kate_blowjob_dream'],
                    questIn: ['flora_knocking', 'open_door', 'get_dressed', 'school', 'awake', 'alarm'],
                    stateVariables: [{ clean: false }],
                    src: `${ locationSource }/home/bedroom/alarm.webp`,
                    position: [305, 704]
                },
                {
                    needQuest: false,
                    questNames: [],
                    questIn: [],
                    stateVariables: [{ alarm: ['smashed', 'smashed_again'],  clean: false }],
                    src: `${ locationSource }/home/bedroom/alarm_broken.webp`,
                    position: [306, 698]
                },
                {
                    needQuest: false,
                    questNames: [],
                    questIn: [],
                    stateVariables: [{ clean: false }],
                    src: `${ locationSource }/home/bedroom/alarm.webp`,
                    position: [305, 704]
                }
            ],
            description: [
                {
                    questNames: ['kate_blowjob_dream', 'mrsl_table'],
                    needQuest: true,
                    questIn: ['open_door', 'get_dressed', 'school', 'morning'],
                    text: {
                        chooseFrom: {
                            quest_lines: 'q_kate_blowjob_dream_investigate_lines'
                        }
                    }
                },
                {
                    questNames: ['kate_blowjob_dream'],
                    needQuest: true,
                    questIn: ['alarm'],
                    text: 'Hell\'s Siren. Condemned to the eternal pits by the trumpets of heaven. A fate worse than death.'
                },
                {
                    questNames: ['kate_blowjob_dream'],
                    needQuest: true,
                    questIn: ['courage_badge'],
                    stateVariables: [
                        { alarm: ['off', 'smashed', 'beeping'] },
                    ],
                    text: [
                        'It\'s a clock. A new one.\n\n...\n\nWait, a new one?',
                        'The past does not exist. Nor does the future. There is only the now.',
                        '*BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP*'
                    ]
                },
                {
                    questNames: ['back_to_school_special'],
                    needQuest: true,
                    text: '"Although the most acute judges of the watches, and even the watches themselves, were convinced of the guilt of watchery; the guilt was nevertheless non-existent. It is thus with all guilt."'
                },
                {
                    questNames: ['dress_to_the_nine'],
                    needQuest: true,
                    stateVariables: [
                        { alarm: ['smashed', 'off'] },
                    ],
                    text: [
                        'The vanquished foe lies shattered and broken on the field of glory... also known as, my nightstand.',
                        'A vile device of torture. Tested on the innocent and unsuspecting, time and time again.'
                    ]
                },
                {
                    questNames: ['smash_or_pass'],
                    needQuest: true,
                    stateVariables: [
                        { alarm: ['smashed', 'off'] },
                    ],
                    text: [
                        'I should\'ve sent this vile machine to the shadow realm ages ago. At least, it won\'t bother me again.',
                        'Finally, some peace and quiet. More sleep!'
                    ]
                },
                {
                    questNames: [],
                    needQuest: false,
                    stateVariables: [
                        { alarm: 'beeping' }
                    ],
                    text: '*BEEP BEEP BEEP BEEP BEEP BEEP BEEP BEEP!*'
                }
            ],
            actions: [
                {
                    interact: {
                        dependsOn: 'focusedQuest', // This is to indicate that interactions depend on the quest system.
                        actions: [
                            {
                                condition: {
                                    focusedOn: ['kate_blowjob_dream'],
                                    focusedQuestStep: ['open_door', 'get_dressed', 'school'],
                                },
                                event: 'kate_blowjob_dream_random_interact',
                                name: 'Interact Randomly in Dream'
                            },
                            {
                                condition: {
                                    focusedOn: ['kate_blowjob_dream'],
                                    focusedQuestStep: ['alarm'],
                                    stateVariables: { 'alarm': 'smashed' }
                                },
                                event: 'home_bedroom_alarm_interact_kate_blowjob_dream_alarm_smashed_again',
                                name: 'Smashed Alarm in Dream'
                            },
                            {
                                condition: {
                                    focusedOn: ['kate_blowjob_dream'],
                                    focusedQuestStep: ['alarm'],
                                    stateVariables: { 'alarm': ['off', 'beeping'] }
                                },
                                event: 'home_bedroom_alarm_interact_kate_blowjob_dream_alarm_off_again',
                                name: 'Alarm Off/Beeping in Dream'
                            },
                            {
                                condition: {
                                    focusedOn: ['mrsl_table'],
                                    focusedQuestStep: ['morning'],
                                },
                                event: 'kate_blowjob_dream_random_interact',
                                name: 'Morning Interaction at Table'
                            },
                            {
                                condition: {
                                    questName: 'smash_or_pass',
                                    questStatus: 'started',
                                    stateVariables: { 'alarm': 'beeping' }
                                },
                                event: 'home_bedroom_alarm_interact_smash_or_pass_beeping',
                                name: 'Beeping Alarm During Smash or Pass'
                            },
                            {
                                condition: {
                                    questName: 'kate_blowjob_dream',
                                    questStatus: 'courage_badge',
                                    stateVariables: { 'alarm': 'beeping' }
                                },
                                event: '?home_bedroom_alarm_interact_kate_blowjob_dream_courage_badge_beeping',
                                name: 'Courage Badge Beeping Alarm Interaction'
                            },
                            {
                                condition: {
                                    questName: 'kate_blowjob_dream',
                                    questStatus: 'courage_badge',
                                    stateVariables: { 'alarm': 'off' }
                                },
                                event: '?home_bedroom_alarm_interact_kate_blowjob_dream_courage_badge_off',
                                name: 'Courage Badge Alarm Off Interaction'
                            },
                            {
                                condition: {
                                    questName: 'kate_blowjob_dream',
                                    questStatus: 'courage_badge',
                                    stateVariables: { 'alarm': 'smashed' }
                                },
                                event: '?home_bedroom_alarm_interact_kate_blowjob_dream_courage_badge_smashed',
                                name: 'Courage Badge Smashed Alarm Interaction'
                            },
                            {
                                condition: {
                                    questName: 'dress_to_the_nine',
                                    questStatus: 'started',
                                    stateVariables: { 'alarm': 'smashed' }
                                },
                                event: '?home_bedroom_alarm_interact_dress_to_the_nine_smashed',
                                name: 'Dress to the Nine Smashed Alarm Interaction'
                            },
                            {
                                condition: {
                                    questName: 'dress_to_the_nine',
                                    questStatus: 'started',
                                    stateVariables: { 'alarm': 'off' }
                                },
                                event: '?home_bedroom_alarm_interact_dress_to_the_nine_off',
                                name: 'Dress to the Nine Alarm Off Interaction'
                            },
                            {
                                condition: {
                                    questName: 'smash_or_pass',
                                    questStatus: 'ended',
                                    stateVariables: { 'alarm': 'smashed' }
                                },
                                event: '?home_bedroom_alarm_interact_smash_or_pass_smashed',
                                name: 'Smash or Pass Smashed Alarm Interaction'
                            },
                            {
                                condition: {
                                    questName: 'smash_or_pass',
                                    questStatus: 'ended',
                                    stateVariables: { 'alarm': 'off' }
                                },
                                event: '?home_bedroom_alarm_interact_smash_or_pass_off',
                                name: 'Smash or Pass Alarm Off Interaction'
                            }
                        ]
                    }
                }
            ]
        },
        {
            name: 'bookshelves_right',
            conditions: {},
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/bookshelves_right.webp`,
            position: [1330, 32]
        },
        // Additional assets like a table lamp, statuettes, and small_pc always present
        {
            name: 'table_lamp',
            conditionType: 'simple',
            conditions: {
                clean: true,
            },
            src: `${ locationSource }/home/bedroom/table_lamp.webp`,
            position: [1554, 498]
        },
        {
            name: 'statuettes',
            conditionType: 'simple',
            conditions: { clean: false },
            src: `${ locationSource }/home/bedroom/statuettes.webp`,
            position: [1534, 469]
        },
        {
            name: 'small_pc',
            conditionType: 'simple',
            conditions: {},
            src: `${ locationSource }/home/bedroom/small_pc.webp`,
            position: [1143, 485]
        },
        {
            name: 'chair',
            conditions: {},
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/chair.webp`,
            position: [1159, 600]
        },
        // Sugarcubes visible under certain quest conditions
        {
            name: 'sugarcube5',
            conditionType: 'simple',
            conditions: { season: 1, sugarcube5_taken: false },
            src: `${ locationSource }/home/bedroom/sugarcube5.webp`,
            position: [1118, 679]
        },
        {
            name: 'vhsplayer',
            conditions: { vhs: true },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/vhsplayer.webp`,
            position: [1353, 598]
        },
        {
            name: 'lindsey',
            conditions: { lindsey_present: true, lindsey_talking: false },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/lindsey.webp`,
            position: [465, 548]
        },
        {
            name: 'isabelle',
            conditions: { isabelle_present: true, isabelle_talking: false, season: 1 },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/isabelle.webp`,
            position: [901, 411]
        },
        {
            name: 'isabelle_autumn',
            conditionType: 'simple',
            conditions: { isabelle_present: true, isabelle_talking: false, season: 2 },
            src: `${ locationSource }/home/bedroom/isabelle_autumn.webp`,
            position: [898, 411]
        },
        {
            name: 'maxine',
            conditionType: 'simple',
            conditions: { maxine_present: true, maxine_talking: false },
            src: `${ locationSource }/home/bedroom/maxine.webp`,
            position: [526, 684]
        },
        {
            name: 'ouijaboard',
            conditionType: 'simple',
            conditions: { maxine_present: true },
            src: `${ locationSource }/home/bedroom/ouijaboard.webp`,
            position: [471, 817]
        },
        {
            name: 'potted_plant',
            conditionType: 'simple',
            conditions: { clean: true },
            src: `${ locationSource }/home/bedroom/potted_plant.webp`,
            position: [99, 725]
        },
        {
            name: 'dollar1',
            conditionType: 'simple',
            conditions: { dollar1_spawned_today: true, dollar1_taken_today: false },
            src: `${ locationSource }/home/bedroom/dollar1.webp`,
            position: [350, 566]
        },
        {
            name: 'dollar2',
            conditionType: 'simple',
            conditions: { dollar2_spawned_today: true, dollar2_taken_today: false },
            src: `${ locationSource }/home/bedroom/dollar2.webp`,
            position: [1609, 521]
        },
        {
            name: 'dollar3',
            conditionType: 'simple',
            conditions: { dollar3_spawned_today: true, dollar3_taken_today: false },
            src: `${ locationSource }/home/bedroom/dollar3.webp`,
            position: [1765, 356]
        },
        {
            name: 'book',
            conditionType: 'simple',
            conditions: { book_taken: false },
            src: `${ locationSource }/home/bedroom/book.webp`,
            position: [231, 416]
        },
        {
            name: 'suit',
            conditions: { jacklyn_romance: 'suit_done' },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/suit.webp`, // TODO: modify to complex condition!
            position: [1221, 599]
        },
        {
            name: 'night_overlay',
            conditions: { night: true },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/overlay_night.webp`,
            position: [-16, -10]
        },
        {
            name: 'small_pc_google',
            conditionType: 'simple',
            conditions: { small_pc: 'google' },
            src: `${ locationSource }/home/bedroom/small_pc_google.webp`,
            position: [1159, 502]
        },
        {
            name: 'small_pc_wikipedia',
            conditionType: 'simple',
            conditions: { small_pc: 'wikipedia' },
            src: `${ locationSource }/home/bedroom/small_pc_wikipedia.webp`,
            position: [1159, 502]
        },
        // Flash Drive, visible if not taken
        {
            name: 'flash_drive',
            conditions: { flash_drive_taken: false },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/flash_drive.webp`,
            position: [1511, 650]
        },
        {
            name: 'various',
            conditions: { clean: false },
            conditionType: 'simple',
            src: `${ locationSource }/home/bedroom/various.webp`,
            position: [725, 542]
        },

        {
            name: 'pillow',
            conditionType: 'simple',
            conditions: { clean: false },
            src: `${ locationSource }/home/bedroom/pillow.webp`,
            position: [669, 722]
        },
        {
            name: 'pizza_box',
            conditionType: 'simple',
            conditions: { clean: false },
            src: `${ locationSource }/home/bedroom/pizza_box.webp`,
            position: [475, 832]
        },
        {
            name: 'spinach',
            conditionType: 'simple',
            conditions: { spinach_licking: true, spinach_talking: false },
            src: `${ locationSource }/home/bedroom/spinach.webp`, // TODO this is actually complex conditions
            position: [629, 712]
        },
    ]
}

