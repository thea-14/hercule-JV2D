// SCÈNE JARDIN (JEU)


export function jardin(){ // décor
    function pomme(x, y){
        return add([
            sprite('pomme'),
            pos(x, y),
            area({shape: new Rect(vec2(30,30),40,40)}),
            'pomme',
        ]);
    };
    for (let i = 0; i < 100; i++){
        add([
            sprite('jardin'),
            pos(800 * i, 0),
        ]);
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


export function init(){
    scene('jardin', () => {
        setBackground(BLACK);
        onKeyPress("f", (c) => { // mode plein écran
        setFullscreen(!isFullscreen());
    });
    
    let PAUSE = false; // voir intervention narrative après qu'Hercule ait attrapé sa première chouette
    let begin_pause = false;
    let DIALOGUE = false; // voir intervention narrative une fois qu'Hercule est sorti de la zone des boules de feu
    let begin_dialogue = false;
    let taper_espace = 0; // compteur d'espaces pour les répliques de DIALOGUE
    let taper_espace_pause = 0; // compteur d'espaces pour les répliques de PAUSE

    let feu_end = false; // voir interventions narratives (le feu s'arrête)

    const musique_jardin = play("musique jardin", {
        volume: 0.6,
        loop: true,
    });


    const ligne = add([ // ligne de gravité
        rect(100000, 2),
        area(),
        body({isStatic: true}),
        pos(0, 460),
        opacity(0),
    ]);


    jardin();
    
    function boules_de_feu(){
        const hauteur = rand(260, 400); // hauteur aléatoire des boules de feu
        const feu = add([
            sprite('boule de feu'),
            pos(8000, hauteur),
            area({shape: new Rect(vec2(15, 30),65,40)}),
            'feu',
        ]);
        feu.onUpdate(() => {
            if(PAUSE || DIALOGUE){ // lors des pauses narratives, les boules de feu s'arrêtent
                feu.destroy();
                return;
            };  
            if(feu.curAnim() != "move"){
                feu.play("move");
            };
            if(feu_end){
                feu.destroy();
            };
            feu.move(-300, 0);
        });
    };
    loop(3, () => { // une boule de feu part toutes les 3sec
        if(PAUSE || DIALOGUE) return; // lors de la pause narrative, les boules de feu s'arrêtent
        if(feu_end) return;
        boules_de_feu();
    });


// COMPTEURS (FIXÉS EN HAUT À DROITE DE L'ÉCRAN)
    let coeurs = [];
    for (let i = 0; i < 3; i++){
        const coeur = add([
            sprite('coeur'),
            pos(width() - 70 - i*60, 10),
            fixed(),
        ]);
        coeurs.push(coeur);
    };


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

    let stock_chouettes = 0;
    const tete_chouette = add([
        sprite('tête chouette'),
        pos(width() - 130, 100),
        scale(1.75),
        fixed(),
    ]);
    tete_chouette.play("normal"); // voir hercule.onUpdate, où la tête de chouette se mettre à bouger lorsqu'Hercule sera face à Nérée
    const compteur_chouettes = add([
        text("", {size:48}),
        pos(width() - 150, 155),
        color(102, 60, 26),
        fixed(),
    ]);

// CHOUETTE
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
            const son_chouette = play("fly", {
                volume: 6,
                loop: true,
            });
            wait(2, () => {
                son_chouette.stop();
            });
            onSceneLeave(() => {
                son_chouette.stop()
            });
        };
        chouette.onUpdate(() => {
            chouette.move(600, 300); // la chouette se déplace en diagonale vers le bas
        });
        chouette.onCollide('feu', (feu) => {
            const son_collision = play('chouette contre feu', {
                volume: 0.4,
            });
            feu.destroy();
            chouette.destroy();
        });
    };

    onKeyPress("m", () => {
        if(stock_chouettes > 0){
            appelerChouette();
            stock_chouettes -= 1;
            compteur_chouettes.text = stock_chouettes;
        };
        if(stock_chouettes == 0){ // affiche une chaîne vide au lieu de 0
            compteur_chouettes.text = "";
        }; 
    });

// HERCULE
    const hercule = add([
        sprite('Hercule'),
        pos(500, 466),
        scale(2),
        anchor("bot"),
        body(),
        area({shape: new Rect(vec2(0,-3),30,56)}),
        'hercule',
    ]);
    
    hercule.perdUneVie = false; // voir collision boule de feu

    // Hercule tourne à droite
    onKeyDown("right", () => {
        if(PAUSE || DIALOGUE){ // lors de la pause narrative, Hercule ne peut plus avancer
            hercule.play("stand");
            return;
        }; 
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
        hercule.play("stand");
    });

    // Hercule se baisse
    onKeyDown("down", () => {
        if(hercule.perdUneVie) return;
        hercule.play("down");
        hercule.area.shape = new Rect(vec2(0,-3),30,45);
    });
    onKeyRelease("down", () => {
        hercule.play("stand");
        hercule.area.shape = new Rect(vec2(0,-3),30,56);
    });

    // Hercule saute
        // mode dialogue
    onKeyPress("space", () => {
        if(DIALOGUE){
            musique_jardin.paused = true;
            hercule.play("talk");
            taper_espace++;
            if(taper_espace == 9){
                DIALOGUE = false;
                hercule.play("stand");
                musique_jardin.paused = false;
            };
            return;
        };
        if(PAUSE){
            musique_jardin.paused = true;
            hercule.play("talk");
            taper_espace_pause++;
            if(taper_espace_pause == 9){
                PAUSE = false;
                hercule.play("stand");
                musique_jardin.paused = false;
            };
            return;
        };
            // mode jeu
        if(hercule.perdUneVie) return;
        if(hercule.curAnim != "jump"){
            hercule.play("jump");
        };
        if(hercule.isGrounded()){
            hercule.jump(1000);
        };
        const son_jump = play('saut', {
            volume: 0.7
        });
    });
    onKeyRelease("space", () => {
        hercule.play("stand");
    });
  
    
    // caméra fixée sur Hercule, mais seulement quand il marche (pas quand il saute)
    hercule.onUpdate(() => {
        if(hercule.pos.x > 7900 && !feu_end){
            feu_end = true;
        };
        if(!DIALOGUE){
            if(hercule.isGrounded()){
                setCamPos(hercule.pos.x, hercule.pos.y - 170);
            } else {
                camPos(hercule.pos.x, camPos().y);
            };
            if(!hercule.curAnim()){
                hercule.play("stand")
            };
        };
            // lorsqu'il y a la première chouette en stock, pause narrative/explicative
        if(stock_chouettes == 1 && !begin_pause){
            PAUSE = true;
            begin_pause = true;

            onButtonPress('space',  ( ) => {loquace.next({x:camPos().x, y:camPos().y + 30})});
            loquace.script([
                "J'ai ma première chouette!",
                "Elle va ma protéger contre les boules de feu.",
                "Pour m'aider, c'est très simple.",
                "Dès que tu vois une boule de feu, appuie sur M pour appeler Minerve.",
                "Mais attention...",
                "J'aurai besoin de Minerve encore plus tard.",
                "Donc n'utilise pas toutes les chouettes que tu as en stock!",
                "Sinon, je ne pourrai jamais sortir de ce jardin...",
                "Ne perdons pas de temps!",
            ], true, {x:camPos().x, y:camPos().y + 30});
        };

        // si Hercule est sorti de la zone de feu, alors pause narrative
        if(hercule.pos.x > 8300 && !begin_dialogue){
            DIALOGUE = true;
            begin_dialogue = true;

            loquace.script([
                "Grâce à toi, j'ai réussi à échapper aux flammes du dragon Ladon!",
                "J'ai récolté assez de pommes d'or pour Eurysthée.",
                "Il ne me reste plus qu'à attraper Nérée pour sortir du jardin.",
                "Tu le reconnaîtras facilement: dès qu'il me verra, il se transformera en serpent.",
                "Au premier abord, on dirait un vieux monsieur... mais c'est un dieu très malin!",
                "Lorsqu'il se transformera en serpent, il sera trop rapide pour que je puisse l'attraper.",
                "Heureusement qu'il y a Minerve! Une chouette peut voler très vite et voir très loin. C'est une chasseuse redoutable!",
                "Une fois que Nérée sera redevenu humain, je pourrai l'attraper.",
                "Ne perdons pas de temps! Je sens qu'il n'est pas loin...",
            ], true, {x:camPos().x, y:camPos().y + 30});
        };
            // lorsque Nérée est dans le champ de vision d'Hercule, le logo de la chouette s'anime pour nous inciter à utiliser la chouette
        if(hercule.pos.x > 8500 && tete_chouette.curAnim() != "bounce"){
            tete_chouette.play("bounce");
        };
    });
    

// collision Hercule - pomme
    hercule.onCollide('pomme', (pomme) => {
        const son_plus_un = play('plus un',{
            volume: 0.5,
        });
        score_pommes += 1; 
        compteur_pommes.text = score_pommes;

        if(score_pommes % 10 == 0){ // chaque fois qu'Hercule récolte 30 pommes, une chouette est ajoutée au stock
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
    let total_boules_de_feu = 0;

    hercule.onCollide('feu', (feu) => {
        total_boules_de_feu += 1;
        if(total_boules_de_feu < 3){ // pour les 2 premières boules de feu, son d'impact; pour la dernière, son game over (voir infra)
            const son = play('hit', {
                volume: 0.6,
            }); 
        };

        if(coeurs.length > 0){ // on enlève une vie au compteur
            destroy(coeurs.pop());
        }; 
        
        if(hercule.perdUneVie) return; // Hercule perd une vie, donc il devient rouge
        hercule.perdUneVie = true;
        hercule.play("burn");
        destroy(feu);

        if(coeurs.length == 0){ // s'il n'y a plus de vies, alors game over
            const son = play('game over', {
                volume: 0.6,
            });
            musique_jardin.stop();
            go('game over');
        };

        wait(0.25, () => { // après 0.25 sec, Hercule peut de nouveau s'animer
            hercule.perdUneVie = false;
                hercule.play("stand");
            });
        });

// NÉRÉE
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
            seuil = true;
            neree.flipX = false;
            neree_avance = true;
            neree.play("walk");
            play("rire", {
                volume: 0.4,
                loop: false,
            });
            wait(1, () => {
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
            neree.pos.x += 5;
        };
    });

    // collision Nérée - chouette (quand la chouette attrape le serpent, il redevient Nérée)
    neree.onCollide('chouette', (chouette) => {
        neree_avance = false;
        neree.play("stand");
        play("grognement",{
            volume: 2,
            loop: false,
        });
        chouette.destroy();
    });

    // collision Nérée - Hercule (quand Hercule attrape Nérée, le partie est gagnée)
    neree.onCollide('hercule', () => {
        go('win');
        musique_jardin.stop();
        play('victoire');
    });
});
};

