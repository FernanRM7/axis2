import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import {
  styles,
  badgeStyles,
  buttonSizes,
  iconSizes,
  toggleStyles,
  toggleSizes,
  tokenGroups,
} from "./catalog.ts"

const source = (name) =>
  readFileSync(
    new URL(`../../components/ui/${name}.tsx`, import.meta.url),
    "utf8"
  )
function namedVariants(name, property) {
  const body = source(name).match(
    new RegExp(`${property}: \\{([\\s\\S]*?)\\n      \\}`)
  )?.[1]
  assert.ok(body, `${name}.${property} exists`)
  return [...body.matchAll(/^\s*(?:"([\w-]+)"|(\w+)):/gm)]
    .map((m) => m[1] || m[2])
    .sort()
}
test("catalog covers every named Button variant and size", () => {
  assert.deepEqual([...styles].sort(), namedVariants("button", "variant"))
  assert.deepEqual(
    [...buttonSizes, ...iconSizes].sort(),
    namedVariants("button", "size")
  )
})
test("catalog covers every named Badge and Toggle variant", () => {
  assert.deepEqual([...badgeStyles].sort(), namedVariants("badge", "variant"))
  assert.deepEqual([...toggleStyles].sort(), namedVariants("toggle", "variant"))
  assert.deepEqual([...toggleSizes].sort(), namedVariants("toggle", "size"))
})
test("every color sample exists in both active theme definitions", () => {
  const css = readFileSync(new URL("../globals.css", import.meta.url), "utf8")
  for (const selector of [":root", "\\.dark"]) {
    const body = css.match(new RegExp(`${selector}\\s*\\{([^}]+)\\}`))[1]
    for (const name of tokenGroups.flatMap((g) => g.names))
      assert.match(body, new RegExp(`--${name}:`))
  }
})
