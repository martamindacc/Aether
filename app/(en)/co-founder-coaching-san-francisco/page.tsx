import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHubBySlug } from "@/lib/hubs";
import { HubPage, hubMetadata } from "@/components/hub-page";

const SLUG = "co-founder-coaching-san-francisco";

function loadHub() {
  const hub = getHubBySlug(SLUG);
  if (!hub || hub.lang !== "en") notFound();
  return hub;
}

export function generateMetadata(): Metadata {
  return hubMetadata(loadHub());
}

export default function CofounderCoachingSanFranciscoPage() {
  return <HubPage hub={loadHub()} />;
}
