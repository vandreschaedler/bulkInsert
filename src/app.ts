import express from "express";
import bodyParser from "body-parser";
import { createTransactionRoutes } from "./routes/transactionRoutes";

export const createApp = (transactionController: any) => {
  const app = express();

  app.use(bodyParser.json());
  app.use("/transactions", createTransactionRoutes(transactionController));

  return app;
};
