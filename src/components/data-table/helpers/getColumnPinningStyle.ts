import type { Column } from "@tanstack/react-table";

const getColumnStyle = <TData>(column: Column<TData>): React.CSSProperties => {
  const pinnedSide = column.getIsPinned();

  if (!pinnedSide) {
    return {};
  }

  return {
    position: "sticky",
    left: pinnedSide === "left" ? `${column.getStart("left")}px` : undefined,
    right: pinnedSide === "right" ? `${column.getAfter("right")}px` : undefined,
    zIndex: 1,
  };
};

export default getColumnStyle;
