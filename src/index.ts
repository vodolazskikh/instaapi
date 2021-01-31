import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app
  .get("/", (_req: Request, res: Response) => {
    res.send("Апи работает окей - на ts");
  })
  .get("/auth", (req: Request, res: Response) => {
    const code = req.query.code;
    res.send(code);
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`));
