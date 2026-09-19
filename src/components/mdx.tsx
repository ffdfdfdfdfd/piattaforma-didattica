import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="text-3xl font-bold mt-10 mb-4 scroll-mt-20" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold mt-10 mb-3 scroll-mt-20" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold mt-8 mb-2 scroll-mt-20" {...props} />
  ),
  p: (props) => (
    <p className="leading-relaxed my-4 text-text" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 my-4 space-y-1 text-text" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 my-4 space-y-1 text-text" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  code: (props) => (
    <code
      className="bg-surface-2 border border-border rounded px-1.5 py-0.5 text-sm font-mono"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-surface-2 border border-border rounded-lg p-4 overflow-x-auto my-5 text-sm leading-relaxed font-mono"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-accent pl-4 my-5 text-text-muted italic"
      {...props}
    />
  ),
  a: (props) => (
    <a className="text-accent underline hover:text-accent-hover" {...props} />
  ),
  hr: () => <hr className="border-border my-8" />,
  table: (props) => (
    <div className="overflow-x-auto my-5">
      <table className="w-full border border-border text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th className="border border-border bg-surface-2 px-3 py-2 text-left" {...props} />
  ),
  td: (props) => (
    <td className="border border-border px-3 py-2" {...props} />
  ),
}