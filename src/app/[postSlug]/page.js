import React from 'react';
import { loadBlogPost } from '@/helpers/file-helpers';
import BlogHero from '@/components/BlogHero';
import { BLOG_TITLE } from '@/constants';
import { MDXRemote } from 'next-mdx-remote/rsc';
import CodeSnippet from '@/components/CodeSnippet';
import styles from './postSlug.module.css';
import dynamic from 'next/dynamic';
import Spinner from '@/components/Spinner';

// import DivisionGroupsDemo from '@/components/DivisionGroupsDemo';
const LazyDivisionGroupsDemo = dynamic(
  () => import('@/components/DivisionGroupsDemo'),
  { loading: Spinner}
)

export async function generateMetadata({ params }) {
  const slug = params.postSlug;
  const postData = await loadBlogPost(slug);
  const title = postData.frontmatter.title;
  const abstract = postData.frontmatter.abstract;

  return {
    title: `${title} • ${BLOG_TITLE}`,
    description: abstract,
  };
}
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
        <MDXRemote
          source={content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo: LazyDivisionGroupsDemo,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
