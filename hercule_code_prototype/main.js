// KAPLAY ET SPRITES
    // Importer les scènes
import * as menu from "./scenes/1menu.js";
import * as histoire from "./scenes/2histoire.js";
import * as jeu from "./scenes/3jeu.js";
import * as gameover from "./scenes/4gameover.js";
import * as win from "./scenes/5win.js";

    // Importer Kaplay et Loquace
import kaplay from "https://unpkg.com/kaplay@3001.0.19/dist/kaplay.mjs";
import {clear, loquacePlugin} from './loquace.js';
kaplay({
    width: 960,
    height: 600,
    plugins: [loquacePlugin],
    buttons: {
        space: {
        keyboard: ["space"],
    },
},
});
loquace.init();

    // commandes Loquace
loquace.registerCommand('scene_jardin', () => {
        go('jardin');
    });


    // Initialiser les scènes
menu.init();
histoire.init();
jeu.init();
gameover.init();
win.init();

    // Aller au menu (scène 1)
go('jardin');

    // Ajouter de la gravité (pour les scènes suivantes)
setGravity(2400);


    // Charger les sprites
loadSprite('titre', '/assets/Titre_Final.png');
loadSprite('jardin', '/assets/Jardin_Hesperides.png');
loadSprite('sortie jardin', '/assets/Jardin_Sortie.png');
loadSprite('pomme', '/assets/pomme_feuilles.png');
loadSprite('pomme entière', '/assets/Pomme.png');
loadSprite('coeur', '/assets/Coeur.png');
loadSprite('tête chouette', '/assets/chouette_tete.png', {
    sliceX: 4,
    sliceY: 1,
    anims:{
        "normal":{from:0, to:0},
        "bounce":{from:0, to:3, loop:true},
    },
});
loadSprite('chouette', '/assets/Chouette.png', {
    sliceX: 4,
    sliceY: 1,
    anims:{
        "fly":{from:0, to:3, loop:true},
    },
});
loadSprite('Neree', '/assets/Neree_Animations.png', {
    sliceX: 6,
    sliceY: 1,
    anims:{
        stand:{from:0, to:0, loop:true},
        walk:{from:0, to: 1, loop:true},
        metamorphose:{from:0, to:3, loop:false},
        serpent:{from:4, to:5, loop:true},
        },
});
loadSprite('boule de feu', '/assets/Boule_Feu.png', {
    sliceX: 2,
    sliceY: 1,
    anims:{
        "move":{from: 0, to: 1, loop: true},
    },
});
loadSprite('Hercule', '/assets/Hercule_Animations.png', {
    sliceX: 8,
    sliceY: 1,
    anims:{
        "stand":{from: 0, to: 0, loop: true},
        "walk":{from: 1, to:0, loop:true},
        "jump":{from: 2, to: 2, loop: true},
        "down":{from: 3, to: 3, loop:true},
        "burn":{from: 4, to: 4, loop:true},
        "talk":{from: 5, to: 6, loop:true},
        "face":{from: 5, to: 5, loop: true},
        "happy":{from: 7, to: 7, loop: true},
    },
});

    // Charger les sons
loadSound('plus un', '/sounds/coin1.wav');
loadSound('saut', '/sounds/jump_11.wav');
loadSound('hit', '/sounds/death.wav');
loadSound('game over', '/sounds/round_end.wav');
loadSound('musique jardin', '/sounds/sunnyday.wav');
loadSound('musique histoire', '/sounds/relaxing_music.mp3');
loadSound('fly', '/sounds/bird_flapping.wav');
loadSound('victoire', '/sounds/Victory.wav');
loadSound('chouette contre feu', '/sounds/SoundEnemyDeath.wav');
loadSound('click', '/sounds/click_sound_5.mp3');
