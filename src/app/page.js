import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';
import styles from './homepage.module.css';

//uses node fs system to fetch post data from local directory
import { getBlogPostList } from '@/helpers/file-helpers';

async function Home() {
  const currentPosts = await getBlogPostList();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>

      
      {currentPosts.map(({ slug, title, abstract, publishedOn }) => (
        <BlogSummaryCard
          key={slug}
          slug={slug}
          title={title}
          abstract={abstract}
          publishedOn={publishedOn}
        />
      ))}
    </div>
  );
}

export default Home;
