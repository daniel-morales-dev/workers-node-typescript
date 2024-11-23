import { stringify } from "csv-stringify/sync";
import { writeFile } from "fs/promises";
import path from "path";
import { WorkerData } from "../types";

async function generateCsv(workerData: WorkerData) {
  const { data } = workerData;
  console.log("🚀 ~ generateCsv ~ data:", data);

  await new Promise((resolve) => setTimeout(resolve, 10000));

  const csvContent = stringify(data, { header: true });

  const fileName = `csv-${Date.now()}.csv`;
  const filePath = path.join(
    process.env.NODE_ENV === "production" ? "/tmp" : "./temp",
    fileName
  );

  console.log("🚀 ~ generateCsv ~ filePath:", filePath);

  await writeFile(filePath, csvContent);

  const fileUrl =
    process.env.NODE_ENV === "production"
      ? `https://tu-bucket.s3.amazonaws.com/${fileName}`
      : `http://localhost:3000/downloads/${fileName}`;

  return { fileUrl };
}

export default generateCsv;
