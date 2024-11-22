import { ChildProcess, fork } from "child_process";
import path from "path";
import { WorkerMessage } from "./workerMessage.interface";

const isDevelopment = process.env.NODE_ENV !== "production";

const workerPath = isDevelopment
  ? path.resolve(__dirname, "./worker.ts")
  : path.resolve(__dirname, "./worker.js");

const workers = ["worker1", "worker2", "worker3"];

workers.forEach((workerId) => {
  const workerProcess: ChildProcess = fork(workerPath, [], {
    env: { WORKER_ID: workerId },
    execArgv: isDevelopment ? ["-r", "ts-node/register"] : [],
  });

  workerProcess.on("message", (msg: WorkerMessage) => {
    console.log(`[Main] Mensaje recibido de ${msg.workerId}:`, msg);
  });

  workerProcess.stdout?.on("data", (data) => {
    console.log(`[${workerId}] ${data.toString().trim()}`);
  });

  workerProcess.stderr?.on("data", (data) => {
    console.error(`[${workerId}] Error: ${data.toString().trim()}`);
  });

  workerProcess.on("exit", (code) => {
    console.log(`[${workerId}] Proceso finalizado con código ${code}`);
  });
});
