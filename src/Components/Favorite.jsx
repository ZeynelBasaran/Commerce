

import { useEffect, useMemo, useState,useContext } from "react";
import { FaRegHeart } from "react-icons/fa";
import { ContextPage } from "../ContextApi/ContextPage";

const FavoriteBar = ({ productID }) => {
    const { toggleFavorite, favorites } = useContext(ContextPage);
    const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    setIsFavorite(favorites.some((item) => item === productID));
  }, [favorites]);

  return (
    <div className="absolute left-2 top-2 cursor-pointer">
      <FaRegHeart
        color={isFavorite ? "red" : "black"}
        size={25}
        onClick={() => {
          toggleFavorite(productID);
        }}
      />
    </div>
  );
};

export default FavoriteBar;