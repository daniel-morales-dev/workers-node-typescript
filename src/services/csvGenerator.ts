import { v4 as uuidv4 } from "uuid";
import { CsvGenerationResponse, ECsvStatus } from "../types";
import Piscina from "piscina";
import { BaseWorkerConfig } from "../workers/WorkerConfig";

class CsvGeneratorService extends BaseWorkerConfig {
  private jobs: Map<string, CsvGenerationResponse>;
  private pool: Piscina;
  protected workerName: string;

  constructor(workerName: string) {
    super();
    this.workerName = workerName;
    this.jobs = new Map();

    this.pool = BaseWorkerConfig.createWorkerPool(workerName);
  }

  async generateCsv(data: any): Promise<CsvGenerationResponse> {
    const jobId = uuidv4();

    const jobStatus: CsvGenerationResponse = {
      jobId,
      status: ECsvStatus.processing,
    };

    this.jobs.set(jobId, jobStatus);

    try {
      const result = await this.pool.run({ jobId, data });
      const updatedStatus: CsvGenerationResponse = {
        ...jobStatus,
        status: ECsvStatus.completed,
        downloadUrl: result.fileUrl,
      };
      this.jobs.set(jobId, updatedStatus);
      return updatedStatus;
    } catch (error) {
      console.error("🚀 ~ CsvGeneratorService ~ error:", error);
      const updatedStatus: CsvGenerationResponse = {
        ...jobStatus,
        status: ECsvStatus.failed,
      };
      this.jobs.set(jobId, updatedStatus);
      return updatedStatus;
    }
  }

  getJobStatus(jobId: string): CsvGenerationResponse | undefined {
    return this.jobs.get(jobId);
  }
}

export const csvGeneratorService = new CsvGeneratorService("csvWorker");
