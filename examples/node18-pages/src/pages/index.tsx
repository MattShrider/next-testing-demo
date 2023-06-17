import { Incrementor } from "@/components/Incrementor/Incrementor";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <form>
        <div>Your count is {count}</div>
        <Incrementor onIncrement={() => setCount((c) => c + 1)} />
      </form>
    </main>
  );
}
