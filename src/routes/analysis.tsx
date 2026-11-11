import { createFileRoute } from "@tanstack/react-router";
import { TheoryPage } from "@/components/theory-page";

export const Route = createFileRoute("/analysis")({
  component: function Analysis() {
    return <TheoryPage locale="en" />;
  },
});
