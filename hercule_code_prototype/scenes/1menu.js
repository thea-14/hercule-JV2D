// SCÈNE MENU
export function init(){
    scene('menu', () => {
        setBackground(BLACK);
        add([
            sprite('titre'),
            scale(0.35),
            pos(width()/2, height()/2 - 50),
            anchor('center'),
        ]);
    // ajouter un bouton "JOUER"
    const bouton = add([
        rect(300, 100),
        pos (width()/2, height()/2 + 100),
        anchor('center'),
        color(YELLOW),
        area(),
    ]);
    // ajouter du texte au bouton
    const texte_bouton = add([
        text('JOUER (espace)', {
            size: 24,
        }),
        color(BLACK),
        pos(width()/2, height()/2 + 100),
        anchor('center'),
    ]);
    // ajouter un événement au bouton
    onKeyPress('space', () => {
        go('histoire');
        // ajouter la musique de fond
const musique = play('musique', {
    volume: 0.8,
    speed: 1.0,
    loop: true,
});
    });
    
    

}); // fin de la scène
}; // fin de la fonction