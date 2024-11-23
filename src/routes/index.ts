import express from "express";
import { TaxCalculatorController } from "../controllers/taxCalculator";
import { csvGeneratorService } from "../services/csvGenerator";

const router = express.Router();
const taxCalculator = new TaxCalculatorController();

router.post("/calculate-tax", (req, res) => {
  try {
    const result = taxCalculator.calculateTax(req.body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/generate-csv", async (req, res) => {
  try {
    const jobStatus = await csvGeneratorService.generateCsv(req.body);
    res.json(jobStatus);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/csv-status/:jobId", (req, res) => {
  const status = csvGeneratorService.getJobStatus(req.params.jobId);
  if (!status) res.status(404).json({ error: "Job not found" });
  res.json(status);
});

export default router;
