import { AuthUser } from "./authUser";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
