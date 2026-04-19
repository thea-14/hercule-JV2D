// SCÈNE JARDIN (JEU) NIVEAU 1

// créer une fonction "jardin" pour ajouter plusieurs fois le même décor et les pommes aux arbres
export function jardin(){
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

// exporter la scène "jardin"
export function init(){
    scene('jardin', () => {
    setBackground(0,0,0); // fond noir
    onKeyPress("f", (c) => { // mode plein écran
    setFullscreen(!isFullscreen());
});

// ligne pour la gravité
const ligne = add([
    rect(100000, 2),
    area(),
    body({isStatic: true}),
    pos(0, 460),
    opacity(0),
]);

// ajouter le décor
jardin();

// ajouter des boules de feu
function boules_de_feu(){
    const hauteur = rand(270, 400); // hauteur aléatoire des boules de feu
    const feu = add([
        sprite('boule de feu'),
        pos(8000, hauteur),
        area({shape: new Rect(vec2(15, 30),65,40)}),
        'feu',
    ]);
    feu.onUpdate(() => {
        if(feu.curAnim() != "move"){
            feu.play("move");
        };
        feu.move(-300, 0);
    });
};

loop(3, () => { // boucle: toutes les 3 sec, une boule de feu est lancée
    boules_de_feu();
});


// ajouter les vies (3 coeurs) en haut à droite de l'écran
let coeurs = [];
for (let i = 0; i < 3; i++){
    const coeur = add([
        sprite('coeur'),
        pos(width() - 70 - i*60, 10),
        fixed(),
    ]);
    coeurs.push(coeur);
};

// ajouter le compteur de pommes
let score_pommes = 0;
const pomme_entiere = add([
    sprite('pomme entière'),
    pos(width() - 100, 50),
    scale(1.25),
    fixed(),
]);

const compteur_pommes = add([
    text("", {size:48}),
    pos(width() - 150, 90),
    color(YELLOW),
    fixed(),
]);

// ajouter le compteur de chouettes
let stock_chouettes = 0;

const tete_chouette = add([
    sprite('tête chouette'),
    pos(width() - 130, 100),
    scale(1.75),
    fixed(),
]);
const compteur_chouettes = add([
    text("", {size:48}),
    pos(width() - 150, 155),
    color(102, 60, 26),
    fixed(),
]);

// ajouter la chouette
function appelerChouette(){
    const chouette = add([
    sprite('chouette'),
    pos(hercule.pos.x, 200),
    scale(1.5),
    anchor("bot"),
    body({gravityScale: 0}),
    area({shape: new Rect(vec2(10,-18),70,50)}),
    'chouette',
]);
    if(chouette.curAnim() != "fly"){
        chouette.play("fly");
    };
    chouette.onUpdate(() => { // la chouette se déplace en continu
        chouette.move(400, 70); // la chouette se déplace en diagonale vers le bas
    });
    // collision chouette - boule de feu
    chouette.onCollide('feu', (feu) => {
        feu.destroy();
        chouette.destroy();
    });
};

onKeyPress("m", () => { // la chouette apparaît seulement quand on presse "c" et s'il y en a en stock
    if(stock_chouettes > 0){
        appelerChouette();
        stock_chouettes -= 1;
        compteur_chouettes.text = stock_chouettes;
    };
    if(stock_chouettes == 0){ // affiche une chaîne vide au lieu de 0
        compteur_chouettes.text = "";
    }; 
});

// ajouter Hercule
    const hercule = add([
        sprite('Hercule'),
        pos(500, 466),
        scale(2),
        anchor("bot"),
        body(),
        area({shape: new Rect(vec2(0,-3),30,50)}),
        'hercule',
    ]);
    
    hercule.perdUneVie = false; // voir collision boule de feu


    // caméra fixée sur Hercule, mais seulement quand il marche (pas quand il saute)
    hercule.onUpdate(() => {
        if(hercule.isGrounded()){
            setCamPos(hercule.pos.x, hercule.pos.y - 170);
        } else {
            camPos(hercule.pos.x, camPos().y);
        };
        if(!hercule.curAnim()){
            hercule.play("stand")
        };
        // si Hercule est sorti de la zone de feu, alors on passe au niveau suivant
        //if (hercule.pos.x > 8500){
            //go('jeu2');
        //};
    });

// Tourner à droite et à gauche: pas obligatoire si Hercule se déplace en continu
    // Hercule tourne à droite
    onKeyDown("right", () => {
        if(hercule.perdUneVie) return; // si Hercule est touché par une boule de feu, alors il ne peut plus avancer pendant 0.25 sec
        hercule.pos.x += 5;
        hercule.flipX = false;
        if(hercule.curAnim() != "walk"){
            hercule.play("walk");
        }; 
        if(!hercule.isGrounded()){
            hercule.play("jump");
        };
    });
    onKeyRelease("right", () => {
        hercule.play("stand")
    });

    // Hercule saute
  onKeyPress("space", () => {
    if(hercule.perdUneVie) return;
    if(hercule.curAnim != "jump"){
        hercule.play("jump");
    };
    if(hercule.isGrounded()){
        hercule.jump(1000);
    };
    hercule.play("jump");
  });
  onKeyRelease("space", () => {
    hercule.play("stand");
  });

    // Hercule se baisse
    onKeyDown("down", () => {
        if(hercule.perdUneVie) return;
        hercule.play("down");
    });
    onKeyRelease("down", () => {
        hercule.play("stand")
    });

// collision Hercule - pomme
hercule.onCollide('pomme', (pomme) => {
    score_pommes += 1; // on met à jour le nombre de pommes récoltées
    compteur_pommes.text = score_pommes; // le compteur affiche le nombre de pommes récoltées

    if(score_pommes % 10 == 0){ // chaque fois qu'Hercule récolte 10 pommes, une chouette est ajoutée au stock
        stock_chouettes += 1;
        compteur_chouettes.text = stock_chouettes;
    };

    const plus_un = add([ // on affiche +1 à chaque pomme récoltée
        text('+1', {size: 28}),
        pos(pomme.pos.x, pomme.pos.y -10),
        anchor("center"),
        color(YELLOW),
        move(UP, 50),
    ]);
    wait(0.25, () => {
        plus_un.destroy();
    });
    destroy(pomme);
});

// collision Hercule - boule de feu
hercule.onCollide('feu', (feu) => {
    if(coeurs.length > 0){ // on enlève une vie au compteur
        destroy(coeurs.pop());
    }; 
    
    if(hercule.perdUneVie) return; // Hercule perd une vie, donc il devient rouge
    hercule.perdUneVie = true;
    hercule.play("burn");
    destroy(feu);

    if(coeurs.length == 0){ // s'il n'y a plus de vies, alors game over
        go('game over');
    };

    wait(0.25, () => { // après 0.25 sec, Hercule peut de nouveau s'animer
        hercule.perdUneVie = false;
            hercule.play("stand");
        });
    });

// ajouter Nérée qui se transforme en serpent
const neree = add([
    sprite('Neree'),
    pos(9000, 466),
    scale(2),
    anchor("bot"),
    body(),
    area({shape: new Rect(vec2(0,-3),40,50)}),
    'neree',
]);

    // Nérée est immobile et face à Hercule
    neree.play("stand");
    neree.flipX = true;
    let neree_avance = false; // voir collision chouette
    let seuil = false; // seuil où Hercule entre dans le champ de vision de Nérée
    
    neree.onUpdate(() => {
        if(!seuil && (hercule.pos.x < neree.pos.x && hercule.pos.x > neree.pos.x - 300)){
            seuil = true; // on a atteint le seuil
                neree.flipX = false;
                neree_avance = true;
                neree.play("walk");
                wait(2, () => { // Nérée se métamorphose après 2 secondes de marche
                    neree_avance = true;
                    neree.play("metamorphose");
                });
                neree.onAnimEnd((anim) => { // Nérée se transforme en serpent et reste serpent
                    if(anim == "metamorphose"){
                        neree.play("serpent");
                    };
                });
        };
        if(neree_avance){
            neree.pos.x += 5; // vitesse de Nérée
        };
    });

    // collision Nérée - chouette (quand la chouette attrape le serpent, il redevient Nérée)
    neree.onCollide('chouette', (chouette) => {
        neree_avance = false; // Nérée s'arrête
        neree.play("stand");
        chouette.destroy();
    });

    // collision Nérée - Hercule (quand Hercule attrape Nérée, le partie est gagnée)
    neree.onCollide('hercule', () => {
        go('win');
    });

 
}); // fin de la scène
}; // fin de la fonction

