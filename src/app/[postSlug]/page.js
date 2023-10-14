import React from 'react';
import { loadBlogPost } from '@/helpers/file-helpers';
import BlogHero from '@/components/BlogHero';
import { MDXRemote } from 'next-mdx-remote/rsc';
import styles from './postSlug.module.css';

async function BlogPost({ params }) {
  const slug = params.postSlug;
  const postData = await loadBlogPost(slug);

  const content = postData.content;
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={postData.frontmatter.title}
        publishedOn={postData.frontmatter.publishedOn}
      />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
