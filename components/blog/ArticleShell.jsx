'use client'

import BlogImage from "./BlogImage";
import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import EditorialCard from "./EditorialCard";
import ArticleSidebar from "./ArticleSidebar";
import BlogCTA from "./BlogCTA";
import { mediaUrl, formatDate, readTime } from "@/lib/blog";
import { CONTACT } from "@/utils/Constant/navigation";
import styles from "./Journal.module.css";

export default function ArticleShell({ blog, headings, parsedTags, isLatest, related, authorName, children }) {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.articleHeader}>
          <Link href="/blog" className={styles.backLink}><FiArrowLeft /> Back to Blog</Link>
          <div className={styles.eyebrow}>{blog.category || "Futurise Journal"}{isLatest && <span className={styles.category}>Latest post</span>}</div>
          <h1>{blog.title}</h1>
          <div className={styles.articleMeta}>
            <Link href="/about">By {authorName}</Link>
            <span>{formatDate(blog.createdAt)}</span>
            <span>{readTime(blog.content)} min read</span>
            {blog.updatedAt && new Date(blog.updatedAt) - new Date(blog.createdAt) > 864e5 && <span>Updated {formatDate(blog.updatedAt)}</span>}
          </div>
          {parsedTags.length > 0 && <div className={styles.tags}>{parsedTags.map(t => <span key={t}>#{t}</span>)}</div>}
        </header>
        {blog.featuredImage && (
          <div className={styles.articleImage}>
            <BlogImage src={mediaUrl(blog.featuredImage)} alt={blog.title} fill priority sizes="(max-width: 1200px) 100vw, 1120px" style={{ objectFit: "contain" }} />
          </div>
        )}
        <div className={styles.readingLayout}>
          <article className={styles.articleContent}>
            {headings.length > 0 && (
              <details className={styles.mobileContents}>
                <summary>On this page</summary>
                <nav aria-label="Article contents">{headings.map(h => <a key={h.id} href={`#${h.id}`}>{h.text}</a>)}</nav>
              </details>
            )}
            {/* ArticleBody remains server-rendered; content and anchor IDs are preserved. */}
            {children}
            <div className={styles.disclosure}>
              <strong>About this article</strong>
              <p>Written by the Futurise Solutions team. We use AI tools to help with research and drafting; our team edits each article and checks figures and regulatory details against the sources linked in it. Spotted something wrong? <a href={`mailto:${CONTACT.email}`}>Email us</a>.</p>
            </div>
          </article>
          <ArticleSidebar headings={headings} title={blog.title} slug={blog.slug} />
        </div>
      </div>
      <div className={styles.ctaBand}><BlogCTA category={blog.category} slug={blog.slug} /></div>
      {related.length > 0 && (
        <section className={`${styles.container} ${styles.related}`} aria-labelledby="related-heading">
          <div className={styles.sectionHeading}><h2 id="related-heading">Keep exploring.</h2><Link href="/blog" className={styles.textLink}>All articles <FiArrowUpRight /></Link></div>
          <div className={styles.grid}>{related.map(b => <EditorialCard key={b._id || b.slug} blog={b} />)}</div>
        </section>
      )}
    </div>
  );
}
