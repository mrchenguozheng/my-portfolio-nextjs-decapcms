---
layout: posts
title: "Building a Markdown Blog in Next.js with Decap CMS: A Comprehensive
  Guide - Simplify your Next.js blog setup with Decap: A free Git-based CMS
  guide."
thumbnail: /uploads/ae9c0df1-08fa-46cf-b50d-cf37109e1c8d.avif
---
[Building a Markdown Blog in Next.js with Decap CMS: A Comprehensive Guide - Simplify your Next.js blog setup with Decap: A free Git-based CMS guide. by Abdulwasiu Abdulmuize · Oct 2, 2024](https://prymastudio.hashnode.dev/building-a-markdown-blog-in-nextjs-with-decap-cms-a-comprehensive-guide#heading-33-add-links-to-admin-page)

## Introduction

In today’s fast-paced web development environment, having a reliable content management system (CMS) is essential for managing your content efficiently. Decap CMS, formerly known as Netlify CMS, is a powerful open-source headless CMS that allows developers to manage content in a user-friendly interface while leveraging the power of static site generation with frameworks like Next.js. In this tutorial, we’ll walk you through the steps to set up and use Decap CMS in a Next.js application.

## Prerequisites

Before we get started, ensure that you have the following:

* A basic understanding of Next.js
* Node.js and npm installed
* Familiarity with Git and version control

## 1. Setting Up a Next.js Project

### 1.1 Create a New Next.js Application

   First, let's create a new Next.js application. Open your terminal and run the following command:

```shell
npx create-next-app my-nextjs-cms
cd my-nextjs-cms
```

This command creates a new Next.js project in a folder named and navigates into that directory. `my-nextjs-cms`

### 1.2 Install Necessary Packages

Next, we need to install Decap CMS. You can do this by running:

```bash
npm install decap-cms-app
```

This command installs Decap CMS in your Next.js project, making it available for use.

## 2. Configure Decap CMS

### 2.1 Create a Configuration File

   Now, we’ll create a configuration file for Decap CMS. This file will define the settings and collections that Decap CMS will use.

Create a directory named `admin` inside the folder: `public`

```bash
# Create and navigate into public/admin folder

mkdir -p public/admin
cd public/admin

# Create index.html and config.yml file

touch index.html
touch config.yml
```

Then, create a file named `config.yml` in the directory: `public/admin`

```yml
# public/admin/config.yml

backend:
  name: git-gateway
  branch: main  # The branch to update
  repo: github_username/repo_name

local_backend: true # set to true to allow decap cms to save file locally during development

media_folder: "public/uploads"  # Folder to store media
public_folder: "/uploads"  # Public URL for media

collections:

* name: "posts"  # Name of the collection
      label: "Posts"  # Label for the admin UI
      folder: "/public/content/posts"  # Folder where posts are stored
      create: true  # Allow new posts to be created
      slug: "{{year}}-{{month}}-{{day}}-{{slug}}"  # Post slug format
      fields: # The fields for each document, usually in front matter
        - { name: "layout", label: "Layout",  widget: "hidden", default: "posts" }
        - { name: "title", label: "Title", widget: "string" }
        - { name: "date", label: "Date", widget: "dateformat", date_format: "YYYY-MM-DD", time_format: false }
        - { name: "thumbnail", label: "Featured Image",  widget: "image" }
        - { name: "body", label: "Body", widget: "markdown" }
```

This configuration sets up a backend with Git Gateway, specifies where to store media, and defines a collection for blog posts with fields for title, date, and body.

Here's a breakdown of the provided code in a table format:

| Key                       | Description                                                                                                                                                                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| collections               | An array defining different content collections for the CMS.                                                                                                                                                                                     |
| \- name                   | "posts": The name of the collection, used internally by the CMS.                                                                                                                                                                                 |
| \-  label                 | "Posts": The label that will be displayed in the admin UI for users.                                                                                                                                                                             |
| folder                    | "content/posts": The directory where the posts will be stored in the file system.                                                                                                                                                                |
| create                    | true: Indicates that new posts can be created in this collection.                                                                                                                                                                                |
| slug                      | "{{year}}-{{month}}-{{day}}-{{slug}}": The format for generating post URLs, using the year, month, day, and custom slug.                                                                                                                         |
| fields                    | An array defining the fields that each post will have, usually found in the front matter at the beginning of the document, (except for , which follows the front matter). Each field contains the following properties: , , .bodylabelwidgetname |
| \- { name: "layout"       | Defines a field for the post's layout.                                                                                                                                                                                                           |
| label: "Layout"           | The label for the layout field, shown in the admin UI.                                                                                                                                                                                           |
| widget: "hidden"          | The type of widget for this field, which is hidden in the UI.                                                                                                                                                                                    |
| default: "posts"          | The default value for this field, set to "posts".                                                                                                                                                                                                |
| \- { name: "title"        | Defines a field for the post's title.                                                                                                                                                                                                            |
| label: "Title"            | The label for the title field in the admin UI.                                                                                                                                                                                                   |
| widget: "string"          | The type of widget for this field, which allows string input.                                                                                                                                                                                    |
| \* { name: "date"         | Defines a field for the post's date.                                                                                                                                                                                                             |
| label: "Date"             | The label for the date field in the admin UI.                                                                                                                                                                                                    |
| widget: "dateformat"      | The type of widget for date input, providing a date picker.                                                                                                                                                                                      |
| date_format: "YYYY-MM-DD" | Specifies the format for displaying the date.                                                                                                                                                                                                    |
| time_format: false        | Indicates that time should not be included in this field.                                                                                                                                                                                        |
| \- { name: "thumbnail"    | Defines a field for the post's featured image.                                                                                                                                                                                                   |
| label: "Featured Image"   | The label for the thumbnail field in the admin UI.                                                                                                                                                                                               |
| widget: "image"           | The type of widget for this field, allowing image uploads.                                                                                                                                                                                       |
| \- { name: "body"         | Defines a field for the main content of the post.                                                                                                                                                                                                |
| label: "Body"             | The label for the body field in the admin UI.                                                                                                                                                                                                    |
| widget: "markdown"        | The type of widget for this field, allowing for Markdown input for the post content.                                                                                                                                                             |

This table breaks down each part of the configuration, providing a clear understanding of the structure and purpose of each key in the CMS collection setup.

Paste HTML for Decap CMS into your filepublic/admin/index.html

```html
<!doctype html>

<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Decap CMS -->
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

### 2.2 Set Up Authentication

To enable authentication, you can use Git Gateway. This allows users to authenticate via Git providers (e.g., GitHub, GitLab) or services like Netlify. Make sure your hosting platform supports this configuration.

1. If you are using Netlify, enable Identity and Git Gateway in your Netlify dashboard.

   1. Go to Integrations > Identity > Netlify Identity - Enable, click Enable Identity, and then go to Configuration and usage.
   2. Under Registration, choose Open or Invite only. Usually, you want only invited users to access your CMS, but if you're just testing, you can leave it open.
   3. To allow one-click login with services like Google and GitHub, check the boxes next to the services you want to use under External providers.
   4. Scroll down to Services > Git Gateway, and click Enable Git Gateway. This will authenticate with your Git host and generate an API access token. We're leaving the Roles field blank, which means any logged-in user can access the CMS. For more details on changing this, check the Netlify Identity documentation.
2. Configure your repos settings to allow access via the configured identity provider.

## 3. Create Admin Interface

### 3.1 Create the Admin Page

   We need to create a page that will serve as the admin interface for Decap CMS. Create a new file named in the directory:index.tsxpages/admin

```tsx
// pages/admin/index.tsx

import { useEffect } from "react";
import Head from "next/head";

interface NetlifyIdentity {
  on: (event: string, callback: (user: any) => void) => void; // Update here
  // Add other properties and methods as needed
}

declare global {
  interface Window {
    netlifyIdentity: NetlifyIdentity;
  }
}

const CMSPage: React.FC = () => {
  useEffect(() => {
    // Initialize Netlify Identity
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }

  // Dynamically add the decap-cms script in the body
  // const script = document.createElement("script");
  // script.src = "https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js";
  // script.async = true;
  // document.body.appendChild(script);

  // return () => {
  //   document.body.removeChild(script);
  // };
  }, \[]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex" />
        <title>Content Manager</title>
        <script
          src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
          async
        ></script>
        <script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          async
        ></script>
        <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
      </Head>
      <main id="cms" />
    </>
  );
};

export default CMSPage;
```

Alternatively, we can also use the Next.js Script tag like this:

```tsx
 import Script from "next/script";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex" />
        <title>Content Manager</title>
        <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
      </Head>
      <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        async
      />
      <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" async></Script>
      <main id="cms" />
    </>
  );
```

### Let's break down the code.

Importing Required Modules

```tsx
import { useEffect } from "react";
import Head from "next/head";
```

The code begins by importing necessary modules. `useEffect` from React is a hook that allows us to perform side effects in functional components, such as initializing authentication when the component mounts. from Next.js is used `Head` to manage the document head, allowing us to set meta tags, titles, and scripts essential for our application. 

### Defining the Netlify Identity Interface

```tsx
interface NetlifyIdentity {
  on: (event: string, callback: (user: any) => void) => void; // Update here
  // Add other properties and methods as needed
}
```

Here, we define an interface called `NetlifyIdentity`. This interface specifies the structure of the Netlify Identity object we expect to find on the `window` object. The method `on` allows us to listen for specific events (like "init" or "login") and provide a callback function that receives a `user` object.

### Declaring Global Variables

```tsx
declare global {
  interface Window {
    netlifyIdentity: NetlifyIdentity;
  }
}
```

In this section, we extend the global interface to include our `Window` interface. This ensures TypeScript understands that `window.netlifyIdentity` exists and conforms to our defined `NetlifyIdentity` structure, eliminating type errors during development.

### The CMSPage Component

```tsx
const CMSPage: React.FC = () => {
```

We define a functional component named `CMSPage`. This component serves as the main interface for our content management system.

### Setting Up useEffect

```tsx
useEffect(() => {
  // Initialize Netlify Identity
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", (user) => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
}, \[]);
```

Inside the component, we utilize the hook `useEffect`. This hook runs after the component mounts, and here’s what happens:

1. **Check for Netlify Identity**: We first check if `window.netlifyIdentity` is available, ensuring that the Netlify Identity script has loaded properly.
2. Listening for Events:

   * **"init" Event**: When the Netlify Identity initializes, it returns a `user` object if the user is already logged in. If `user` is `null`, it indicates that no user is logged in.
   * **"login" Event**: If the user logs in, we redirect them to the route `/admin/`, where they can manage content.

This flow ensures that users who are not logged in are automatically redirected to the login interface.

### Configuring the Document Head

```tsx
return (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="noindex" />
      <title>Content Manager</title>
      <script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        async
      ></script>
      <script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        async
      ></script>
      <link href="/admin/config.yml" type="text/yaml" rel="cms-config-url" />
    </Head>
    <main id="cms" />
  </>
);
```

In this part of the code, we define the structure of the HTML document:

* **Meta Tags**: We set the character set, viewport settings for responsiveness, and specify that this page should not be indexed by search engines.
* **Title**: The title of the page is set to "Content Manager", which will be displayed in the browser tab.
* **Scripts:**

  * We include the Decap CMS script from a CDN, which is necessary for the CMS functionalities.
  * We also include the Netlify Identity widget script, enabling user authentication functionalities.
* **Configuration Link**: The link to our CMS configuration file (`public/admin/config.yml`) is included, which the Decap CMS will use to understand how to manage our content.

### Main Render Function

```
<main id="cms" />
```

Finally, we define a `<main>` element with an ID of `cms`. This is where Decap CMS will mount and manage content.

### Exporting the Component

```tsx
export default CMSPage;
```

We export the component `CMSPage`, making it available for use in other parts of our Next.js application.

## 3.2 Start Your local server

### Working with a Local Git Repository

Decap CMS can be connected to a local Git repository, allowing you to manage content without relying on a live repository. Here’s how to set it up:

**1. Navigate to Your Local Git Repository**

```
Ensure you're in the root directory of your local Git repository configured with Decap CMS.
```

**2. Update Your Configuration**

```
In your file `config.yml`, add the following top-level property to enable local backend functionality:
```

```yaml
 local_backend: true
 backend:
   name: git-gateway
```

**3. Start the Decap Server**
    Run the following command from the root directory of your repository to start the Decap server:

```shell
 npx decap-server
```

If the default port (8081) is already in use, the proxy server won't start, and you will see an error message. In this case, you should resolve the port conflict before proceeding.

**4. Start Your Next.js Development Server**

In a separate terminal window, start your Next.js application. For example:

```shell
 npm run dev
```

**5. Access the Admin Interface**

Open your web browser and navigate to:

```ignore
 http://localhost:<your-nextjs-port>/admin
```

Replace `<your-nextjs-port>` with the port number your Next.js server is running on (the default is usually 3000). This allows you to verify that you can administer your content locally.

## Important Note

It’s crucial to keep the Decap server running alongside your Next.js development server. The Decap server serves as a backend for content management, enabling the CMS to save files locally during development. If the Decap server is not running, you won't be able to access the admin interface or manage your content effectively.

Additionally, please be aware that the Decap server operates an unauthenticated Express server. Since any client can send requests to this server, it should only be used for local development purposes. Also, note that the feature `editorial_workflow` is not supported in this environment.

## 3.3 Add Links to Admin Page

Next, you may want to provide a navigation link to the admin page from your application. You can do this by modifying the file:index.tsx

```tsx
// pages/index.tsx
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <Link href="/admin">Go to Admin</Link>
    </div>
  );
};

export default HomePage;
```

## 4. Build Your Content Structure

### 4.1 Creating Markdown Files

   To structure your content, create a directory `content/posts` for your blog posts in the public directory. This will be where Decap CMS saves the markdown files created from the admin interface, as configured in the file: `config.yml`

```shell
mkdir -p content/posts
```

Within this directory `content/posts`, you can manually create Markdown files for your blog posts or use a content management system like **Decap CMS** to manage your posts directly from an admin interface.

### 4.2 Previewing Content

Decap CMS allows you to preview content directly within the admin interface. You can test this feature by creating a new post and using the preview option available in the editor.

![The Admin Interface of Decap CMS](/uploads/ae9c0df1-08fa-46cf-b50d-cf37109e1c8d.avif)

## 5. Writing Utility Functions for Markdown Posts

   To effectively manage and fetch your blog posts, it’s a good practice to create a utility file containing functions that handle operations related to your Markdown files. This can help keep your code clean and organized.

First, install the package to parse markdown frontmatter:gray-matter

```bash
npm install gray-matter
```

### 5.1 Creating a Utils File

Create a new file named `utils.ts`(or any preferred name) in your project directory, and add the following functions to manage your Markdown files: 

```ts
// utils.ts
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { PostData } from "./types"; // Import your type
```

```ts
// types.ts
// example if using typescript: this is based on the post schema we created in the config.yml

export interface PostData {
  slug: string;
  title: string;
  description: string;
  date: string; // Use Date type if you want to work with Date objects
  thumbnail?: string; // Optional
  author: string;
  body: string; // The actual content of the post
}

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getSortedPostsData(): PostData\[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: PostData\[] = fileNames.map((fileName) => {
    const slug = fileName.replace(/.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

return {
  slug,
  ...data,
  date: data.date instanceof Date ? data.date.toISOString() : data.date,
} as PostData;

  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/.md$/, ""), // Removing .md extension
    },
  }));
}

export function getPostData(slug: string): PostData {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  return {
    slug,
    ...matterResult.data,
    date: matterResult.data.date instanceof Date ? new Date(matterResult.data.date).toISOString() : matterResult.data.date,
    body: matterResult.content,
  } as PostData;
}
```

### 5.2 Explanation of Utility Functions

| Function Name                          | Description                                                                                                                                      |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| getSortedPostsData                     | Reads all Markdown files, extracts their metadata, sorts the posts by date, and returns an array of post data.                                   |
| getAllPostIds                          | Retrieves all post file names and maps them to an array of objects containing the parameter for dynamic routing in Next.js.slug                  |
| getPostData                            | Fetches the content and metadata of a single post based on its slug, returning it in a structured format.                                        |
| const { data } = matter(fileContents); | In this code, we read the Markdown files from the directory, extract their metadata using gray-matter, and pass the posts as props.content/posts |

## 6. Fetching and Displaying Content in Next.js

   Now that we have our utility functions, we can integrate them into our Next.js pages.

### 6.1 Use to Fetch PostsgetStaticProps

Next.js allows you to fetch data at build time using `getStaticProps`.

To fetch data at build time using `getStaticProps`, update your file `index.tsx` in the directory: `pages`

```tsx
// pages/index.tsx
import { getSortedPostsData } from "@/utils"; // Import the utility function
import Link from "next/link";

export const getStaticProps = async () => {
  const allPostsData = getSortedPostsData();

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
```

In this code, we read the Markdown files from the `content/posts` directory, extract their metadata using our utility function, and pass the posts as props to the `HomePage` component.

### 6.2 Rendering Posts on the Page

You can render each post’s title and date in a list format. The link `Read More` will take users to a detailed page for each post.

Create a dynamic route to display individual posts. Create a new folder called `posts` under `pages`, then create a file: `[slug].tsx`

This code allows you to fetch and render the content of individual markdown posts.

To properly handle markdown we can use a markdown parser and sanitizer such as the `react-markdown` or `next-mdx-remote` .

start by installing your prefered package, here I will be using the `react-markdown` for simplicity:

```bash
npm i react-markdown
```

You can now use as follows:

```tsx
// pages/posts/\[slug].tsx
import { getPostData, getAllPostIds } from "@/utils"; // Import the utility functions
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false, // This will show a 404 for paths not returned by getStaticPaths
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = getPostData(params.slug as string);

  return {
    props: {
      post: postData,
    },
  };
};

const PostPage = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
     {/ *// a simple way to doit without using a package(NOT RECOMMENDED)* /}
          {/  *<div dangerouslySetInnerHTML={{ __html: post.body }} />* /} 
     {/ *RECOMMNEDED* /}
      <Markdown remarkPlugins={\\[remarkGfm]}>{post.body}</Markdown>
    </div>
  );
};

export default PostPage;
```

## 6. Deployment

### 6.1 Deploying to Netlify or Vercel

   After you’ve completed your application, you can deploy it to platforms like Netlify or Vercel.

* **Netlify**: You can connect your GitHub repository to Netlify and enable Identity and Git Gateway

to manage authentication for Decap CMS.

* **Vercel**: Simply push your code to a GitHub repository, and you can deploy it directly from Vercel’s dashboard.

### 6.2 Environment Variables

If you are using any environment variables (e.g., for GitHub or GitLab authentication), make sure to set them up in your platform's settings.

## 7. Conclusion

   Congratulations! You have successfully set up and integrated Decap CMS with your Next.js application. You can now manage your blog content easily through the Decap CMS interface.

In this guide, we've explored how to set up a Markdown blog in Next.js, including creating a content structure, writing utility functions to manage posts, and using these functions to display content in the application.

By organizing your code and leveraging utility functions, you can keep your blog manageable and extendable, allowing for easy content updates and a smooth user experience. Now, you can create and manage your blog posts efficiently, whether manually or through a content management system like **Decap CMS**. Happy blogging!

If you have any questions or feedback, feel free to leave a comment below!
