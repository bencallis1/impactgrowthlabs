import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text) => <em>{text}</em>,
    [MARKS.CODE]: (text) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono">
        {text}
      </code>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <h2 className="mt-10 mb-4 font-serif text-3xl text-[#1A3A2E]">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <h3 className="mt-8 mb-3 font-serif text-2xl text-[#1A3A2E]">
        {children}
      </h3>
    ),
    [BLOCKS.UL_LIST]: (_, children) => (
      <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_, children) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_, children) => <li>{children}</li>,
    [BLOCKS.QUOTE]: (_, children) => (
      <blockquote className="my-6 border-l-4 border-[#52B788] pl-6 italic text-[#0F1A14]/70">
        {children}
      </blockquote>
    ),
    [BLOCKS.HR]: () => <hr className="my-8 border-gray-200" />,
    [INLINES.HYPERLINK]: (node, children) => (
      <a
        href={node.data.uri}
        className="text-[#2D6A4F] underline underline-offset-2 hover:text-[#1A3A2E]"
        target={
          node.data.uri.startsWith("http") ? "_blank" : undefined
        }
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export function RichTextRenderer({ document }: { document: Document }) {
  return (
    <div className="prose prose-lg max-w-none text-[#0F1A14]/80">
      {documentToReactComponents(document, options)}
    </div>
  );
}
