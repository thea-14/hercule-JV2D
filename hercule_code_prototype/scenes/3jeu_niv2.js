// SCÈNE JARDIN (JEU) NIVEAU 2
import {jardin} from "./3jeu_niv1.js";

export function init(){
    scene('jeu2', () => {
        setBackground(BLACK);
        // ajouter le décor
        jardin();

// ligne pour la gravité
const ligne = add([
    rect(100000, 2),
    area(),
    body({isStatic: true}),
    pos(0, 460),
    opacity(0),
]);
    // ajouter Hercule de face
    const hercule = add([
        sprite('Hercule', {frame: 5}),
        pos(500, 466),
        scale(2),
        anchor("bot"),
        area(),
    ]);

    // faire parler Hercule
    let taper_espace = 0; // compteur pour les répliques d'Hercule

    onKeyPress('space', () => { // animation du visage quand il parle
        hercule.play("talk");
        taper_espace += 1;
        if(taper_espace == 23){ // quand les x répliques sont passées, on commence le jeu
            go('jardin');
        };
    });
    onKeyRelease('space', () => {
        hercule.play("face");
    });

    onButtonPress('space', loquace.next); // suite de l'histoire
    loquace.script([
        "Grâce à toi, j'ai réussi à échapper aux flammes du dragon Ladon!",
        "J'ai récolté assez de pommes pour en ramener trois à Eurysthée.",
        "Il ne me reste plus qu'à attraper Nérée pour sortir du jardin.",
        "Tu le reconnaîtras facilement: dès qu'il me verra, il se transformera en serpent.",
        "Au premier abord, on dirait un vieux monsieur... mais c'est un dieu très malin!",
        "Lorsqu'il se transformera en serpent, il sera trop rapide pour que je puisse l'attraper.",
        "Heureusement qu'il y a Minerve! Une chouette peut voler très vite et voir très loin. C'est une chasseuse redoutable!",
        "Une fois que Nérée sera redevenu humain, je pourrai l'attraper.",
        "Ne perdons pas de temps! Je sens qu'il n'est pas loin...",
    ]);



    }); // fin de la scène
}; // fin de la fonction
