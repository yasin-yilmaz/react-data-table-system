import type { Column } from "@tanstack/react-table";

const getColumnStyle = <TData>(column: Column<TData>): React.CSSProperties => {
  const pinnedSide = column.getIsPinned();

  if (!pinnedSide) {
    return {};
  }

  const isLastLeftPinned =
    pinnedSide === "left" && column.getIsLastColumn("left");

  const isFirstRightPinned =
    pinnedSide === "right" && column.getIsFirstColumn("right");

  return {
    position: "sticky",
    left: pinnedSide === "left" ? `${column.getStart("left")}px` : undefined,
    right: pinnedSide === "right" ? `${column.getAfter("right")}px` : undefined,
    zIndex: 1,
    background: "var(--background)",
    boxShadow: isLastLeftPinned
      ? "2px 0 5px -2px rgba(0, 0, 0, 0.1)"
      : isFirstRightPinned
        ? "-2px 0 5px -2px rgba(0, 0, 0, 0.1)"
        : undefined,
  };
};

export default getColumnStyle;
