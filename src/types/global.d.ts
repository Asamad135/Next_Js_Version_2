declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}
