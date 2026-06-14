import { useState, useEffect } from "react";
import { getBlogs, toBlogArray } from "../api/blogs";

// Module-level cache so navigating between blog pages doesn't refetch.
let _cache = null;
let _inflight = null;

/** Fetch published blogs (newest first), cached for the session. */
export function useBlogs() {
  const [blogs, setBlogs] = useState(_cache || []);
  const [loading, setLoading] = useState(!_cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (_cache) return;
    let active = true;
    _inflight = _inflight || getBlogs();
    _inflight
      .then((data) => {
        const list = toBlogArray(data);
        _cache = list;
        if (active) {
          setBlogs(list);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (active) {
          setError(e);
          setLoading(false);
        }
      })
      .finally(() => {
        _inflight = null;
      });
    return () => {
      active = false;
    };
  }, []);

  return { blogs, loading, error };
}
