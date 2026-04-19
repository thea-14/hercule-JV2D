// SCÈNE GAGNÉ
export function init(){
    scene('win', () => {
        setBackground(0,0,0); // fond noir
        // décor
        const jardin = add([
            sprite('sortie jardin'),
        ]);

        const bravo = add([
            text('Bravo!\nGrâce à toi, Hercule a réussi\nà sortir du Jardin des Hespérides!', 
                {size:30, align:"center", lineSpacing:20}),
            pos(width()/2, height()/2 - 50),
            anchor("center"),
        ]);
        wait(3, () => {
            bravo.destroy();
            const rejouer = add([
                text('Pour rejouer, appuie sur la barre espace.', {size:30}),
                pos(width()/2, height()/2 - 50),
                anchor("center"),
            ]);
        });
        // quand on appuie sur espace, on retourne au menu
        onKeyPress('space', () => {
            go('menu');
        });

        // ligne pour la gravité
        const ligne = add([
            rect(100000, 2),
            area(),
            body({isStatic: true}),
            pos(0, 550),
            opacity(0),
        ]);

        // Hercule
        const hercule = add([
            sprite('Hercule', {frame:7}),
            pos(400, 550),
            scale(2.5),
            anchor("bot"),
            body(),
            area(),
        ]);


    
    }); // fin de la scène
}; // fin de la fonction