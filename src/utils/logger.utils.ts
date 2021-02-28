export default class Logger {

  info = (message: string) => {
    console.info(`${new Date().toISOString()} [INFO]: ${message}`);
  }

  error = (message: string) => {
    console.error(`${new Date().toISOString()} [ERROR]: ${message}`);
  }
}
