import Piscina from "piscina";
import path from "path";

export class BaseWorkerConfig {
  protected static getEnvironmentConfig() {
    const isProd = process.env.NODE_ENV === "production";
    return {
      extension: isProd ? "js" : "ts",
      execArgv: isProd ? undefined : ["-r", "ts-node/register"],
    };
  }

  protected static createWorkerPool(workerName: string): Piscina {
    const config = this.getEnvironmentConfig();

    return new Piscina({
      filename: path.resolve(
        __dirname,
        `../workers/${workerName}.${config.extension}`
      ),
      ...(config.execArgv ? { execArgv: config.execArgv } : {}),
    });
  }
}
