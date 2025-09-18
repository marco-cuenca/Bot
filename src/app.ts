import * as dotenv from "dotenv";

dotenv.config();

import { createBot, createProvider, createFlow } from "@builderbot/bot";
import { MysqlAdapter as Database } from "@builderbot/database-mysql";
import { idleFlow } from "./application/flows/idle-custom.flow";
import { welcomeFlows } from "./application/flows/welcome.flow";
import { schedulerFlows } from "./application/flows/scheduler.flow";
// import { MetaProvider as Provider } from "@builderbot/provider-meta";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";

const PORT = process.env.PORT ?? 3011;

const main = async () => {
  const adapterFlow = createFlow([
    ...welcomeFlows,
    ...schedulerFlows,
    idleFlow,
  ]);

  const adapterProvider = createProvider(Provider);

  // const adapterProvider = createProvider(Provider, {
  //   jwtToken: process.env.JWT_TOKEN,
  //   numberId: process.env.NUMBER_ID,
  //   verifyToken: "chatbot-ci",
  //   version: "v22.0",
  // });

  const MYSQL_DB_HOST = "localhost";
  const MYSQL_DB_USER = "root";
  const MYSQL_DB_PASSWORD = "";
  const MYSQL_DB_NAME = "bot";

  const adapterDB = new Database({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASSWORD,
    port: 3306,
  });

  const { handleCtx, httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });

  adapterProvider.server.post(
    "/v1/messages",
    handleCtx(async (bot, req, res) => {
      const { number, message, urlMedia } = req.body;
      await bot.sendMessage(number, message, { media: urlMedia ?? null });
      return res.end("sended");
    })
  );

  adapterProvider.server.post(
    "/v1/register",
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body;
      await bot.dispatch("REGISTER_FLOW", { from: number, name });
      return res.end("trigger");
    })
  );

  adapterProvider.server.post(
    "/v1/samples",
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body;
      await bot.dispatch("SAMPLES", { from: number, name });
      return res.end("trigger");
    })
  );

  adapterProvider.server.post(
    "/v1/blacklist",
    handleCtx(async (bot, req, res) => {
      const { number, intent } = req.body;
      if (intent === "remove") bot.blacklist.remove(number);
      if (intent === "add") bot.blacklist.add(number);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ status: "ok", number, intent }));
    })
  );

  httpServer(+PORT);
};

main();
