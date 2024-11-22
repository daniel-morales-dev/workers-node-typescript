const workerId = process.env.WORKER_ID || "default-worker";

async function startWorker(): Promise<void> {
  console.log("HELLO WORLD FROM WORKER", workerId);
}

// Manejar errores de ejecución
startWorker().catch((err) => {
  console.error(`[Worker ${workerId}] Error:`, err);
  process.exit(1);
});
