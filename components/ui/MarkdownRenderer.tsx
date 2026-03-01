/**
 * Minimal, dependency-free markdown renderer for Contentful Long Text fields.
 *
 * Handles the patterns most commonly used in CMS content:
 *   # / ## / ###     → headings
 *   **text**          → bold
 *   __text__          → bold (underscore variant)
 *   *text*            → italic
 *   _text_            → italic (underscore variant)
 *   ~~text~~          → strikethrough
 *   `code`            → inline code
 *   - item / * item   → unordered list
 *   1. item           → ordered list
 *   blank line        → paragraph break
 *
 * For card / excerpt contexts where you just want plain text, use stripMarkdown().
 */

import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// stripMarkdown — removes syntax for short card/excerpt displays
// ---------------------------------------------------------------------------

export function stripMarkdown(text: string | undefined | null): string {
  if (!text) return "";
  return text
    .replace(/^#{1,6}\s+/gm, "")         // ## Heading → Heading
    .replace(/\*\*(.+?)\*\*/g, "$1")     // **bold** → bold
    .replace(/__(.+?)__/g, "$1")         // __bold__ → bold
    .replace(/\*(.+?)\*/g, "$1")         // *italic* → italic
    .replace(/_(.+?)_/g, "$1")           // _italic_ → italic
    .replace(/~~(.+?)~~/g, "$1")         // ~~strike~~ → strike
    .replace(/`(.+?)`/g, "$1")           // `code` → code
    .replace(/^[-*+]\s+/gm, "")          // - list item → list item
    .replace(/^\d+\.\s+/gm, "")          // 1. list item → list item
    .replace(/\n{2,}/g, " ")             // paragraph breaks → space
    .replace(/\n/g, " ")                 // line breaks → space
    .trim();
}

// ---------------------------------------------------------------------------
// Inline parser — handles bold, italic, strikethrough, and code spans
// ---------------------------------------------------------------------------

// Ordered from most-specific to least-specific so longer tokens match first.
const INLINE_RE =
  /(\*\*[^*\n]+?\*\*|__[^_\n]+?__|~~[^~\n]+?~~|`[^`\n]+?`|\*[^*\n]+?\*|_[^_\n]+?_)/g;

function parseInline(text: string): ReactNode {
  const tokens = text.split(INLINE_RE);
  return (
    <>
      {tokens.map((token, i) => {
        if ((token.startsWith("**") && token.endsWith("**")) ||
            (token.startsWith("__") && token.endsWith("__"))) {
          return <strong key={i}>{token.slice(2, -2)}</strong>;
        }
        if ((token.startsWith("*") && token.endsWith("*")) ||
            (token.startsWith("_") && token.endsWith("_"))) {
          return <em key={i}>{token.slice(1, -1)}</em>;
        }
        if (token.startsWith("~~") && token.endsWith("~~")) {
          return <s key={i}>{token.slice(2, -2)}</s>;
        }
        if (token.startsWith("`") && token.endsWith("`")) {
          return (
            <code key={i} className="text-sm bg-[#F7FAF8] text-[#2D6A4F] px-1.5 py-0.5 rounded font-mono">
              {token.slice(1, -1)}
            </code>
          );
        }
        return token;
      })}
    </>
  );
}

// ---------------------------------------------------------------------------
// MarkdownRenderer component
// ---------------------------------------------------------------------------

interface Props {
  /** The raw markdown string from Contentful */
  content: string | undefined | null;
  /** Wrapper className */
  className?: string;
  /** Override paragraph styles */
  paragraphClassName?: string;
}

export function MarkdownRenderer({
  content,
  className = "space-y-4",
  paragraphClassName = "text-[#0F1A14]/70 leading-relaxed text-lg",
}: Props) {
  if (!content) return null;

  // Split on one or more blank lines to get logical blocks
  const blocks = content.split(/\n\n+/);

  const nodes: ReactNode[] = blocks.flatMap((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return [];

    // H3 ###
    const h3 = trimmed.match(/^###\s+(.+)/);
    if (h3) {
      return (
        <h3 key={idx} className="font-semibold text-lg text-[#1A3A2E] mt-4">
          {parseInline(h3[1])}
        </h3>
      );
    }

    // H2 ##
    const h2 = trimmed.match(/^##\s+(.+)/);
    if (h2) {
      return (
        <h2 key={idx} className="font-serif text-2xl text-[#1A3A2E] mt-6">
          {parseInline(h2[1])}
        </h2>
      );
    }

    // H1 #
    const h1 = trimmed.match(/^#\s+(.+)/);
    if (h1) {
      return (
        <h1 key={idx} className="font-serif text-3xl text-[#1A3A2E] mt-8">
          {parseInline(h1[1])}
        </h1>
      );
    }

    // Unordered list — every line starts with "- ", "* ", or "+ "
    // (single * followed by a space, not ** which would be bold)
    const lines = trimmed.split("\n");
    const isUnorderedList = lines.every((l) => /^[-+]\s|^\*\s/.test(l.trim()));
    if (isUnorderedList) {
      return (
        <ul
          key={idx}
          className="list-disc list-inside space-y-1 text-[#0F1A14]/70 leading-relaxed text-lg"
        >
          {lines.map((line, i) => (
            <li key={i}>{parseInline(line.replace(/^[-*+]\s+/, ""))}</li>
          ))}
        </ul>
      );
    }

    // Ordered list — every line starts with "1. ", "2. " etc.
    const isOrderedList = lines.every((l) => /^\d+\.\s/.test(l.trim()));
    if (isOrderedList) {
      return (
        <ol
          key={idx}
          className="list-decimal list-inside space-y-1 text-[#0F1A14]/70 leading-relaxed text-lg"
        >
          {lines.map((line, i) => (
            <li key={i}>{parseInline(line.replace(/^\d+\.\s+/, ""))}</li>
          ))}
        </ol>
      );
    }

    // Default: paragraph (collapse internal newlines to spaces)
    return (
      <p key={idx} className={paragraphClassName}>
        {parseInline(trimmed.replace(/\n/g, " "))}
      </p>
    );
  });

  return <div className={className}>{nodes}</div>;
}
