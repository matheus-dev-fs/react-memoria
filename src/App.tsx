import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { InfoItem } from "./components/info-item/info-item.component";
import { Button } from "./components/button/button.component";
import { GridItem } from "./types/grid-item.type";
import { items } from "./data/items.data";

const App = (): JSX.Element => {
    const [playing, setPlaying]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [timeElapsed, setTimeElapsed]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);
    const [moveCount, setMoveCount]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);
    const [shownCount, setShownCount]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);
    const [gridItems, setGridItems]: [GridItem[], Dispatch<SetStateAction<GridItem[]>>] = useState<GridItem[]>([]);

    useEffect((): void => {
        resetAndCreateGrid();
    }, []);

    const resetAndCreateGrid = (): void => {
        setTimeElapsed(0);
        setMoveCount(0);
        setShownCount(0);

        const tmpGridLength: number = items.length * 2;
        const tmpGrid: GridItem[] = new Array(tmpGridLength).fill({  
            item: null, 
            isShown: false, 
            permanentlyShown: false 
        });

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < items.length; j++) {
                const pos: number = Math.floor(Math.random() * tmpGridLength);
                
                if (tmpGrid[pos].item === null) {
                    tmpGrid[pos].item = j;
                } else {
                    j--;
                }
            }
        }

        setGridItems(tmpGrid);
        
        setPlaying(true);
    };

    return (
        <C.Container>
            <C.Info>
                <C.LogoLink href="">
                    <img src={logoImage} width="200" alt="Logo do site" />
                </C.LogoLink>

                <C.InfoArea>
                    <InfoItem label="Tempo" value={timeElapsed.toString()} />
                    <InfoItem label="Movimentos" value={moveCount.toString()} />
                </C.InfoArea>

                <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
            </C.Info>
            <C.GridArea>
                <C.Grid>

                </C.Grid>
            </C.GridArea>
        </C.Container>
    );
}

export default App;