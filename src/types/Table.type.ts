type TFilterOption = {
  label: string;
  value: string;
};

export type TFilterDef = {
  id: string;
  label: string;
  queryKey: string;
  options: TFilterOption[];
};
