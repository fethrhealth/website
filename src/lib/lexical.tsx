/**
 * Lexical rich-text renderer + utilities for Payload CMS content.
 *
 * Handles the standard Payload Lexical node types:
 *   paragraph, heading, text (with format bitmask), list, listitem,
 *   link, autolink, upload, horizontalrule, linebreak, quote
 */

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

// ─── Types ────────────────────────────────────────────────────────────────────

interface LexicalNode {
  type: string
  version: number
  children?: LexicalNode[]
  [key: string]: unknown
}

interface TextNode extends LexicalNode {
  type: 'text'
  text: string
  format: number   // bitmask: 1=bold 2=italic 4=strike 8=underline 16=code 32=sub 64=sup
}

interface HeadingNode extends LexicalNode {
  type: 'heading'
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

interface ListNode extends LexicalNode {
  type: 'list'
  listType: 'bullet' | 'number' | 'check'
  tag: 'ul' | 'ol'
}

interface LinkNode extends LexicalNode {
  type: 'link' | 'autolink'
  url?: string
  fields?: { url?: string; newTab?: boolean }
}

interface UploadNode extends LexicalNode {
  type: 'upload'
  value?: { url?: string; alt?: string; width?: number; height?: number }
}

// ─── ToC ──────────────────────────────────────────────────────────────────────

export interface ToCItem {
  id: string
  text: string
  level: 2 | 3
}

/** Slug used as id on headings — mirrors what LexicalRenderer renders */
export function headingSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function nodeText(node: LexicalNode): string {
  if (node.type === 'text') return (node as TextNode).text
  return (node.children ?? []).map(nodeText).join('')
}

export function extractToc(content: unknown): ToCItem[] {
  if (!content || typeof content !== 'object') return []
  const root = (content as { root: LexicalNode }).root
  if (!root?.children) return []
  const items: ToCItem[] = []
  for (const node of root.children) {
    if (node.type === 'heading') {
      const { tag } = node as HeadingNode
      if (tag === 'h2' || tag === 'h3') {
        const text = nodeText(node)
        items.push({ id: headingSlug(text), text, level: Number(tag[1]) as 2 | 3 })
      }
    }
  }
  return items
}

/** Estimated reading time in minutes based on ~200 wpm */
export function estimateReadTime(content: unknown): string {
  if (!content || typeof content !== 'object') return ''
  const root = (content as { root: LexicalNode }).root
  if (!root) return ''
  const words = nodeText(root).split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

// ─── Renderer ─────────────────────────────────────────────────────────────────

function renderText(node: TextNode, key: string): React.ReactNode {
  let content: React.ReactNode = node.text
  const f = node.format
  if (f & 1)  content = <strong key={`${key}b`} className="font-semibold">{content}</strong>
  if (f & 2)  content = <em key={`${key}i`}>{content}</em>
  if (f & 4)  content = <s key={`${key}s`}>{content}</s>
  if (f & 8)  content = <u key={`${key}u`}>{content}</u>
  if (f & 16) content = <code key={`${key}c`} className="rounded bg-surface px-1 font-mono text-sm">{content}</code>
  if (f & 64) content = <sup key={`${key}sup`}>{content}</sup>
  if (f & 32) content = <sub key={`${key}sub`}>{content}</sub>
  return <React.Fragment key={key}>{content}</React.Fragment>
}

function renderChildren(nodes: LexicalNode[]): React.ReactNode {
  return nodes.map((n, i) => renderNode(n, String(i)))
}

function renderNode(node: LexicalNode, key: string): React.ReactNode {
  switch (node.type) {

    case 'text':
      return renderText(node as TextNode, key)

    case 'paragraph': {
      const kids = renderChildren(node.children ?? [])
      const isEmpty = (node.children ?? []).every(
        (n) => n.type === 'text' && (n as TextNode).text === '',
      )
      if (isEmpty) return <br key={key} />
      return <p key={key} className="text-pretty">{kids}</p>
    }

    case 'heading': {
      const { tag } = node as HeadingNode
      const kids = renderChildren(node.children ?? [])
      const id   = headingSlug(nodeText(node))
      if (tag === 'h2') return (
        <h2 key={key} id={id} className="scroll-my-24 font-bold text-2xl text-fg-primary">{kids}</h2>
      )
      if (tag === 'h3') return (
        <h3 key={key} id={id} className="scroll-my-24 font-semibold text-lg text-fg-secondary">{kids}</h3>
      )
      if (tag === 'h4') return (
        <h4 key={key} className="font-semibold text-base text-fg-secondary">{kids}</h4>
      )
      return <p key={key} className="font-semibold">{kids}</p>
    }

    case 'list': {
      const { listType, tag } = node as ListNode
      const kids = renderChildren(node.children ?? [])
      if (listType === 'number' || tag === 'ol') return (
        <ol key={key} className="list-decimal pl-5">{kids}</ol>
      )
      return (
        <ul key={key} className="list-[square] pl-3.5 marker:text-white-600">{kids}</ul>
      )
    }

    case 'listitem':
      return (
        <li key={key} className="pt-1 pl-1.5 first:pt-1.5">
          {renderChildren(node.children ?? [])}
        </li>
      )

    case 'quote':
      return (
        <blockquote key={key} className="border-l-2 border-subtle-stroke pl-4 text-fg-tertiary italic">
          {renderChildren(node.children ?? [])}
        </blockquote>
      )

    case 'link':
    case 'autolink': {
      const l    = node as LinkNode
      const href = l.fields?.url ?? l.url ?? '#'
      const ext  = href.startsWith('http')
      return (
        <Link
          key={key}
          href={href}
          target={ext ? '_blank' : undefined}
          rel={ext ? 'noopener noreferrer' : undefined}
          className="-mx-px rounded-sm px-px underline decoration-transparent transition-colors duration-400 hover:duration-150 text-fg-link hover:decoration-fg-link"
        >
          {renderChildren(node.children ?? [])}
        </Link>
      )
    }

    case 'horizontalrule':
      return <hr key={key} className="border-subtle-stroke" />

    case 'linebreak':
      return <br key={key} />

    case 'upload': {
      const img = (node as UploadNode).value
      if (!img?.url) return null
      return (
        <div key={key} className="overflow-hidden rounded-xl border border-subtle-stroke">
          <Image
            src={img.url}
            alt={img.alt ?? ''}
            width={img.width ?? 1200}
            height={img.height ?? 675}
            className="w-full"
          />
        </div>
      )
    }

    default:
      if (node.children?.length) {
        return <React.Fragment key={key}>{renderChildren(node.children)}</React.Fragment>
      }
      return null
  }
}

// ─── Main component ───────────────────────────────────────────────────────────

export function LexicalRenderer({ content }: { content: unknown }) {
  if (!content || typeof content !== 'object') return null
  const root = (content as { root: LexicalNode }).root
  if (!root?.children) return null

  return (
    <div id="content" className="blog-prose font-normal leading-6.5 max-w-prose text-fg-secondary">
      {renderChildren(root.children)}
    </div>
  )
}
