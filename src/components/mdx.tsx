import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="text-3xl font-semibold tracking-tight mt-12 mb-4 scroll-mt-20"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl font-semibold tracking-tight mt-12 mb-4 pb-2 border-b border-border scroll-mt-20"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="text-lg font-semibold mt-8 mb-3 scroll-mt-20"
      {...props}
    />
  ),
  p: (props) => (
    <p className="leading-relaxed my-4 text-base text-text" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 my-4 space-y-1.5 text-base" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 my-4 space-y-1.5 text-base" {...props} />
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
      className="bg-surface-2 border border-border rounded-md p-4 overflow-x-auto my-6 text-sm leading-relaxed font-mono"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-text pl-5 my-6 text-text-muted italic"
      {...props}
    />
  ),
  a: (props) => (
    <a className="underline underline-offset-2 hover:text-text-muted" {...props} />
  ),
  hr: () => <hr className="border-border my-10" />,
  table: (props) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="border-b border-border px-3 py-2 text-left label text-text-muted"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border-b border-border px-3 py-2 align-top" {...props} />
  ),
}