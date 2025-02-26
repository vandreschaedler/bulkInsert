# Transactions API

This API is developed in TypeScript using SOLID principles and connected to MongoDB.
It implements the following endpoints:

1. **Bulk Insert Transactions**
   - **Endpoint:** `POST /transactions/bulk-insert`
   - **Payload:** 
     ```json
     {
       "transactions": [
         {
           "user": { "id": "user_id", "name": "User Name" },
           "type": "purchase",
           "amount": 100,
           "currency": "USD",
           "status": "pending"
         }
       ]
     }
     ```
   - **Response:** 
     ```json
     { "message": "X transactions inserted successfully." }
     ```

2. **Bulk Update Transaction Status**
   - **Endpoint:** `PATCH /transactions/update-status`
   - **Payload:**
     ```json
     {
       "transactionIds": ["id1", "id2"]
     }
     ```
   - **Update Rules:**
     - "pending" → "approved"
     - "rejected" → "pending"
     - "approved" and "cancelled" are not modified.
   - **Response:**
     ```json
     { "message": "X transactions updated." }
     ```

3. **List Transactions with Pagination**
   - **Endpoint:** `GET /transactions?page=1&limit=10`
   - **Response:**
     ```json
     {
       "page": 1,
       "totalPages": Y,
       "data": [ /* transactions without the createdAt field */ ]
     }
     ```

JSON Schema for the API to import in Postman:

```json
{
  "info": {
    "_postman_id": "f9a0c2d4-3e4b-4e6f-9c1d-123456789abc",
    "name": "API de Transações",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Inserir Transações em Massa",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"transactions\": [\n    {\n      \"user\": { \"id\": \"123e4567-e89b-12d3-a456-426614174000\", \"name\": \"Vandré Schaedler\" },\n      \"type\": \"purchase\",\n      \"amount\": 100,\n      \"currency\": \"BRL\",\n      \"status\": \"pending\"\n    },\n    {\n      \"user\": { \"id\": \"123e4567-e89b-12d3-a456-426614174001\", \"name\": \"Karina Maluf\" },\n      \"type\": \"withdrawal\",\n      \"amount\": 50,\n      \"currency\": \"BRL\",\n      \"status\": \"pending\"\n    }\n  ]\n}"
        },
        "url": {
          "raw": "http://localhost:3000/transactions/bulk-insert",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "transactions",
            "bulk-insert"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Atualizar Status em Massa das Transações",
      "request": {
        "method": "PATCH",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"transactionIds\": [\n    \"123e4567-e89b-12d3-a456-426614174002\",\n    \"123e4567-e89b-12d3-a456-426614174003\"\n  ]\n}"
        },
        "url": {
          "raw": "http://localhost:3000/transactions/update-status",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "transactions",
            "update-status"
          ]
        }
      },
      "response": []
    },
    {
      "name": "Listar Transações com Paginação",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/transactions?page=1&limit=10",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "3000",
          "path": [
            "transactions"
          ],
          "query": [
            {
              "key": "page",
              "value": "1"
            },
            {
              "key": "limit",
              "value": "10"
            }
          ]
        }
      },
      "response": []
    }
  ]
}


```

## How to Run the Project

### Using Docker

Make sure you have Docker and Docker Compose installed.

1. Clone the repository.
2. In the project root, run:
   ```bash
   docker-compose up --build


