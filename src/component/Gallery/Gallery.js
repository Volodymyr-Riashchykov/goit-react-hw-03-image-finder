import PropTypes from "prop-types";
import GalleryItem from "../GalleryItem/GalleryItem";
import s from "./Gallery.module.css";

export default function Gallery({ images,onClickGal }) {
    return (
        <ul className={s.list} >
            {images.map((image,i) => {
                return (<GalleryItem image={image} key={i} onClickGal={onClickGal}/>)
            })
            }
        </ul>
    )
}

Gallery.propTypes = {
    images: PropTypes.array.isRequired,
    onClickGal: PropTypes.func.isRequired,
};