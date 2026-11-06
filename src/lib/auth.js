import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("studiospace");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL, 
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [jwt({ sessionCookieCache: true })],
  session: {
    enabled: true,
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      strategy: "jwt",
    },
  }
});
