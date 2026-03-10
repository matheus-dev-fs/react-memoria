import { JSX } from "react";
import * as C from "./grid-item.styles";
import { GridItemType } from "../../types/grid-item.type";
import b7Svg from "../../svgs/b7.svg";
import { items } from "../../data/items.data";

type Props = {
    item: GridItemType;
    onClick: () => void;
}

export const GridItem = ({ item, onClick }: Props): JSX.Element => {
    const { isShown, permanentlyShown, item: itemData } = item;

    return (
        <C.Container 
            onClick={onClick}
            showBackground={permanentlyShown || isShown}
        >
            {!permanentlyShown && !isShown && (
                <C.Icon src={b7Svg} alt="" opacity={0.1}/>
            )}

            {(permanentlyShown || isShown) && itemData !== null && (
                <C.Icon src={items[itemData].icon} alt="" />
            )}
        </C.Container>
    );
}