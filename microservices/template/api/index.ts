// api/index.ts
import { app } from "./server";
const PORT = process.env.PORT || 3000;

const bootstrap = async (port: number) => {
  try {
    await app.listen({ port });
    console.log(`🚀 Template Server ready`);
  } catch (error) {
    console.error(error);
  }
};

bootstrap(Number(PORT));
