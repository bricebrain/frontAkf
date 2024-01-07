/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const Slider = ({ children }) => {
  const containerRef = React.useRef(null);

  const styles = {
    hidescroll: {
      width: "100%",
      overflow: "hidden",
    },
    container: {
      overflowY: "auto",
      border: "1px solid lightgrey",
      borderRadius: 15,
      paddingBottom: 30,
    },
  };

  return (
    <div className="sliderVertical-wrapper" style={styles.hidescroll}>
      <div
        className="sliderVertical-container"
        style={styles.container}
        ref={containerRef}
      >
        {children}
      </div>
    </div>
  );
};
export default Slider;
