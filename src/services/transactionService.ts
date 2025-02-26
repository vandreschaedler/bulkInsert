import { TransactionRepository } from "../repositories/transactionRepository";
import { Transaction } from "../models/transaction";

export class TransactionService {
  private repository: TransactionRepository;

  constructor(repository: TransactionRepository) {
    this.repository = repository;
  }

  async bulkInsert(transactions: Transaction[]): Promise<number> {
    return this.repository.bulkInsert(transactions);
  }

  async bulkUpdateStatus(transactionIds: string[]): Promise<number> {
    return this.repository.bulkUpdateStatus(transactionIds);
  }

  async listTransactions(
    page: number,
    limit: number
  ): Promise<{ data: Transaction[]; total: number }> {
    return this.repository.listTransactions(page, limit);
  }
}
