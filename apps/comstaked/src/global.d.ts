// this file is conditionally added/removed to next-env.d.ts
// if the static image import handling is enabled

declare module "*.svg" {
  /**
   * Use `any` to avoid conflicts with
   * `@svgr/webpack` plugin or
   * `babel-plugin-inline-react-svg` plugin.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;

  export default content;
}
