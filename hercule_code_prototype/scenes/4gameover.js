// SCÈNE GAME OVER
export function init(){
    scene('game over', () => {
    setBackground(0,0,0);
    add([
        text('Hercule a perdu... Mais il a encore besoin de ton aide!', {
            size: 26,
        }),
        pos(480, 290),
        anchor("center"),
    ]);

    // ajouter la consigne "rejouer"
    const texte = add([
        text('Appuie sur "espace" pour rejouer', {
            size: 20,
        }),
        color(YELLOW),
        pos(450, 350),
        anchor('center'),
    ]);
    // // ajouter un bouton "Rejouer"
    // const bouton = add([
    //     rect(300, 100),
    //     pos (width()/2, height()/2 + 100),
    //     anchor('center'),
    //     color(YELLOW),
    //     area(),
    // ]);
    // // ajouter du texte au bouton
    // const texte_bouton = add([
    //     text('REJOUER (espace)', {
    //         size: 24,
    //     }),
    //     color(BLACK),
    //     pos(width()/2, height()/2 + 100),
    //     anchor('center'),
    // ]);
    // ajouter un événement au bouton
    onKeyPress('space', () => {
        go('jardin');
    });
});
};