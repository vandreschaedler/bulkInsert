import { createApp } from "./app";
import { connectToDatabase } from "./config/database";
import { TransactionRepository } from "./repositories/transactionRepository";
import { TransactionService } from "./services/transactionService";
import { TransactionController } from "./controllers/transactionController";

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/transactionsdb";

const startServer = async () => {
  try {
    const db = await connectToDatabase(MONGO_URI);
    const repository = new TransactionRepository(db);
    const service = new TransactionService(repository);
    const controller = new TransactionController(service);
    const app = createApp(controller);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
