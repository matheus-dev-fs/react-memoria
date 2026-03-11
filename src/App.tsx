import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { InfoItem } from "./components/info-item/info-item.component";
import { Button } from "./components/button/button.component";
import { GridItemType } from "./types/grid-item.type";
import { items } from "./data/items.data";
import { GridItem } from "./components/grid-item/grid-item.component";
import { formatTimeElapsed } from "./utils/format-time-elapsed.util";

const App = (): JSX.Element => {
    const [playing, setPlaying]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [timeElapsed, setTimeElapsed]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);
    const [moveCount, setMoveCount]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);
    const [shownCount, setShownCount]: [number, Dispatch<SetStateAction<number>>] = useState<number>(0);
    const [gridItems, setGridItems]: [GridItemType[], Dispatch<SetStateAction<GridItemType[]>>] = useState<GridItemType[]>([]);

    useEffect((): void => {
        resetAndCreateGrid();
    }, []);

    useEffect((): () => void => {
        const timer: NodeJS.Timeout = setInterval((): void => {
            if (!playing) {
                return;
            }

            setTimeElapsed((time: number): number => time + 1);
        }, 1000);

        return (): void => clearInterval(timer);
    }, [playing, timeElapsed]);

    useEffect((): void => {
        if (shownCount < 2) {
            return;
        }

        const openedItems: GridItemType[] = gridItems.filter((item: GridItemType): boolean => item.isShown);

        if (openedItems.length !== 2) {
            return;
        }

        const [first, second]: GridItemType[] = openedItems;
        const tmpGrid: GridItemType[] = [...gridItems];

        setTimeout((): void => {
            tmpGrid.forEach((item: GridItemType): void => {
                if (!item.isShown) {
                    return;
                }

                if (item.item === first.item && item.item === second.item) {
                    item.permanentlyShown = true;
                }  
                       
                item.isShown = false;
            });

            setGridItems(tmpGrid);
            setShownCount(0);
            setMoveCount((moveCount: number): number => moveCount + 1);
        }, 1000);
    }, [shownCount, gridItems]);

    useEffect((): void => {
        if (moveCount === 0) {
            return;
        }

        const allPermanentlyShown: boolean = gridItems.every((item: GridItemType): boolean => item.permanentlyShown);

        if (allPermanentlyShown) {
            setPlaying(false);
        }
    }, [moveCount, gridItems]);

    const resetAndCreateGrid = (): void => {
        setTimeElapsed(0);
        setMoveCount(0);
        setShownCount(0);

        const tmpGridLength: number = items.length * 2;
        const tmpGrid: GridItemType[] = Array.from({ length: tmpGridLength }, (): GridItemType => ({
            item: null,
            isShown: false,
            permanentlyShown: false
        }));

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

    const handleItemClick = (index: number): void => {
        if (index === undefined || !playing || shownCount === 2) {
            return;
        }

        const tmpGrid: GridItemType[] = [...gridItems];

        if (tmpGrid[index].isShown || tmpGrid[index].permanentlyShown) {
            return;
        }

        tmpGrid[index].isShown = true;  

        setShownCount((shownCount: number): number => shownCount + 1);
        setGridItems(tmpGrid);
    };

    return (
        <C.Container>
            <C.Info>
                <C.LogoLink href="">
                    <img src={logoImage} width="200" alt="Logo do site" />
                </C.LogoLink>

                <C.InfoArea>
                    <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
                    <InfoItem label="Movimentos" value={moveCount.toString()} />
                </C.InfoArea>

                <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
            </C.Info>
            <C.GridArea>
                <C.Grid>
                    {gridItems.map((item: GridItemType, index: number): JSX.Element => (
                        <GridItem
                            key={index}
                            item={item}
                            onClick={() => handleItemClick(index)}
                        />
                    ))}
                </C.Grid>
            </C.GridArea>
        </C.Container>
    );
}

export default App;