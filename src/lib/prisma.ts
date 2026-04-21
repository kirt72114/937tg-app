import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    // DATABASE_URL is expected to be missing during `next build` (static
    // analysis phase), so return a stub that resolves everything to an empty
    // array instead of throwing. Log loudly at runtime so a misconfigured
    // deployment (e.g. Amplify not exposing server env vars to the SSR
    // Lambda) doesn't silently serve empty pages.
    if (process.env.NEXT_PHASE !== "phase-production-build") {
      console.error(
        "[prisma] DATABASE_URL is not set at runtime — every query will " +
          "return an empty result. Check your deployment's environment " +
          "configuration."
      );
    }
    return new Proxy({} as PrismaClient, {
      get(target, prop) {
        if (prop === "$connect" || prop === "$disconnect") {
          return () => Promise.resolve();
        }
        if (prop === "then") return undefined;
        return new Proxy(function () {}, {
          get() {
            return () => Promise.resolve([]);
          },
          apply() {
            return Promise.resolve([]);
          },
        });
      },
    });
  }

  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
