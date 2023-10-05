/**
 * Declare SCSS files as modules so we can import them into TS files and use their content
 */
declare module '*.scss'
{
    const content: { [className: string]: string };
    export = content;
}

/**
 * Declare json files as modules to import into TS files
 */
declare module '*.json'
{
    const value: any;
    export default value;
}
