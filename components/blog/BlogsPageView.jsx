'use client'

import { useMemo, useRef, useState } from "react";
import BlogImage from "./BlogImage";
import Link from "next/link";
import { FiArrowUpRight, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import EditorialCard from "./EditorialCard";
import { mediaUrl, formatDate, readTime } from "@/lib/blog";
import styles from "./Journal.module.css";

const PAGE_SIZE = 12;

export default function BlogsPageView({ blogs }) {
  const [active, setActive] = useState("All");
  const [page, setPage] = useState(1);
  const results = useRef(null);
  const hero = blogs[0];
  const categories = useMemo(() => [...new Set(blogs.map(b => b.category).filter(Boolean))], [blogs]);
  const filtered = useMemo(() => active === "All" ? blogs.slice(1) : blogs.filter(b => b.category === active), [blogs, active]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const changePage = (next) => {
    setPage(next);
    results.current?.scrollIntoView({ block: "start", behavior: "instant" });
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.masthead}>
          <div className={styles.eyebrow}><span /> Futurise / Journal</div>
          <div className={styles.intro}>
            <h1>Insights on AI, SaaS &amp; Product Engineering<span className={styles.period}>.</span></h1>
            <p>Engineering notes, architecture deep-dives and field lessons from building AI agents, SaaS platforms and production apps.</p>
          </div>
        </header>
        {hero ? (
          <section className={styles.feature} aria-labelledby="featured-title">
            <Link href={`/blog/${hero.slug}`} className={styles.featureImage} aria-label={`Read ${hero.title}`}>
              {hero.featuredImage ? <BlogImage src={mediaUrl(hero.featuredImage)} alt={hero.title} fill priority sizes="(max-width: 800px) 100vw, 60vw" style={{ objectFit: "contain" }} /> : <span className={styles.imageFallback}>Futurise Journal</span>}
              <span className={styles.imageArrow}><FiArrowUpRight /></span>
            </Link>
            <div className={styles.featureCopy}>
              <div className={styles.eyebrow}>Latest insight {hero.category && <span className={styles.category}>{hero.category}</span>}</div>
              <h2 id="featured-title"><Link href={`/blog/${hero.slug}`}>{hero.title}</Link></h2>
              <p>{hero.shortDescription}</p>
              <div className={styles.meta}>{formatDate(hero.createdAt)}<span> / </span>{hero.readingMinutes ?? readTime(hero.content || hero.shortDescription)} min read</div>
              <Link className={styles.textLink} href={`/blog/${hero.slug}`}>Read article <FiArrowUpRight /></Link>
            </div>
          </section>
        ) : <p className={styles.empty}>No articles published yet. Check back soon.</p>}

        <section className={styles.collection} ref={results} aria-labelledby="articles-title">
          <div className={styles.sectionHeading}>
            <h2 id="articles-title">{active === "All" ? "All articles" : `${active} articles`}</h2>
            <span className={styles.meta}>{filtered.length} {filtered.length === 1 ? "article" : "articles"}</span>
          </div>
          {categories.length > 0 && (
            <div className={styles.filters} role="group" aria-label="Filter articles by category">
              {["All", ...categories].map(category => (
                <button key={category} type="button" aria-pressed={active === category} onClick={() => { setActive(category); setPage(1); }}>{category}</button>
              ))}
            </div>
          )}
          <div aria-live="polite" aria-atomic="true" className={styles.srOnly}>{active}: {filtered.length} articles. Page {current} of {pageCount}.</div>
          {visible.length ? (
            <div className={styles.grid} key={`${active}-${current}`}>
              {visible.map(blog => <EditorialCard key={blog._id || blog.slug} blog={blog} />)}
            </div>
          ) : <p className={styles.empty}>No articles in this category yet.</p>}
          {pageCount > 1 && (
            <nav className={styles.pagination} aria-label="Article pagination">
              <button type="button" disabled={current === 1} onClick={() => changePage(current - 1)}><FiArrowLeft /> Previous</button>
              <span>Page {current} of {pageCount}</span>
              <button type="button" disabled={current === pageCount} onClick={() => changePage(current + 1)}>Next <FiArrowRight /></button>
            </nav>
          )}
        </section>
        {blogs.length > 0 && (
          <details className={styles.archive}>
            <summary><span>Complete archive <small>{blogs.length} articles</small></span><span aria-hidden="true">+</span></summary>
            <nav aria-label="Complete article archive">
              {/* Keep every URL server-rendered and crawlable, including paginated posts. */}
              {blogs.map(b => <Link key={b._id || b.slug} href={`/blog/${b.slug}`}>{b.title}<FiArrowUpRight aria-hidden="true" /></Link>)}
            </nav>
          </details>
        )}
      </div>
    </div>
  );
}
