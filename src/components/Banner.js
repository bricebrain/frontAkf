/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";

import p0 from "../assets/a-store-th-magic-wiyk.jpeg";
import p1 from "../assets/black-woma-magic-mlsm.jpeg";
import p2 from "../assets/black-woma-magic-zdjx.jpeg";
import p3 from "../assets/a-smiling--magic-exwa.jpeg";
import p4 from "../assets/a-smiling--magic-hfbh.jpeg";
import p5 from "../assets/a-store-th-magic-vwfv.jpeg";

import p6 from "../assets/black-woma-magic-dtay.jpeg";
// import p6 from "../assets/black-woma-magic-gcgc.jpeg";
import p7 from "../assets/black-woma-magic-tbnq.jpeg";
import p8 from "../assets/black-woma-magic-yhco.jpeg";
import p9 from "../assets/a-smiling--magic-exwa.jpeg";

const tabImage = {
  0: p0,
  1: p1,
  2: p2,
  3: p3,
  4: p4,
  5: p5,

  6: p6,
  // import p6 from "../assets/black-woma-magic-gcgc.jpeg";
  7: p7,
  8: p8,
  9: p9,
};

const Banner = () => {
  const [image, setImage] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setTimeout(() => {
        setImage((prevState) => {
          if (prevState == 9) {
            return 0;
          }
          return prevState + 1;
        });
      }, 5000);
    }, 10000);

    return () => {};
  }, []);

  return (
    <div style={{ width: "100%", height: "40%" }}>
      <img
        src={tabImage[image]}
        height={"100%"}
        width={"100%"}
        style={{ objectFit: "fill" }}
      />
    </div>
  );
};

export default Banner;
