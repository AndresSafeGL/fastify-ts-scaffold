import { BadRequestError } from "../../utils/constants";

const login = async (fastify): Promise<string | void> => {
  fastify.post("/auth", async function (req) {
    const { username, password } = req.body || {};
    if (!username || !password) {
      req.log.error("Login - Missing required parameters");
      throw new BadRequestError("Missing required parameters");
    }

    const authenticationService = req.diScope.resolve("authenticationService");
    try {
      return await authenticationService.login({ username, password });
    } catch (error) {
      req.log.error("Login - Missing required parameters");
      throw error;
    }
  });
};

export default login;
