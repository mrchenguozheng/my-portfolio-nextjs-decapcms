// pages/posts/[slug].tsx
import { getPostData, getAllPostIds } from "@/src/utils"; // Import the utility functions
import { PostData } from "@/src/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Markdown from 'react-markdown'; // 添加Markdown的导入
import remarkGfm from 'remark-gfm'; // 添加remarkGfm的导入

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false, // This will show a 404 for paths not returned by getStaticPaths
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return {
      props: {
        post: null,
      },
    }
  }
  const postData = getPostData(params.slug as string);

  return {
    props: {
      post: postData,
    },
  };
};

const PostPage: React.FC<{ post: PostData }> = ({ post }) => {

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date instanceof Date ? post.date.toISOString() : post.date || null}</p>
      {/* // a simple way to doit without using a package(NOT RECOMMENDED) */}
      {/*  <div dangerouslySetInnerHTML={{ __html: post.body }} /> */}
      {/* RECOMMNEDED */}
      <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
    </div>
  );
};

export default PostPage;
