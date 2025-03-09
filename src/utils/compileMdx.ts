import { compileMDX } from "next-mdx-remote/rsc";

/**
 * md frontmatter 및 옵션 지원하는 string 파일로 변환
 * 현재는 필요없음
 * @returns {content, frontmatter}
 */
export async function compileMdx(source: string) {
  const { content, frontmatter } = await compileMDX({
    source: source,
    options: { parseFrontmatter: true },
  });
  return { content, frontmatter };
}
