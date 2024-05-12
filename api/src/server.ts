import express, { Application, Request, Response, urlencoded } from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./routes/user";
import { Sequelize } from "sequelize-typescript";
import { User } from "./models/user";

import swaggerUi from "swagger-ui-express";
import path from "path";

const app: Application = express();

app.use(bodyParser.json());
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

sequelize.addModels([User]);
sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
});

app.use(
  urlencoded({
    extended: true,
  })
);

RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
  try {
    const swaggerDocument = await import(path.resolve(__dirname, '../dist/swagger.json'));
    res.send(swaggerUi.generateHTML(swaggerDocument.default));
  } catch (error: any) {
    res.status(500).send("Failed to load swagger document: " + error.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
