import PropTypes from "prop-types";
import s from "./GalleryItem.module.css";

export default function GalleryItem({ image,onClickGal }) {
    const { webformatURL,largeImageURL,tags } = image
    return (
        <li className={s.item}>
            <img
                src={webformatURL}
                alt={tags}
                className={s.img}
                data-source={largeImageURL}
                onClick={() => onClickGal({ largeImageURL })}
            />
        </li>
    )
}

GalleryItem.propTypes = {
    image: PropTypes.object.isRequired,
    onClickGal: PropTypes.func.isRequired,
};