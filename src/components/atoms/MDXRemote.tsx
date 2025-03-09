// components/mdx-remote.js

import { MDXRemote as MDXRemoteRSC, MDXRemoteProps } from "next-mdx-remote/rsc";
import { HTMLAttributes } from "react";
import Typography from "./Typography";

// 컴포넌트 커스터마이징
const components = {
  h1: (props: HTMLAttributes<HTMLHeadElement>) => (
    <Typography.Head1 {...props} className="text-mos-main-500">
      {props.children}
    </Typography.Head1>
  ),
};

/**
 * 커스터마이징 가능한 mdx Component(use client에서 동작 x)
 * @param props mdx-remote에 필요한 요소, source, component
 * @param fallback loading 시 뿌려줄 ui element
 * @returns
 */
export default function MDXRemote(props: MDXRemoteProps) {
  return (
    <MDXRemoteRSC
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
