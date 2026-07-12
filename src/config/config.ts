import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("3000"),
  MONGO_URI: z.url("MONGO_URI must be a valid URL string"),
  JWT_SECRET_KEY: z.string().min(1, "JWT_SECRET_KEY cannot be empty"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "CLOUDINARY_CLOUD_NAME cannot be empty"),
  CLOUDINARY_API_KEY: z.string().min(1, "CLOUDINARY_API_KEY cannot be empty"),
  CLOUDINARY_API_SECRET: z.string().min(1, "CLOUDINARY_API_SECRET cannot be empty"),
})

const parsedEnv = envSchema.safeParse(process.env)

if (!parsedEnv.success) {
  console.error("Invalid environment variables configuration:")
  console.error(z.flattenError(parsedEnv.error));
  process.exit(1);
}

const env = parsedEnv.data;

const config = {
  NODE_ENV: env.NODE_ENV,
  MONGO_URI: env.MONGO_URI,
  PORT: env.PORT,
  JWT_SECRET_KEY: env.JWT_SECRET_KEY,
  CLOUDINARY: {
    CLOUD_NAME: env.CLOUDINARY_CLOUD_NAME,
    API_KEY: env.CLOUDINARY_API_KEY,
    API_SECRET: env.CLOUDINARY_API_SECRET,
  }
}

export default config;
