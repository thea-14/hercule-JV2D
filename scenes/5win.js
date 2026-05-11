// SCÈNE GAGNÉ
export function init(){
    scene('win', () => {
        setBackground(BLACK);
        const jardin = add([
            sprite('sortie jardin'),
        ]);
        
        const ligne = add([ // ligne de gravité
            rect(100000, 2),
            area(),
            body({isStatic: true}),
            pos(0, 550),
            opacity(0),
        ]);

        const hercule = add([
            sprite('Hercule', {frame:7}),
            pos(400, 550),
            scale(2.5),
            anchor("bot"),
            body(),
            area(),
        ]);
        
        const bravo = add([
            text('Bravo!\nGrâce à toi, Hercule a réussi\nà sortir du Jardin des Hespérides!', 
                {size:28, align:"center", lineSpacing:20}),
            pos(width()/2, height()/2 - 50),
            anchor("center"),
        ]);
        wait(3, () => {
            bravo.destroy();
            const rejouer = add([
                text('Pour recommencer le jeu, appuie sur la barre espace.', {size:28}),
                pos(width()/2, height()/2 - 50),
                anchor("center"),
            ]);
        });

        onKeyPress('space', () => {
            go('menu');
        });
    }); 
};