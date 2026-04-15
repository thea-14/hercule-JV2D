// SCÈNE HISTOIRE
export function init(){
    scene('histoire', () => {
    setBackground(BLACK);

    // ajouter le décor
    function jardin(){
    // créer une fonction pomme
        function pomme(x, y){
        return add([
            sprite('pomme'),
            pos(x, y),
            area({shape: new Rect(vec2(30,30),40,40)}),
            'pomme',
        ]);
    };
    // répéter le même décor
    for (let i = 0; i < 100; i++){
        add([
            sprite('jardin'),
            pos(800 * i, 0),
        ]);
    // ajouter des pommes
        // 1er arbre
        pomme(800 * i - 760, 150);
        pomme(800 * i - 670, 260);
        pomme(800 * i - 780, 300);
        // 2e arbre
        pomme(800 * i - 400, 200);
        pomme(800 * i - 500, 250);
        pomme(800 * i - 460, 150);
        // 3e arbre
        pomme(800 * i - 170, 100);
        pomme(800 * i - 120, 210);
        pomme(800 * i - 230, 280);
    };
};
jardin();
    
    // ajouter la consigne
    const consigne = add([
        text(`Appuie sur "espace" pour entendre l'histoire d'Hercule.`, {size: 22}),
        pos(100, 480),
    ]);
    wait(3, () => {
        consigne.destroy();
    });
    
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
        if(taper_espace == 18){ // quand les x répliques sont passées, on commence le jeu
            go('jardin');
        };
    });
    onKeyRelease('space', () => {
        hercule.play("face");
    });

    onButtonPress('space', loquace.next); // histoire racontée
    loquace.script([
        "Bonjour, je suis Hercule.",
        "Tu tombes bien! J’ai justement besoin de ton aide pour m’aider à terminer mes Douze Travaux.",
        "Cela fait déjà plusieurs années que le roi Eurysthée m'a donné cette épreuve interminable...",
        "Ah! Tu ne sais pas qui c'est?",
        "C'est la Pythie qui m'a envoyé vers lui. La pythie, c'est une dame qui sait lire l'avenir.",
        "Pourquoi je suis allée la voir, me demanderas-tu?",
        "Comment te dire...",
        "J'ai commis une énorme bêtise. Un crime impardonnable. Et c'est pour purger ma peine que je dois effectuer les Douze Travaux.",
        "Là, je suis au Jardin des Hespérides. C'est un de mes derniers travaux.",
        "Mon but est simple: cueillir trois pommes d'or et les amener à Eurysthée.",
        "Par contre, je ne peux pas sortir du jardin seul...",
        "Il faut que je réussise à attraper Nérée, un dieu marin qui se métamorphose en serpent pour échapper à ses ennemis.",
        "Nérée et moi, on ne s'aime pas trop.",
        "C'est lui qui m'a indiqué le chemin pour le Jardin des Hespérides. Le problème, c'est que lui seul peut m'aider à en sortir.",
        "En plus, le jardin est gardé par le dragon Ladon.",
        "Heureusement qu'il y a Minerve pour me protéger et pour m'aider à surmonter ces obstacles!",
        "La règle est simple: plus je cueille de pommes, plus Minerve m'aidera. Elle apparaît sous la forme d'une chouette: c'est son animal symbolique.",
        "Aide-moi à cueillir les pommes et à attraper Nérée pour sortir du jardin!",
    ]); 
});
};