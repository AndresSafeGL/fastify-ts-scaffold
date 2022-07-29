import type { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/example", async function () {
    return "this is an example";
  });
};

export default example;
