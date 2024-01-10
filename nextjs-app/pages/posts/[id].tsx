import { getAllPostIds, getPostData } from "@/lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import homeStyles from "../../styles/Home.module.css";
import Head from "next/head";
import postStyle from "../../styles/Post.module.css"

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <div className={postStyle.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  console.log("paths", paths); // [ { params: {id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]

  return {
    paths,
    fallback: false, //getStaticPaths로 리턴되지 않는 것은 모두 404페이지
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log("params", params); //{ id: 'ssg-ssr' }
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};
