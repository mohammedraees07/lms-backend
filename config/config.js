import "dotenv/config";

const requiredEnvs = [
  "MONGO_URI",
  "PORT",
  "JWT_SECRET_KEY",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

// Application configuration validation
//Fail Fast principle. (it breaks bfr server starts)

for (const key of requiredEnvs) {
  if (!process.env[key]) {
    throw new Error(
      `Configuration Error: Missing environment variable for ${key}`,
    );
  }
}

const config = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default config;
