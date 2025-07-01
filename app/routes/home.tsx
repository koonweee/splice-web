import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "splice-web" },
    { name: "description", content: "simple frontend for splice" },
  ];
}

export default function Home() {
  return <Welcome />;
}
