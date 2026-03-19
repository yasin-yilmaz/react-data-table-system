declare module "*.css";

declare module "*.scss";
declare module "*.sass";

declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}
