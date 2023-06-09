import { SCROLL_HANDLE_HEIGHT } from "../constants/size";

export const handleResize = (
  y,
  scrollbarRef,
  setScrollPosition,
  dispatch,
  action,
) => {
  if (!scrollbarRef.current) return;

  scrollbarRef.current.measure((fx, fy, width, height, px, py) => {
    const handlerPositionOfY = Math.max(
      0,
      Math.min(
        y - py - SCROLL_HANDLE_HEIGHT / 2,
        height - SCROLL_HANDLE_HEIGHT,
      ),
    );

    if (isNaN(handlerPositionOfY)) return;
    setScrollPosition(handlerPositionOfY);

    dispatch(action({ handlerPositionOfY, scrollHeight: height }));
  });
};
