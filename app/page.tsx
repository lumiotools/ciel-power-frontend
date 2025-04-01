'use server';
import { permanentRedirect } from "next/navigation";

export default async function Home() {
  permanentRedirect("/login");
}
