import React from "react";

const Slider = ({ children }) => {
  const containerRef = React.useRef(null);
  const styles = {
    hidescroll: {
      width: "100%",

      overflow: "hidden",
    },
    container: {
      width: "100%",

      overflowX: "auto",
      paddingBottom: 10,
      marginBottom: -10,
    },
  };

  return (
    <div className="slider-wrapper" style={styles.hidescroll}>
      <div
        className="slider-container"
        style={styles.container}
        ref={containerRef}
      >
        {children}
      </div>
    </div>
  );
};
export default Slider;
