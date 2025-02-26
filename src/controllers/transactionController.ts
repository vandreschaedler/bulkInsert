import { Request, Response } from "express";
import { TransactionService } from "../services/transactionService";

export class TransactionController {
  private service: TransactionService;

  constructor(service: TransactionService) {
    this.service = service;
  }

  async bulkInsert(req: Request, res: Response): Promise<Response> {
    try {
      const { transactions } = req.body;
      if (!Array.isArray(transactions)) {
        return res
          .status(400)
          .json({ message: "transactions must be an array." });
      }
      const count = await this.service.bulkInsert(transactions);
      return res.json({
        message: `${count} transactions inserted successfully.`,
      });
    } catch (error) {
      console.error("Error in bulkInsert:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      const { transactionIds } = req.body;
      if (!Array.isArray(transactionIds)) {
        return res
          .status(400)
          .json({ message: "transactionIds must be an array." });
      }
      const modifiedCount = await this.service.bulkUpdateStatus(transactionIds);
      return res.json({ message: `${modifiedCount} transactions updated.` });
    } catch (error) {
      console.error("Error in updateStatus:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  async listTransactions(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { data, total } = await this.service.listTransactions(page, limit);
      const totalPages = Math.ceil(total / limit);
      return res.json({ page, totalPages, data });
    } catch (error) {
      console.error("Error in listTransactions:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }
}
