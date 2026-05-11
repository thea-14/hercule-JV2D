// SCÈNE GAME OVER
export function init(){
    scene('game over', () => {
        setBackground(BLACK);
        add([
            text('Hercule a perdu... Mais il a encore besoin de ton aide!', {
                size: 26,
            }),
            pos(480, 290),
            anchor("center"),
        ]);
        const texte = add([
            text('Appuie sur "espace" pour rejouer', {
                size: 20,
            }),
            color(YELLOW),
            pos(450, 350),
            anchor('center'),
        ]);
        onKeyPress('space', () => {
            go('jardin');
        });
    });
};