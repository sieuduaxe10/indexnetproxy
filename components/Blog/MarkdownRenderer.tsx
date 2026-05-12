import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

// Sanitize schema — extends the default to allow target/rel on links.
// react-markdown won't render raw HTML even without this; rehype-sanitize is a
// belt-and-suspenders defense in case markdown ever contains HTML.
const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...(defaultSchema.attributes?.a ?? []),
      ["target"],
      ["rel"],
    ],
  },
};

export function MarkdownRenderer({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeSanitize, schema]]}
      components={{
        h1: ({ children }) => (
          <h1 className="font-extrabold text-32 mt-10 mb-4 text-foreground">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-extrabold text-28 mt-8 mb-4 text-foreground">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-extrabold text-21 mt-6 mb-3 text-foreground">{children}</h3>
        ),
        h4: ({ children }) => (
          <h4 className="font-extrabold text-18 mt-4 mb-2 text-foreground">{children}</h4>
        ),
        p: ({ children }) => (
          <p className="text-15 leading-[180%] text-[#576075] mb-4">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-4 space-y-1 text-15 text-[#576075]">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-4 space-y-1 text-15 text-[#576075]">{children}</ol>
        ),
        li: ({ children }) => <li className="leading-[170%]">{children}</li>,
        a: ({ href, children }) => {
          const isExternal = !!href && /^https?:\/\//.test(href);
          return (
            <a
              href={href}
              className="text-primary underline hover:text-primary/80 transition-colors"
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {children}
            </a>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-muted-foreground">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-ibm-plex-mono">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-secondary p-4 rounded-md overflow-x-auto text-sm font-ibm-plex-mono my-4">
            {children}
          </pre>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="min-w-full border-collapse text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="border-b border-border">{children}</thead>,
        th: ({ children }) => <th className="px-3 py-2 text-left font-semibold">{children}</th>,
        td: ({ children }) => <td className="px-3 py-2 border-t border-border">{children}</td>,
        hr: () => <hr className="my-8 border-border" />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
