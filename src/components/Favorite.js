import React, { useEffect, useState } from "react";
import { ReactComponent as HeartEmpty } from "../assets/heartEmptysvg.svg";
import { ReactComponent as Heart } from "../assets/heart.svg";

const Favorite = ({ id }) => {
  const [isFavoris, setFavoris] = useState(false);
  useEffect(() => {
    let tabFavoris = JSON.parse(localStorage.getItem("akfRehobothFav"));
    console.log({ tabFavoris });
    if (tabFavoris) {
      let isfav = tabFavoris.includes(id);
      setFavoris(isfav);
    } else {
      setFavoris(false);
    }

    return () => {};
  }, []);

  console.log({ id });

  return isFavoris ? (
    <Heart
      onClick={() =>
        setFavoris((prevState) => {
          if (!prevState == false) {
            let tabFavoris = JSON.parse(localStorage.getItem("akfRehobothFav"));
            if (tabFavoris) {
              let newTabFavoris = tabFavoris.filter((itemId) => itemId != id);
              localStorage.setItem(
                "akfRehobothFav",
                JSON.stringify(newTabFavoris)
              );
            }
          } else {
          }

          return !prevState;
        })
      }
      style={{
        height: 20,
        width: 20,
      }}
    />
  ) : (
    <HeartEmpty
      onClick={() =>
        setFavoris((prevState) => {
          if (!prevState == true) {
            let tabFavoris = JSON.parse(localStorage.getItem("akfRehobothFav"));
            if (tabFavoris) {
              let newTabFavoris = [...tabFavoris, id];
              localStorage.setItem(
                "akfRehobothFav",
                JSON.stringify(newTabFavoris)
              );
            } else {
              let newTabFavoris = [id];
              localStorage.setItem(
                "akfRehobothFav",
                JSON.stringify(newTabFavoris)
              );
            }
          } else {
          }
          return !prevState;
        })
      }
      style={{
        height: 20,
        width: 20,
      }}
    />
  );
};

export default Favorite;
