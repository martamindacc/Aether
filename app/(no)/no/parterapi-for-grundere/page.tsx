import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHubBySlug } from "@/lib/hubs";
import { HubPage, hubMetadata } from "@/components/hub-page";

const SLUG = "parterapi-for-grundere";

function loadHub() {
  const hub = getHubBySlug(SLUG);
  if (!hub || hub.lang !== "no") notFound();
  return hub;
}

export function generateMetadata(): Metadata {
  return hubMetadata(loadHub());
}

export default function ParterapiForGrunderePage() {
  return <HubPage hub={loadHub()} />;
}
