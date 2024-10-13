// pages/index.tsx
import { getSortedPostsData } from "@/src/utils"; // Import the utility function
import { PostData } from "@/src/types";
import Link from "next/link";

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();

  return {
    props: {
      posts: allPostsData,
    },
  };
};

const HomePage: React.FC<{ posts: PostData[] }> = ({ posts }) => { // 添加类型注解
  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <Link href="/admin">Go to Admin</Link>
      {posts.map(post => (
        <div key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.date instanceof Date ? post.date.toISOString() : post.date || null}</p>
          <Link href={`/posts/${post.slug}`}>
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
