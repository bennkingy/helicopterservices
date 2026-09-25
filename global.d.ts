// Lets TypeScript accept stylesheet imports such as `import "../styles/globals.css"`.
// Newer TypeScript versions reject side-effect imports without a declaration.
declare module "*.css";
