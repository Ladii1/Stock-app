import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import {nextCookies} from "better-auth/next-js";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
  if (authInstance) {
    return authInstance;
  }
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    authInstance = betterAuth({
      adapter: mongodbAdapter(db as any), // Type assertion to 'any' to bypass type issues
      secret: process.env.BETTER_AUTH_SECRET!,  // Ensure this is set in your environment variables
      cookies: nextCookies(),
      baseUrl: process.env.BETTER_AUTH_URL!, // Ensure this is set in your environment variables
      emailAndPassword: {
        enabled: true,
        disableSignUp: false, 
        requireEmailVerification: false, 
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
      },
      plugins:[nextCookies()]
    });
    return authInstance;
}
export const auth = await getAuth();
