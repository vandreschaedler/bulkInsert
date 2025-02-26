import { Router } from "express";
import { TransactionController } from "../controllers/transactionController";

export const createTransactionRoutes = (
  controller: TransactionController
): Router => {
  const router = Router();

  router.post("/bulk-insert", controller.bulkInsert.bind(controller));
  router.patch("/update-status", controller.updateStatus.bind(controller));
  router.get("/", controller.listTransactions.bind(controller));

  return router;
};
