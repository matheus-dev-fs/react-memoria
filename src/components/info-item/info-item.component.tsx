import { JSX } from "react";
import * as C from "./info-item.styles";

type Props = {
    label: string;
    value: string;
};

export const InfoItem = ({ label, value }: Props): JSX.Element => {
    return (
        <C.Container>
            <C.Label>{label}</C.Label>
            <C.Value>{value}</C.Value>
        </C.Container>
    );
}