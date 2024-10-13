// pages/index.tsx
import { getSortedPostsData } from "@/src/utils"; // Import the utility function
import Link from "next/link";

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();

  console.log('allPostsData:',allPostsData)

  return {
    props: {
      posts: allPostsData,
    },
  };
};

const HomePage = ({ posts }) => {
  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <Link href="/admin">Go to Admin</Link>
      {posts.map(post => (
        <div key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.date}</p>
          <Link href={`/posts/${post.slug}`}>
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
