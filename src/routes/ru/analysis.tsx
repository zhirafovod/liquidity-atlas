import { createFileRoute } from "@tanstack/react-router";
import { TheoryPage } from "@/components/theory-page";

export const Route = createFileRoute("/ru/analysis")({
  component: function RuAnalysis() {
    return <TheoryPage locale="ru" />;
  },
});
