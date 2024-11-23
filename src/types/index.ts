export interface TaxCalculationRequest {
  amount: number;
  taxRate?: number;
}

export interface TaxCalculationResponse {
  originalAmount: number;
  taxAmount: number;
  totalAmount: number;
}

export enum ECsvStatus {
  processing = "processing",
  completed = "completed",
  failed = "failed",
}

export interface CsvGenerationResponse {
  jobId: string;
  status: ECsvStatus;
  downloadUrl?: string;
}

export interface WorkerData {
  jobId: string;
  data: any[];
}

export interface WorkerConfig {
  name: string;
  extension: string;
  execArgv?: string[];
}
