import { parseAsString } from "nuqs";

export const USER_FILTER_DEFS = [
  {
    id: "role",
    queryKey: "role",
    label: "Role",
    options: [
      { label: "All roles", value: "" },
      { label: "Admin", value: "admin" },
      { label: "Moderator", value: "moderator" },
      { label: "User", value: "user" },
    ],
  },
  {
    id: "gender",
    queryKey: "gender",
    label: "Gender",
    options: [
      { label: "All genders", value: "" },
      { label: "Female", value: "female" },
      { label: "Male", value: "male" },
    ],
  },
] as const;

export const USER_FILTER_QUERY_PARSERS = {
  role: parseAsString.withDefault(""),
  gender: parseAsString.withDefault(""),
};
