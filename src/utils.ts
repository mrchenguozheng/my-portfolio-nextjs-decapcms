import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { PostData } from "./types"; // Import your type

const postsDirectory = path.join(process.cwd(), "public/content/posts");

console.log("postsDirectory:", postsDirectory)

/**
 * getSortedPostsData
 * 读取所有 Markdown 文件，提取其元数据，按日期排序，并返回一个帖子数据的数组。
 */
export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents); // 在此代码中，我们从目录中读取 Markdown 文件，使用 gray-matter 提取其元数据，并将帖子作为 props 传递。

    return {
      slug,
      ...data,
      date: data.date instanceof Date ? data.date.toISOString() : data.date || null,
    } as PostData;
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * getAllPostIds
 * 检索所有帖子文件名，并将它们映射到包含动态路由参数 slug 的对象数组。
 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ""), // 移除 .md 扩展名
    },
  }));
}

/**
 * getPostData
 * 根据 slug 获取单个帖子的内容和元数据，并以结构化格式返回。
 */
export function getPostData(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    ...matterResult.data,
    date: matterResult.data.date instanceof Date ? new Date(matterResult.data.date).toISOString() : matterResult.data.date || null,
    body: matterResult.content,
  } as PostData;
}
