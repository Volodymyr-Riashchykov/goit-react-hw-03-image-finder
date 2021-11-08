import { ReactComponent as IconSvg } from "../../images/search.svg";
import s from "./Button.module.css";

export default function Button() {
    return (
        <button type="submit" className={s.button} >
            <IconSvg width="30" height="30" className={s.icon} />
        </button>
    )
}