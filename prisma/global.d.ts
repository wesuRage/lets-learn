// global.d.ts
import { PrismaClient } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }
  var prisma: PrismaClient; // Augment the global object for TS
}

export {}; // Ensure this file is treated as a module
