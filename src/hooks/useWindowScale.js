import React from "react";

function getWindowScale() {
  const { devicePixelRatio: windowScaleValue } = window;
  let currentWindowScaleValue = windowScaleValue * 100;
  return {
    currentWindowScaleValue,
  };
}

export const useWindowScale = () => {
  const [currentChartMargin, setCurrentChartMargin] = React.useState({
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  });
  const [windowDimensions, setWindowDimensions] = React.useState(
    getWindowScale()
  );

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowScale());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    switch (windowDimensions.currentWindowScaleValue) {
      case 31.25:
        setCurrentChartMargin({ top: 25, right: 25, left: 140, bottom: 19 });
        break;
      case 41.66666865348816:
        setCurrentChartMargin({ top: 20, right: 15, left: 100, bottom: 15 });
        break;
      case 62.5:
        setCurrentChartMargin({ right: 10, left: 50 });
        break;
      case 83.33333730697632:
        setCurrentChartMargin({ right: 10, left: 25 });
        break;
      case 93.75:
        setCurrentChartMargin({ left: 15 });
        break;
      case 100:
        setCurrentChartMargin({ left: 10 });
        break;
      case 137.5:
        setCurrentChartMargin({ left: -5, bottom: -10 });
        break;
      case 156.25:
        setCurrentChartMargin({ left: -12, bottom: -10 });
        break;
      case 187.5:
        setCurrentChartMargin({ left: -20, bottom: -15 });
        break;
      case 218.75:
        setCurrentChartMargin({ left: -25, bottom: -15 });
        break;
      case 250:
        setCurrentChartMargin({ left: -27, bottom: -15 });
        break;
      case 312.5:
        setCurrentChartMargin({ left: -32, bottom: -17 });
        break;
      case 375:
        setCurrentChartMargin({ left: -35, bottom: -17 });
        break;
      case 500:
        setCurrentChartMargin({ left: -40, bottom: -17 });
        break;
      case 625:
        setCurrentChartMargin({ left: -42, bottom: -19 });
        break;
      default:
        setCurrentChartMargin({ top: 0, right: 0, left: 0, bottom: 0 });
        break;
    }
  }, [windowDimensions.currentWindowScaleValue]);

  return currentChartMargin;
};
