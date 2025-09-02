import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section>
      <ModeToggle />
      <h1>Welcome to Aqua DAO</h1>
      <p>A decentralized autonomous organization for Web3</p>
      <Button>Get Started</Button>
    </section>
  );
}
