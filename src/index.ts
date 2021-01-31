import express, { Request, Response } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import fetch from "node-fetch";
import { config } from "./config";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app
  .get("/", (_req: Request, res: Response) => {
    res.send("Апи работает окей - на ts");
  })
  .get("/auth", (req: Request, res: Response) => {
    const code = req.query.code as string;
    const FormData = require("form-data");

    const form = new FormData();
    form.append("code", code);
    form.append("client_id", config.appId);
    form.append("client_secret", config.appKey);
    form.append("grant_type", "authorization_code");
    form.append("redirect_uri", `${config.api}auth`);

    const options = {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    };
    if (!code) {
      res.send("кек");
    }

    fetch(`${config.instagramApi}oauth/access_token`, options)
      .then((res) => res.json())
      .then((json) => {
        res.redirect(
          `${config.clientApp}token?accessToken=${json.access_token}&userId=${json.user_id}`
        );
      });
  })

  .listen(PORT, () => console.log(`Listening on ${PORT}`));
