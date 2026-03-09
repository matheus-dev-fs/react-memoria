import { JSX, MouseEventHandler } from "react";
import * as C from "./button.styles";

type Props = {
    label: string;
    icon?: any;
    onClick: MouseEventHandler<HTMLDivElement>;
};

export const Button = ({ label, icon, onClick }: Props): JSX.Element => {
    return (
        <C.Container onClick={onClick}>
            {icon && (
                <C.IconArea>
                    <C.Icon src={icon} />
                </C.IconArea>
            )}
            <C.Label>{label}</C.Label>
        </C.Container>
    );
}