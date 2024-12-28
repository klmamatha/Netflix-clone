import { favData } from "../../data/favmovie";
import { useParams } from "react-router-dom";
import UserNav from "./UserNav";

import { useCart } from "../context/CartContext";

const MovieSingle = () => {
    const { id } = useParams();

    const { addTofav, favtItems } = useCart()

    const product = favData.find((item) => item.id === id);

    return (
        <>
            <UserNav />
            <div className="ind-section">
                <div className="ind-image">
                    <img src={product.Poster} alt="" />
                </div>
                <div className="ind-details space">
                    <div className="ind-company">
                        <h2>{product.Title}</h2>
                    </div>
                    <div className="ind-model space">
                        <h3>{product.Year}</h3>
                    </div>
                    <div className="ind-price space">
                        <h2>{product.Rated}</h2>
                    </div>
                    <div className="ind-desc space">
                        <p>{product.Plot}</p>
                    </div>
                    <button onClick={() => addTofav(product)}>Add to favorite</button>
                </div>
            </div>
        </>
    );
};

export default MovieSingle;
