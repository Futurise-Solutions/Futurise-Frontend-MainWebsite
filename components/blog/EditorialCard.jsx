import BlogImage from "./BlogImage";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { mediaUrl, formatDate, readTime } from "@/lib/blog";
import styles from "./Journal.module.css";

// Dedicated to blog routes; the homepage's shared BlogCard stays unchanged.
export default function EditorialCard({ blog }) {
  return (
    <article className={styles.card}>
      <Link href={`/blog/${blog.slug}`} className={styles.cardLink}>
        <div className={styles.cardImage}>
          {blog.featuredImage ? (
            <BlogImage src={mediaUrl(blog.featuredImage)} alt={blog.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 430px" style={{ objectFit: "contain" }} />
          ) : <span className={styles.imageFallback}>Futurise Journal</span>}
          <span className={styles.imageArrow}><FiArrowUpRight aria-hidden="true" /></span>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.cardMeta}><span>{blog.category || "Insights"}</span><span>{blog.readingMinutes ?? readTime(blog.content || blog.shortDescription)} min read</span></div>
          <h3>{blog.title}</h3>
          <p>{blog.shortDescription}</p>
          <div className={styles.cardFooter}><span>{formatDate(blog.createdAt)}</span><span>Read article <FiArrowUpRight aria-hidden="true" /></span></div>
        </div>
      </Link>
    </article>
  );
}
