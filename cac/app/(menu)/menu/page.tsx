
import { MenuClient } from "./MenuClient";

export default async function MenuPage() {
  // Artificial delay to show loading screen
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return <MenuClient />;
}
