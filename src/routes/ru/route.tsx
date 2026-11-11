import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ru")({
  head: () => ({
    meta: [
      { title: "Атлас ликвидности" },
      {
        name: "description",
        content: "Модель 1990–2050 для США, России, Европы и Китая. Куда садятся новые деньги.",
      },
    ],
  }),
  component: function RuLayout() {
    return <Outlet />;
  },
});
