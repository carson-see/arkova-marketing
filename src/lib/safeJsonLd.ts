/**
 * Serializes a value for inclusion inside a <script type="application/ld+json">
 * block. Escapes characters that would let an embedded payload break out of the
 * script element when any field becomes attacker-controlled.
 *
 * Why this matters: JSON.stringify does NOT escape the literal sequence
 * "</script>". A browser's HTML parser ends a script tag at the first literal
 * "</script>" regardless of script type (including application/ld+json). If any
 * field in the schema were ever sourced from a CMS, DB, query string, or user
 * submission, a value like '</script><script>...</script>' would inject an
 * arbitrary script into the page, and CSP "unsafe-inline" makes it execute.
 *
 * The current Arkova marketing data flow is fully static, so this function is
 * a defense-in-depth measure today. It removes the entire class of injection
 * for any future architecture change (CMS, DB, user-editable fields, etc.).
 *
 * Also escapes U+2028 (LINE SEPARATOR) and U+2029 (PARAGRAPH SEPARATOR) which
 * are valid in JSON but break older ECMAScript parsers when embedded inline.
 * The character class is built from a string (not a regex literal) so the
 * TypeScript lexer doesn't interpret bare U+2028/2029 as line terminators.
 */
const LS_PS_REGEX = new RegExp('[  ]', 'g');

export function safeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(LS_PS_REGEX, (c) => '\\u' + c.charCodeAt(0).toString(16).padStart(4, '0'));
}
