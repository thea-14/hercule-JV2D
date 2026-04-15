// SCÈNE JARDIN (JEU)
export function init(){
    scene('jardin', () => {
    setBackground(0,0,0); // fond noir
    onKeyPress("f", (c) => { // mode plein écran
    setFullscreen(!isFullscreen());
});

// instructions de jeu
const instructions_neree = add([
    text(`Nérée vient de s'échapper! Aide-moi à l'attraper.`, {size:24}),
    pos(100, 500),
    fixed(),
]);
wait(2, () => {
    instructions_neree.destroy();
    const instructions_avancer = add([ // pour avancer
    text('Pour avancer, appuie sur la flèche droite.', {size:24}),
    pos(100, 500),
    fixed(),
]);

wait(2, () => {
    instructions_avancer.destroy();
    const instructions_sauter = add([ // pour sauter
        text('Pour sauter, appuie sur "espace".', {size:24}),
        pos(100, 500),
        fixed(),
    ]);
    wait(2, () => {
    instructions_sauter.destroy();
    const instructions_minerve = add([ // pour appeler Minerve
        text('Pour appeler Minerve, appuie sur "m".', {size:24}),
        pos(100, 500),
        fixed(),
    ]);
    wait(2, () => {
    instructions_minerve.destroy();
});
});
});
});

// ligne pour la gravité
const ligne = add([
    rect(100000, 2),
    area(),
    body({isStatic: true}),
    pos(0, 460),
    opacity(0),
]);

// créer une fonction "jardin" pour ajouter plusieurs fois le même décor et les pommes aux arbres
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
    area(),
    'chouette',
]);
    if(chouette.curAnim() != "fly"){
        chouette.play("fly");
    };
    chouette.onUpdate(() => { // la chouette se déplace en continu
        chouette.move(400, 80); // faire en sorte que la chouette suive Nérée
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

// ajouter Nérée qui se transforme en serpent
const neree = add([
    sprite('Neree'),
    pos(600, 466),
    scale(2),
    anchor("bot"),
    body(),
    area({shape: new Rect(vec2(0,-3),40,50)}),
    'neree',
]);
    // Nérée fait quelques pas, puis il se métamorphose
neree.play("walk");
wait(2, () => {
    neree.play("metamorphose");
});
    
let neree_avance = true; // voir collision chouette
    // vitesse de Nérée
neree.onUpdate(() => {
    if(neree_avance){
        neree.pos.x += 3;
    };
});
    // Nérée se transforme en serpent et reste serpent
neree.onAnimEnd((anim) => {
    if(anim == "metamorphose"){
        neree.play("serpent");
    };
});

    // collision Nérée - chouette (quand la chouette attrape le serpent, il redevient Nérée)
neree.onCollide('chouette', () => {
    neree_avance = false; // Nérée s'arrête
    neree.play("stand");
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

    let afficher_message = false; // un message s'affiche lorsque Hercule aura réussi à sortir de la zone de feu

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
        // si Hercule est sorti de la zone de feu, alors afficher le message
        if (hercule.pos.x > 8000 && !afficher_message){
            afficher_message = true;
            add([
                text("Bravo! Grâce à toi, j'ai réussi à esquiver les boules de feu du dragon Ladon!", {size:18}),
                pos(60, 500),
                fixed(),
            ]);
        };
    });

// Tourner à droite et à gauche: pas obligatoire si Hercule se déplace en continu
    // Hercule tourne à droite
    wait(1, () => { // Hercule ne peut pas avancer le temps des instructions
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
});
};

