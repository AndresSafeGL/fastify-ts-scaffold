import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { fastifyAwilixPlugin, diContainer } from "@fastify/awilix";
import type { FastifyPluginAsync } from "fastify";

import { asClass, Lifetime } from "awilix";
import AuthenticationService from "./services/AuthenticationService";

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  void fastify.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: true,
  });

  diContainer.register({
    authenticationService: asClass(AuthenticationService, {
      lifetime: Lifetime.SINGLETON,
      dispose: (module) => module.dispose(),
    }),
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    dirNameRoutePrefix: false,
    options: opts,
  });
};

export default app;
export { app };
