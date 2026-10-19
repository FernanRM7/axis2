"use client"

import { useState, useSyncExternalStore, type ReactNode } from "react"
import { useTheme } from "next-themes"
import {
  ArrowRight,
  Bold,
  Check,
  ChevronDown,
  Copy,
  Italic,
  Moon,
  Plus,
  Sun,
  Underline,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  badgeStyles,
  buttonSizes,
  coverage,
  iconSizes,
  radii,
  spacing,
  styles as variants,
  toggleSizes,
  toggleStyles,
  tokenGroups,
  typeScale,
  type TokenValues,
} from "./catalog"
import s from "./canvas.module.css"

const subscribe = () => () => {}
function Group({
  id,
  title,
  source,
  children,
}: {
  id: string
  title: string
  source: string
  children: ReactNode
}) {
  return (
    <section id={id} className={s.group} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={s.groupTitle}>
        {title}
        <span>{source}</span>
      </h2>
      <div className={s.groupBody} data-preview>
        {children}
      </div>
    </section>
  )
}
function Sample({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={s.sample}>
      <div className={s.sampleContent}>{children}</div>
      <span className={s.caption}>{label}</span>
    </div>
  )
}
function Row({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={s.stack}>
      <h3 className={s.label}>{title}</h3>
      <div className={s.examples}>{children}</div>
    </div>
  )
}
function MenuSample({
  side = "bottom",
  align = "start",
  modal = true,
  label,
}: {
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  label: string
  modal?: boolean
}) {
  const [checked, setChecked] = useState(true)
  const [radio, setRadio] = useState("personal")
  const [message, setMessage] = useState("")
  return (
    <Sample label={label}>
      <DropdownMenu modal={modal}>
        <DropdownMenuTrigger render={<Button variant="outline" />}>
          Opciones
          <ChevronDown data-icon="inline-end" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side={side} align={align} className="min-w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Workspace de prueba</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => setMessage("Copia de prueba creada")}
            >
              Duplicar<DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Compartir</DropdownMenuItem>
            <DropdownMenuItem
              render={
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              Enlace externo (nueva pestaña)
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuCheckboxItem
              checked={checked}
              onCheckedChange={setChecked}
            >
              Notificaciones
            </DropdownMenuCheckboxItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Más opciones</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => setMessage("Acción local ejecutada")}
                  >
                    Acción local
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={radio} onValueChange={setRadio}>
            <DropdownMenuRadioItem value="personal">
              Personal
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="team">Equipo</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => setMessage("Eliminación simulada")}
            >
              Eliminar ejemplo
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className={s.srOnly} role="status">
        {message}
      </span>
    </Sample>
  )
}
function AvatarDemo({
  size = "default",
  image = true,
  badge = false,
}: {
  size?: "sm" | "default" | "lg"
  image?: boolean
  badge?: boolean
}) {
  return (
    <Avatar size={size}>
      {image && (
        <AvatarImage
          src="/illustrations/avatar-1.svg"
          alt="Perfil de ejemplo"
        />
      )}
      <AvatarFallback>AX</AvatarFallback>
      {badge && (
        <AvatarBadge>
          <Check />
        </AvatarBadge>
      )}
    </Avatar>
  )
}
export default function DesignSystemCatalog({
  values,
}: {
  values: TokenValues
}) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
  const dark = mounted && resolvedTheme === "dark"
  const activeTokens = dark ? values.dark : values.light
  const [copied, setCopied] = useState("")
  const [actions, setActions] = useState(0)
  const [specimen, setSpecimen] = useState("")
  const [submitted, setSubmitted] = useState(false)
  async function copyToken(name: string) {
    try {
      await navigator.clipboard.writeText(`var(--${name})`)
      setCopied(`Copiado: var(--${name})`)
    } catch {
      setCopied(`Token: var(--${name})`)
    }
  }
  return (
    <main lang="es" className={s.shell}>
      <div className={s.content}>
        <header className={s.intro} data-preview>
          <p className={s.eyebrow}>AXIS / SISTEMA VISUAL</p>
          <button
            className={s.themeToggle}
            type="button"
            onClick={() => setTheme(dark ? "light" : "dark")}
            aria-label={dark ? "Activar tema claro" : "Activar tema oscuro"}
            title={dark ? "Tema claro" : "Tema oscuro"}
          >
            {dark ? <Sun /> : <Moon />}
          </button>
          <h1>El lenguaje de la aplicación.</h1>
          <p>
            Fundamentos y componentes reales. Un catálogo vivo del código
            actual.
          </p>
          <div className={s.introMeta}>
            <span>Inter · Neutral · OKLCH</span>
            <span>Fuente: app + components/ui</span>
            <span>Solo desarrollo</span>
          </div>
        </header>
        <div className={s.board}>
          <Group id="colors" title="01 / Color" source="app/globals.css">
            <p className={s.description}>
              Roles semánticos leídos del CSS de la aplicación. Cambia el tema
              para comparar sus valores; pulsa una muestra para copiar su
              variable.
            </p>
            {tokenGroups.map((group) => (
              <div className={s.stack} key={group.title}>
                <h3 className={s.label}>{group.title}</h3>
                <div className={s.swatches}>
                  {group.names.map((name) => (
                    <button
                      type="button"
                      className={s.swatch}
                      key={name}
                      onClick={() => copyToken(name)}
                      aria-label={`Copiar --${name}`}
                    >
                      <span
                        className={s.colorChip}
                        style={{ background: `var(--${name})` }}
                      />
                      <span className={s.tokenName}>--{name}</span>
                      <code>{activeTokens[name]}</code>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div className={s.gradient} />
            <p className={s.caption}>
              Hero: radial-gradient · stops 0% / 100% / 100%. El sitio lo
              difumina a 120 px y 30% de opacidad.
            </p>
          </Group>
          <Group
            id="typography"
            title="02 / Tipografía"
            source="app/layout.tsx · templates/axis"
          >
            <div className={s.typeIntro}>
              <span className={s.letters}>Aa</span>
              <div>
                <h3>Inter</h3>
                <p className={s.description}>
                  300 / 400 / 500 / 600 / 700 cargados.
                  <br />
                  Peso base: 300. Controles y títulos: 500.
                  <br />
                  600 aparece en estadísticas; 700 está disponible.
                </p>
              </div>
            </div>
            <Label htmlFor="specimen">Prueba tu propio texto</Label>
            <Input
              id="specimen"
              placeholder="Escribe para comparar la escala…"
              value={specimen}
              onChange={(e) => setSpecimen(e.target.value)}
            />
            <div className={s.typeScale}>
              {typeScale.map((t) => (
                <div className={s.typeRow} key={t.size}>
                  <div className={s.typeMeta}>
                    <strong>{t.role}</strong>
                    <code>
                      {t.size} / {Math.round(t.size * t.leading)} px ·{" "}
                      {t.weight}
                    </code>
                  </div>
                  <p
                    style={{
                      fontSize: t.size,
                      lineHeight: t.leading,
                      fontWeight: t.weight,
                      letterSpacing: t.tracking,
                    }}
                  >
                    {specimen || t.text}
                  </p>
                  <span className={s.caption}>{t.utility}</span>
                </div>
              ))}
            </div>
            <p className={s.description}>
              La escala refleja usos existentes. El hero móvil cambia a peso
              500; las descripciones suelen heredar 300. Mono: SF Mono / Menlo,
              reservado a esta documentación.
            </p>
          </Group>
          <Group
            id="spacing"
            title="03 / Espaciado y márgenes"
            source="--spacing: 0.25rem · templates/axis"
          >
            <p className={s.description}>
              Unidad base de 4 px. La escala incluye medios pasos de 6 y 10 px
              en controles; no existe un token separado para cada margen.
            </p>
            <div className={s.spacingList}>
              {spacing.map((px) => (
                <div className={s.spacingRow} key={px}>
                  <code>{px / 4}</code>
                  <span className={s.spacingBar} style={{ inlineSize: px }} />
                  <span>{px} px</span>
                </div>
              ))}
            </div>
            <div className={s.ruleList}>
              <p>
                <strong>8–12 px</strong> · Acciones y listas compactas
              </p>
              <p>
                <strong>16 px</strong> · Padding lateral en móvil / gap de
                tarjetas
              </p>
              <p>
                <strong>24–32 px</strong> · Padding de tarjetas y formularios
              </p>
              <p>
                <strong>48–64 px</strong> · Separación de bloques internos
              </p>
              <p>
                <strong>96 → 176 px</strong> · Gap entre secciones, base → lg
              </p>
              <p>
                <strong>mx-auto</strong> · Centrado de contenedores con ancho
                máximo
              </p>
            </div>
          </Group>
          <Group
            id="shape"
            title="04 / Forma y superficies"
            source="--radius: 0.625rem · ui/card · ui/button"
          >
            <p className={s.description}>
              Radio base: 10 px. La escala deriva por ±2, ±4, +8, +12 y +16 px.
              Los botones usan md; las tarjetas, 3xl.
            </p>
            <div className={s.examples}>
              {radii.map(([name, value]) => (
                <Sample key={name} label={`${name} · ${value}`}>
                  <div
                    className={s.radiusShape}
                    style={{ borderRadius: `var(--radius-${name})` }}
                  />
                </Sample>
              ))}
              <Sample label="full · CTA del sitio">
                <div
                  className={s.radiusShape}
                  style={{ borderRadius: "9999px" }}
                />
              </Sample>
            </div>
            <Row title="Tratamientos existentes">
              <Sample label="Borde · 1 px">
                <div
                  className={s.surface}
                  style={{ border: "1px solid var(--border)" }}
                >
                  border
                </div>
              </Sample>
              <Sample label="Card · shadow-xs + ring">
                <Card size="sm">
                  <CardContent>Card</CardContent>
                </Card>
              </Sample>
              <Sample label="Input · shadow-xs">
                <Input
                  aria-label="Ejemplo de superficie input"
                  placeholder="Input"
                />
              </Sample>
            </Row>
            <p className={s.description}>
              Overrides de páginas: CTA rounded-full; auth rounded-4xl; pricing
              rounded-2xl. La imagen hero usa 12 px → 40 px en lg.
            </p>
          </Group>
          <Group
            id="buttons"
            title="05 / Botones"
            source="components/ui/button.tsx"
          >
            <Row title="Estilo · mismo tamaño y texto">
              {variants.map((variant) => (
                <Sample label={variant} key={variant}>
                  <Button
                    variant={variant}
                    onClick={() => setActions((n) => n + 1)}
                  >
                    Continuar
                  </Button>
                </Sample>
              ))}
            </Row>
            <Row title="Tamaño · estilo default">
              {buttonSizes.map((size, i) => (
                <Sample
                  label={`${size} · ${[24, 32, 36, 40][i]} px`}
                  key={size}
                >
                  <Button size={size} onClick={() => setActions((n) => n + 1)}>
                    Continuar
                  </Button>
                </Sample>
              ))}
            </Row>
            <Row title="Solo icono · estilo default">
              {iconSizes.map((size) => (
                <Sample label={size} key={size}>
                  <Button
                    size={size}
                    aria-label={`Agregar · ${size}`}
                    onClick={() => setActions((n) => n + 1)}
                  >
                    <Plus />
                  </Button>
                </Sample>
              ))}
            </Row>
            <Row title="Estados · estilo default">
              <Sample label="Habilitado">
                <Button onClick={() => setActions((n) => n + 1)}>
                  Continuar
                </Button>
              </Sample>
              <Sample label="Disabled">
                <Button disabled>Continuar</Button>
              </Sample>
              <Sample label="aria-invalid">
                <Button aria-invalid onClick={() => setActions((n) => n + 1)}>
                  Continuar
                </Button>
              </Sample>
            </Row>
            <Row title="Composición · estilo default">
              <Sample label="Icono inicial">
                <Button onClick={() => setActions((n) => n + 1)}>
                  <Plus data-icon="inline-start" />
                  Continuar
                </Button>
              </Sample>
              <Sample label="Icono final">
                <Button onClick={() => setActions((n) => n + 1)}>
                  Continuar
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </Sample>
            </Row>
            <p className={s.caption} role="status">
              Activaciones locales: {actions}. Hover, foco y pulsación se
              prueban directamente sobre cada control.
            </p>
          </Group>
          <Group
            id="inputs"
            title="06 / Campos y etiquetas"
            source="components/ui/input.tsx · label.tsx"
          >
            <div className={s.fields}>
              {[
                { id: "empty", label: "Vacío", placeholder: "m@example.com" },
                {
                  id: "filled",
                  label: "Completado",
                  defaultValue: "alex@example.com",
                },
                {
                  id: "disabled",
                  label: "Disabled",
                  disabled: true,
                  defaultValue: "alex@example.com",
                },
                {
                  id: "readonly",
                  label: "Solo lectura",
                  readOnly: true,
                  defaultValue: "alex@example.com",
                },
                {
                  id: "invalid",
                  label: "Inválido",
                  "aria-invalid": true as const,
                  defaultValue: "correo-incompleto",
                },
                {
                  id: "password-demo",
                  label: "Contraseña",
                  type: "password",
                  defaultValue: "ejemplo-local",
                },
              ].map(({ label, id, ...props }) => (
                <div
                  className={s.field}
                  key={id}
                  data-disabled={props.disabled || undefined}
                >
                  <Label htmlFor={id}>{label}</Label>
                  <Input
                    id={id}
                    {...props}
                    aria-describedby={
                      id === "invalid" ? "input-error" : undefined
                    }
                  />
                  {id === "invalid" && (
                    <span className={s.error} id="input-error">
                      Introduce un correo válido. Estado de muestra.
                    </span>
                  )}
                </div>
              ))}
              <div className={s.field}>
                <Label htmlFor="file-demo">Archivo local</Label>
                <Input id="file-demo" type="file" />
                <span className={s.caption}>
                  Solo selección; no se sube ningún archivo.
                </span>
              </div>
            </div>
            <p className={s.description}>
              Altura de 36 px · radio md (8 px) · padding horizontal 10 px.
              Texto de 16 px en móvil y 14 px desde md. Foco con ring de 3 px.
            </p>
          </Group>
          <Group
            id="toggles"
            title="07 / Selección"
            source="components/ui/toggle.tsx · toggle-group.tsx"
          >
            <Row title="Toggle · estilos">
              {toggleStyles.map((variant) => (
                <Sample label={variant} key={variant}>
                  <Toggle variant={variant} aria-label={`Negrita ${variant}`}>
                    <Bold />
                  </Toggle>
                </Sample>
              ))}
            </Row>
            <Row title="Toggle · tamaños, estilo default">
              {toggleSizes.map((size) => (
                <Sample label={size} key={size}>
                  <Toggle size={size} aria-label={`Negrita ${size}`}>
                    <Bold />
                  </Toggle>
                </Sample>
              ))}
            </Row>
            <Row title="Toggle · estados, estilo default">
              <Sample label="Pressed">
                <Toggle defaultPressed aria-label="Negrita activada">
                  <Bold />
                </Toggle>
              </Sample>
              <Sample label="Disabled">
                <Toggle disabled aria-label="Negrita deshabilitada">
                  <Bold />
                </Toggle>
              </Sample>
            </Row>
            <Row title="Grupo · estilos">
              {toggleStyles.map((variant) => (
                <Sample key={variant} label={variant}>
                  <ToggleGroup
                    variant={variant}
                    defaultValue={["bold"]}
                    aria-label={`Formato ${variant}`}
                  >
                    <ToggleGroupItem value="bold" aria-label="Negrita">
                      <Bold />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Cursiva">
                      <Italic />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="underline" aria-label="Subrayado">
                      <Underline />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </Sample>
              ))}
            </Row>
            <Row title="Grupo · tamaños, estilo default">
              {toggleSizes.map((size) => (
                <Sample key={size} label={size}>
                  <ToggleGroup size={size} aria-label={`Formato ${size}`}>
                    <ToggleGroupItem value="bold" aria-label="Negrita">
                      <Bold />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Cursiva">
                      <Italic />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </Sample>
              ))}
            </Row>
            <Row title="Grupo · orientación, estilo default">
              {(["horizontal", "vertical"] as const).map((orientation) => (
                <Sample key={orientation} label={orientation}>
                  <ToggleGroup
                    orientation={orientation}
                    aria-label={`Formato ${orientation}`}
                  >
                    <ToggleGroupItem value="bold" aria-label="Negrita">
                      <Bold />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Cursiva">
                      <Italic />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </Sample>
              ))}
            </Row>
            <Row title="Grupo · selección y separación">
              <Sample label="Múltiple">
                <ToggleGroup
                  multiple
                  defaultValue={["bold", "italic"]}
                  aria-label="Formato múltiple"
                >
                  <ToggleGroupItem value="bold" aria-label="Negrita">
                    <Bold />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Cursiva">
                    <Italic />
                  </ToggleGroupItem>
                </ToggleGroup>
              </Sample>
              <Sample label="spacing = 2">
                <ToggleGroup spacing={2} aria-label="Formato con separación">
                  <ToggleGroupItem value="bold" aria-label="Negrita">
                    <Bold />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Cursiva">
                    <Italic />
                  </ToggleGroupItem>
                </ToggleGroup>
              </Sample>
            </Row>
          </Group>
          <Group
            id="display"
            title="08 / Indicadores y perfiles"
            source="components/ui/badge.tsx · avatar.tsx"
          >
            <Row title="Badge · estilos">
              {badgeStyles.map((variant) => (
                <Sample key={variant} label={variant}>
                  <Badge variant={variant}>Workspace</Badge>
                </Sample>
              ))}
            </Row>
            <Row title="Badge · composiciones">
              <Sample label="Icono inicial">
                <Badge>
                  <Check data-icon="inline-start" />
                  Workspace
                </Badge>
              </Sample>
              <Sample label="Icono final">
                <Badge>
                  Workspace
                  <Check data-icon="inline-end" />
                </Badge>
              </Sample>
              <Sample label="Enlace interno">
                <Badge variant="link" render={<a href="#buttons" />}>
                  Ver botones
                </Badge>
              </Sample>
            </Row>
            <Row title="Avatar · tamaños">
              {(["sm", "default", "lg"] as const).map((size) => (
                <Sample
                  key={size}
                  label={`${size} · ${{ sm: 24, default: 32, lg: 40 }[size]} px`}
                >
                  <AvatarDemo size={size} />
                </Sample>
              ))}
            </Row>
            <Row title="Avatar · contenido">
              <Sample label="Imagen">
                <AvatarDemo />
              </Sample>
              <Sample label="Fallback">
                <AvatarDemo image={false} />
              </Sample>
              <Sample label="Badge">
                <AvatarDemo badge />
              </Sample>
              <Sample label="Grupo">
                <AvatarGroup>
                  <AvatarDemo />
                  <AvatarDemo image={false} />
                  <AvatarGroupCount>+3</AvatarGroupCount>
                </AvatarGroup>
              </Sample>
            </Row>
          </Group>
          <Group
            id="cards"
            title="09 / Tarjetas"
            source="components/ui/card.tsx"
          >
            <Row title="Tamaño · mismo contenido">
              {(["default", "sm"] as const).map((size) => (
                <Sample label={size} key={size}>
                  <Card size={size}>
                    <CardHeader>
                      <CardTitle>Tu workspace</CardTitle>
                      <CardDescription>
                        Un lugar para tus proyectos.
                      </CardDescription>
                      <CardAction>
                        <Badge variant="secondary">Demo</Badge>
                      </CardAction>
                    </CardHeader>
                    <CardContent>
                      Contenido de ejemplo, sin datos reales.
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        onClick={() => setActions((n) => n + 1)}
                      >
                        Continuar
                      </Button>
                    </CardFooter>
                  </Card>
                </Sample>
              ))}
            </Row>
            <p className={s.description}>
              Default: padding y gap de 24 px. Sm: 16 px. Radio 3xl (22 px);
              ring de 1 px y shadow-xs. El fondo real usa background, aunque
              existe el token card.
            </p>
          </Group>
          <Group
            id="menus"
            title="10 / Menús"
            source="components/ui/dropdown-menu.tsx"
          >
            <p className={s.description}>
              Los menús conservan su portal nativo, tamaño en pantalla y
              navegación con teclado. Sus acciones solo afectan el ejemplo. Los
              enlaces externos se abren en una pestaña nueva.
            </p>
            <Row title="Lado · alineación start">
              {(["top", "right", "bottom", "left"] as const).map((side) => (
                <MenuSample key={side} side={side} label={side} />
              ))}
            </Row>
            <Row title="Alineación · lado bottom">
              {(["start", "center", "end"] as const).map((align) => (
                <MenuSample key={align} align={align} label={align} />
              ))}
            </Row>
            <Row title="Modalidad · lado bottom y alineación start">
              <MenuSample label="Modal" modal />
              <MenuSample label="No modal" modal={false} />
            </Row>
          </Group>
          <Group
            id="feedback"
            title="11 / Separadores y carga"
            source="components/ui/separator.tsx · skeleton.tsx"
          >
            <Row title="Orientación">
              <Sample label="Horizontal">
                <div className={s.stack}>
                  <span>Proyectos</span>
                  <Separator />
                  <span>Equipo</span>
                </div>
              </Sample>
              <Sample label="Vertical">
                <div className={s.inline}>
                  <span>Proyectos</span>
                  <Separator orientation="vertical" />
                  <span>Equipo</span>
                </div>
              </Sample>
            </Row>
            <Row title="Skeleton · composición de carga">
              <Sample label="Perfil">
                <div
                  className={s.inline}
                  role="status"
                  aria-label="Cargando perfil"
                >
                  <Skeleton className="size-10 rounded-full" />
                  <div className={s.stack}>
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </Sample>
              <Sample label="Texto">
                <div
                  className={s.stack}
                  role="status"
                  aria-label="Cargando contenido"
                >
                  <Skeleton className="h-3 w-48" />
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </Sample>
            </Row>
            <p className={s.description}>
              Separator: 1 px, color border. Skeleton: muted-foreground al 60%
              en claro y muted en oscuro; conserva su animación original.
            </p>
          </Group>
          <Group
            id="layout"
            title="12 / Layout y composición"
            source="app/page.tsx · app/auth/page.tsx · templates/axis"
          >
            <div className={s.ruleList}>
              <p>
                <strong>640 / 768 / 1024 / 1280 px</strong> · Breakpoints sm /
                md / lg / xl de Tailwind
              </p>
              <p>
                <strong>1024 px · max-w-5xl</strong> · Estadísticas y
                testimonios
              </p>
              <p>
                <strong>1152 px · max-w-6xl</strong> · Navegación y hero desktop
              </p>
              <p>
                <strong>1280 px · max-w-7xl</strong> · Features, pricing e
                imagen hero
              </p>
              <p>
                <strong>420 px · max-w-105</strong> · Tarjeta de acceso
              </p>
              <p>
                <strong>1 → 2 → 3 columnas</strong> · Testimonios en base / md /
                lg
              </p>
              <p>
                <strong>2 → 4 columnas</strong> · Logos en base / md
              </p>
            </div>
            <form
              className={s.demoForm}
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Tu próximo workspace</CardTitle>
                  <CardDescription>
                    Composición con los componentes de la aplicación.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={s.field}>
                    <Label htmlFor="composition-email">Email</Label>
                    <Input
                      id="composition-email"
                      type="email"
                      required
                      placeholder="m@example.com"
                      autoComplete="off"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">
                    Continuar
                    <ArrowRight data-icon="inline-end" />
                  </Button>
                </CardFooter>
              </Card>
              <p className={s.caption} role="status">
                {submitted
                  ? "Formulario validado localmente. No se envió ningún dato."
                  : "Demo local · sin autenticación ni llamadas a servicios."}
              </p>
            </form>
          </Group>
          <Group
            id="notes"
            title="13 / Lectura del sistema actual"
            source="Análisis del código · sin GUI.md ni gui/"
          >
            <div className={s.notes}>
              <div>
                <h3>Una base neutral, un acento ambiental</h3>
                <p>
                  Superficies y acciones usan grises OKLCH. El hero añade un
                  tono cálido difuminado. Los tokens chart y sidebar existen,
                  pero las páginas actuales no los consumen.
                </p>
              </div>
              <div>
                <h3>Tokens y personalizaciones conviven</h3>
                <p>
                  Los primitivos usan radios derivados; las páginas aplican
                  rounded-full a CTA y otros radios a tarjetas e imágenes. Aquí
                  se preserva esa distinción.
                </p>
              </div>
              <div>
                <h3>Excepciones que conviene revisar</h3>
                <p>
                  Los testimonios usan text-blue-500 y #1D9BF0. Pricing usa
                  blanco directo. El hero contiene text-md, que no está definido
                  en el tema: hereda el tamaño base.
                </p>
              </div>
              <div>
                <h3>Dos bibliotecas presentes, una activa</h3>
                <p>
                  Las páginas / y /auth importan components/ui.
                  components/graphical está instalado, pero no está conectado al
                  layout; no se mezcla con el sistema activo.
                </p>
              </div>
              <div>
                <h3>Iconografía y movimiento</h3>
                <p>
                  Las páginas usan Lucide, aunque components.json declara
                  Hugeicons. El sitio usa Motion para entradas y hover; el
                  selector de tema utiliza un spring de stiffness 500 y damping
                  35. Los controles conservan sus transiciones existentes. No
                  hay una escala global de movimiento activa.
                </p>
              </div>
            </div>
          </Group>
          <Group
            id="coverage"
            title="14 / Cobertura"
            source="Inventario de variantes · catalog.ts"
          >
            <div className={s.coverage}>
              {coverage.map((item) => (
                <div key={item.component}>
                  <h3>{item.component}</h3>
                  <p>{item.cases}</p>
                </div>
              ))}
            </div>
            <p className={s.description}>
              Se compara una propiedad a la vez. Se omiten combinaciones
              cartesianas, RTL, offsets numéricos continuos y variantes render
              arbitrarias. Las secciones completas del landing, animaciones
              decorativas y componentes Graphical desconectados quedan fuera de
              las muestras; sus estilos relevantes se documentan en fundamentos.
            </p>
          </Group>
        </div>
      </div>
      <div className={copied ? s.copyStatus : s.srOnly} role="status">
        <Copy aria-hidden="true" />
        {copied}
      </div>
    </main>
  )
}
