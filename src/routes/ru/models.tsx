import { createFileRoute } from "@tanstack/react-router";
import { ModelsPage } from "@/components/models-page";

export const Route = createFileRoute("/ru/models")({
  component: function RuModels() {
    return <ModelsPage locale="ru" />;
  },
});
