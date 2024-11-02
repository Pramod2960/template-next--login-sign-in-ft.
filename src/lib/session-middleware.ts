import "server-only";

import { getCookie } from "hono/cookie";
import {
  Account,
  Client,
  Databases,
  Models,
  Storage,
  Storage as StorageType,
  type Account as AccountType,
  type Databases as DatabasesType,
  type Users as UsersType,
} from "node-appwrite";
import { createMiddleware } from "hono/factory";
import { AUTH_COOKIE } from "@/features/auth/constants";

type AdditionalContext = {
  Variables: {
    account: AccountType;
    databases: DatabasesType;
    storage: StorageType;
    users: UsersType;
    user: Models.User<Models.Preferences>;
  };
};

export const sessionMiddleware = createMiddleware<AdditionalContext>(
  async (c, next) => {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = getCookie(c, AUTH_COOKIE);

    if (!session) {
      return c.json({ error: "Unauthroized" }, 401);
    }

    client.setSession(session);

    const account = new Account(client);
    const database = new Databases(client);
    const storage = new Storage(client);
    const user = await account.get();

    c.set("account", account);
    c.set("databases", database);
    c.set("storage", storage);
    c.set("user", user);

    await next();
  }
);