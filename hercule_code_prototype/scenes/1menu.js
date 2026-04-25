// SCÈNE MENU
export function init(){
    scene('menu', () => {
        setBackground(BLACK);
        add([
            sprite('titre'),
            scale(0.4),
            pos(500, 350),
            anchor('center'),
        ]);
    // ajouter du texte
    const texte = add([
        text('Appuie sur "espace" pour commencer le jeu', {
            size: 20,
        }),
        color(YELLOW),
        pos(450, 400),
        anchor('center'),
    ]);

    // // ajouter un bouton "JOUER"
    // const bouton = add([
    //     rect(300, 100),
    //     pos (width()/2, height()/2 + 100),
    //     anchor('center'),
    //     color(YELLOW),
    //     area(),
    // ]);
    // // ajouter du texte au bouton
    // const texte_bouton = add([
    //     text('JOUER (espace)', {
    //         size: 24,
    //     }),
    //     color(BLACK),
    //     pos(width()/2, height()/2 + 100),
    //     anchor('center'),
    // ]);

    // ajouter un événement au bouton
    onKeyPress('space', () => {
        go('histoire');
        //const musique = play("musique histoire");
    });
    
    

}); // fin de la scène
}; // fin de la fonction