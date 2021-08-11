import fastify from "fastify";
import fastifyStatic from "fastify-static";
import clear from "clear";
import chalk from "chalk";
import Meta from "html-metadata-parser";
import resolve from './resolve.js'

const prefix = "/";

const root = resolve(import.meta.url, 'public');

const app = fastify({
  logger: true
});

app.register(fastifyStatic, { prefix, root });

app.get("/api", async (request, reply) => {
  const { href } = request.query
  
  console.log(href)
  
  console.log(chalk.red("--------"));
  console.log(chalk.green("Request URL : ") + href);
  
  const result = await Meta.parser(href);
  
  console.log(chalk.green("URL title : ") + result.meta.title);
  console.log(chalk.red("--------"));

  reply.send({
    status: "success",
    title: result
  });
});

await app.listen(process.env.PORT ?? 3000);