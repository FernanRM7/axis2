import type { ComponentProps } from "react"
import type { Button } from "@/components/ui/button"
import type { Badge } from "@/components/ui/badge"
import type { Toggle } from "@/components/ui/toggle"

export const styles = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof Button>["variant"]
>[]
export const badgeStyles = [
  "default",
  "secondary",
  "destructive",
  "outline",
  "ghost",
  "link",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof Badge>["variant"]
>[]
export const buttonSizes = [
  "xs",
  "sm",
  "default",
  "lg",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof Button>["size"]
>[]
export const iconSizes = [
  "icon-xs",
  "icon-sm",
  "icon",
  "icon-lg",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof Button>["size"]
>[]
export const toggleStyles = [
  "default",
  "outline",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof Toggle>["variant"]
>[]
export const toggleSizes = [
  "sm",
  "default",
  "lg",
] as const satisfies readonly NonNullable<
  ComponentProps<typeof Toggle>["size"]
>[]
export const spacing = [4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 176]
export const radii = [
  ["sm", "6 px"],
  ["md", "8 px"],
  ["lg", "10 px"],
  ["xl", "14 px"],
  ["2xl", "18 px"],
  ["3xl", "22 px"],
  ["4xl", "26 px"],
] as const
export const typeScale = [
  {
    role: "Hero · desktop XL",
    size: 72,
    leading: 1,
    weight: 300,
    tracking: "-0.05em",
    utility: "text-7xl · tracking-tighter",
    text: "Work flows better.",
  },
  {
    role: "Hero · desktop",
    size: 60,
    leading: 1,
    weight: 300,
    tracking: "-0.05em",
    utility: "text-6xl · tracking-tighter",
    text: "A simpler way to work.",
  },
  {
    role: "Hero · tablet",
    size: 48,
    leading: 1,
    weight: 300,
    tracking: "-0.05em",
    utility: "text-5xl · tracking-tighter",
    text: "Everything in sync.",
  },
  {
    role: "Título de sección",
    size: 36,
    leading: 40 / 36,
    weight: 500,
    tracking: "-0.025em",
    utility: "text-4xl · font-medium",
    text: "Built around your workflow",
  },
  {
    role: "Título · móvil",
    size: 30,
    leading: 36 / 30,
    weight: 500,
    tracking: "-0.025em",
    utility: "text-3xl · font-medium",
    text: "One place. Every project.",
  },
  {
    role: "Título · auth",
    size: 24,
    leading: 32 / 24,
    weight: 500,
    tracking: "-0.025em",
    utility: "text-2xl · font-medium",
    text: "Create an account",
  },
  {
    role: "Introducción",
    size: 20,
    leading: 28 / 20,
    weight: 300,
    tracking: "0",
    utility: "text-xl · font-light",
    text: "Tools that fit the way you work.",
  },
  {
    role: "Subtítulo",
    size: 18,
    leading: 28 / 18,
    weight: 500,
    tracking: "0",
    utility: "text-lg · font-medium",
    text: "Bring your ideas together",
  },
  {
    role: "Cuerpo",
    size: 16,
    leading: 24 / 16,
    weight: 300,
    tracking: "0",
    utility: "text-base · heredado del layout",
    text: "Manage projects, people and everything in between.",
  },
  {
    role: "Controles y descripción",
    size: 14,
    leading: 20 / 14,
    weight: 500,
    tracking: "0",
    utility: "text-sm · font-medium (controles)",
    text: "Continue with your email address",
  },
  {
    role: "Metadatos",
    size: 12,
    leading: 16 / 12,
    weight: 300,
    tracking: "0",
    utility: "text-xs",
    text: "Your workspace, always connected.",
  },
]
export const tokenGroups = [
  {
    title: "Superficies y texto",
    names: [
      "background",
      "foreground",
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
      "muted",
      "muted-foreground",
    ],
  },
  {
    title: "Acciones y estados",
    names: [
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
      "accent",
      "accent-foreground",
      "destructive",
      "destructive-foreground",
      "border",
      "input",
      "ring",
    ],
  },
  { title: "Acento del hero", names: ["hero-start", "hero-mid", "hero-end"] },
  {
    title: "Gráficas · definidos, sin uso en páginas",
    names: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  },
  {
    title: "Sidebar · definida, sin uso en páginas",
    names: [
      "sidebar",
      "sidebar-foreground",
      "sidebar-primary",
      "sidebar-primary-foreground",
      "sidebar-accent",
      "sidebar-accent-foreground",
      "sidebar-border",
      "sidebar-ring",
    ],
  },
]
export type TokenValues = {
  light: Record<string, string>
  dark: Record<string, string>
}
export const coverage = [
  {
    component: "Button",
    cases:
      "6 estilos · 4 tamaños · 4 iconos · disabled · invalid · icono inicial/final",
  },
  { component: "Badge", cases: "6 estilos · icono · enlace" },
  {
    component: "Input + Label",
    cases:
      "vacío · completado · disabled · readOnly · invalid · password · file",
  },
  { component: "Toggle", cases: "2 estilos · 3 tamaños · pressed · disabled" },
  {
    component: "ToggleGroup",
    cases:
      "2 estilos · 3 tamaños · horizontal/vertical · única/múltiple · spacing",
  },
  {
    component: "Avatar",
    cases: "3 tamaños · imagen/fallback · badge · grupo + contador",
  },
  {
    component: "Card",
    cases: "default/sm · header · description · action · content · footer",
  },
  {
    component: "DropdownMenu",
    cases:
      "4 lados · 3 alineaciones · modal/no modal · item · destructive · disabled · checkbox · radio · submenú",
  },
  {
    component: "Separator + Skeleton",
    cases: "horizontal/vertical · carga de perfil y texto",
  },
]
