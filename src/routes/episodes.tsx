import { createFileRoute } from "@tanstack/react-router";
import { EpisodesPage } from "@/components/episodes-page";

export const Route = createFileRoute("/episodes")({
  component: function Episodes() {
    return <EpisodesPage locale="en" />;
  },
});
