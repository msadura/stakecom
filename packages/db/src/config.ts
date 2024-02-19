if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export const connectionString = process.env.DATABASE_URL.includes("?sslmode=")
  ? process.env.DATABASE_URL
  : `${process.env.DATABASE_URL}?sslmode=no-verify`;
