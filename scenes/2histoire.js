// SCÈNE HISTOIRE

import {jardin} from "./3jeu.js"; // décor

export function init(){
    scene('histoire', () => {
        onKeyPress("f", (c) => {
            setFullscreen(!isFullscreen());
        });
        setBackground(BLACK);
        
        const musique_histoire = play("musique histoire", {
            volume: 0.4,
            loop: true,
        });
        
        onSceneLeave(() => {
            musique_histoire.stop();
        });
        
        jardin();
        
        const ligne = add([ // ligne de gravité
            rect(100000, 2),
            area(),
            body({isStatic: true}),
            pos(0, 460),
            opacity(0),
        ]);
        
        const hercule = add([
            sprite('Hercule', {frame: 5}),
            pos(500, 466),
            scale(2),
            anchor("bot"),
            area(),
        ]);
        
        onKeyPress('space', () => {
            hercule.play("talk");
        });
        onKeyRelease('space', () => {
            hercule.play("face");
        });
        
        onButtonPress('space', ( ) => {loquace.next({x:500, y:330})});
        
        loquace.script([
            "Bonjour, je suis Hercule. Appuie sur la barre espace pour écouter mon histoire.",
            "Tu tombes bien! J’ai justement besoin de ton aide pour m’aider à terminer mes Douze Travaux.",
            "Cela fait déjà plusieurs années que le roi Eurysthée m'a donné cette épreuve interminable...",
            "Tu te demandes sûrement comment je suis tombé sur ce tyran.",
            "En fait, c'est la Pythie qui m'a envoyé vers lui. C'est une dame qui sait lire l'avenir.",
            "Pourquoi je suis allé la voir, me demanderas-tu?",
            "Comment te dire...",
            "J'ai commis une énorme bêtise. Un crime impardonnable.",
            "Et c'est pour purger ma peine que je dois effectuer les Douze Travaux.",
            "Là, je suis au Jardin des Hespérides. C'est un de mes derniers travaux.",
            "Mon but est simple: cueillir des pommes d'or pour les apporter à Eurysthée.",
            "Ça a l'air simple, dit comme ça.",
            "Mais ne te fie pas aux apparences paisibles de ce jardin: il est rempli de dangers.",
            "Tout d'abord, il est gardé par un dragon. Il s'appelle Ladon et il est très féroce.",
            "Ensuite, je ne peux pas sortir du jardin seul... ",
            "Il faut que je réussisse à attraper Nérée.", 
            "C'est un dieu marin qui se métamorphose en serpent pour échapper à ses ennemis.",
            "Nérée et moi, on ne s'aime pas trop.",
            "C'est lui qui m'a indiqué le chemin pour le Jardin des Hespérides.",
            "Le problème, c'est que lui seul peut m'aider à en sortir.",
            "Pour attraper Nérée, seule Minerve peut m'aider.",
            "C'est la déesse de la sagesse, de l'intelligence et de la stratégie. Elle me protège depuis le début des Travaux.",
            "Pour que Minerve puisse m'aider, il faut que je récolte au moins 10 pommes.",
            "Elle apparaît sous la forme d'une chouette: c'est son animal symbolique.",
            "Aide-moi à cueillir les pommes et à attraper Nérée pour sortir du jardin!",
            "Les commandes de jeu sont très simples.",
            "Appuie sur la flèche droite pour avancer.",
            "Tape la barre espace pour sauter.",
            "Appuie sur la flèche du bas pour m'aider à me baisser.",
            "Allons-y!",
            "scene_jardin",
        ], true, {x:500, y:330}); 
    });
};