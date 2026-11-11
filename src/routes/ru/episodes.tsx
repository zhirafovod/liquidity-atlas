import { createFileRoute } from "@tanstack/react-router";
import { EpisodesPage } from "@/components/episodes-page";

export const Route = createFileRoute("/ru/episodes")({
  component: function RuEpisodes() {
    return <EpisodesPage locale="ru" />;
  },
});
