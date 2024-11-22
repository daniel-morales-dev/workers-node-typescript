export interface WorkerMessage {
  workerId: string;
  value: string;
  partition: number;
  offset: string;
}
