// SCÈNE MENU

export function init(){
    scene('menu', () => {
        onKeyPress("f", (c) => {
            setFullscreen(!isFullscreen());
        });
        setBackground(BLACK);
        add([
            sprite('titre'),
            scale(0.4),
            pos(500, 350),
            anchor('center'),
        ]);

        const texte_play = add([
            text('Appuie sur "espace" pour commencer le jeu', {
                size: 20,
            }),
            color(YELLOW),
            pos(450, 400),
            anchor('center'),
        ]);

        const texte_fullscreen = add([
            text('... et sur "f" pour jouer en plein écran!', {
                size: 14,
            }),
            color(GREEN),
            pos(250, 430),
        ]);
        
        onKeyPress('space', () => {
            go('histoire');
        });
    });
}; 