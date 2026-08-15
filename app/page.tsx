import { PortfolioPage } from "@/components/portfolio-page";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const savedPortfolioTheme = cookieStore.get("portfolio-theme-v1")?.value;
  const initialPortfolioTheme = savedPortfolioTheme === "signal" ? "signal" : "classic";

  return <PortfolioPage initialPortfolioTheme={initialPortfolioTheme} />;
}
