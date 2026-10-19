import { readFile } from "node:fs/promises"
import path from "node:path"
import DesignSystemCatalog from "./canvas"
import type { TokenValues } from "./catalog"

export const metadata = {
  title: "Axis · Design system",
  robots: { index: false, follow: false },
}

export default async function DesignSystemPage() {
  const css = await readFile(
    path.join(process.cwd(), "app/globals.css"),
    "utf8"
  )
  const tokens = (selector: string) =>
    Object.fromEntries(
      [
        ...(
          css.match(new RegExp(`${selector}\\s*\\{([^}]+)\\}`))?.[1] ?? ""
        ).matchAll(/--([\w-]+):\s*([^;]+);/g),
      ].map(([, name, value]) => [name, value.trim()])
    )
  const values: TokenValues = {
    light: tokens(":root"),
    dark: tokens("\\.dark"),
  }
  return <DesignSystemCatalog values={values} />
}
