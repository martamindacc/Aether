import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHubBySlug } from "@/lib/hubs";
import { HubPage, hubMetadata } from "@/components/hub-page";

const SLUG = "couples-therapy-for-founders";

function loadHub() {
  const hub = getHubBySlug(SLUG);
  if (!hub) notFound();
  return hub;
}

export function generateMetadata(): Metadata {
  return hubMetadata(loadHub());
}

export default function CouplesTherapyForFoundersPage() {
  return <HubPage hub={loadHub()} />;
}
