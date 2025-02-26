import { Db, ObjectId } from "mongodb";
import { Transaction } from "../models/transaction";

export class TransactionRepository {
  private db: Db;
  private collectionName = "transactions";

  constructor(db: Db) {
    this.db = db;
  }

  async bulkInsert(transactions: Transaction[]): Promise<number> {
    const docs = transactions.map((t) => ({
      ...t,
      _id: t._id ? new ObjectId(t._id) : undefined,
      createdAt: new Date(),
    }));
    const result = await this.db
      .collection(this.collectionName)
      .insertMany(docs);
    return result.insertedCount;
  }

  async bulkUpdateStatus(transactionIds: string[]): Promise<number> {
    const objectIds = transactionIds.map((id) => new ObjectId(id));

    const transactions = await this.db
      .collection(this.collectionName)
      .find({
        _id: { $in: objectIds },
      })
      .toArray();

    const bulkOps = transactions
      .map((transaction) => {
        let newStatus: string | null = null;
        if (transaction.status === "pending") {
          newStatus = "approved";
        } else if (transaction.status === "rejected") {
          newStatus = "pending";
        }
        if (newStatus) {
          return {
            updateOne: {
              filter: { _id: transaction._id },
              update: { $set: { status: newStatus } },
            },
          };
        }
        return null;
      })
      .filter((op): op is NonNullable<typeof op> => op !== null);

    if (bulkOps.length === 0) {
      return 0;
    }

    const result = await this.db
      .collection(this.collectionName)
      .bulkWrite(bulkOps);
    return result.modifiedCount;
  }

  async listTransactions(
    page: number,
    limit: number
  ): Promise<{ data: Transaction[]; total: number }> {
    const skip = (page - 1) * limit;
    const cursor = this.db
      .collection<Transaction>(this.collectionName)
      .find({}, { projection: { createdAt: 0 } })
      .skip(skip)
      .limit(limit);

    const data = await cursor.toArray();
    const total = await this.db
      .collection(this.collectionName)
      .countDocuments();
    return { data, total };
  }
}
