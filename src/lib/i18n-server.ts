import { cookies } from "next/headers";
import { COOKIE_NAME, isValidLang, type Lang } from "./i18n";

export async function getLang(): Promise<Lang> {
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (isValidLang(value)) return value;
  return "de";
}
