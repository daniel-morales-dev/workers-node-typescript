import { TaxCalculationRequest, TaxCalculationResponse } from "../types";

export class TaxCalculatorController {
  calculateTax(request: TaxCalculationRequest): TaxCalculationResponse {
    const { amount, taxRate = 0.19 } = request;
    const taxAmount = amount * taxRate;

    return {
      originalAmount: amount,
      taxAmount,
      totalAmount: amount + taxAmount,
    };
  }
}
