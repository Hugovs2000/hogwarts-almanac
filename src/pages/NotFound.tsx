import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <div>
      <h1>Not Found. Return Home</h1>
      <A href="/">Home</A>
    </div>
  );
}
