import {
  EvaluateOptions,
  MDXComponents,
  MDXRemote,
} from "next-mdx-remote-client/rsc";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

function escapeOutsideCodeAndMarkdown(input: string, preview = false) {
  const codeBlockRegex = /```[\s\S]*?```/g;
  const inlineCodeRegex = /`[^`]*`/g;
  const markdownLinkRegex = /!?\[.*?\]\(.*?\)/g;
  const pTagRegex = /(<p>)([\s\S]*?)(<\/p>)/g;

  const imgTagRegex = /<img[^>]*>/g;
  const markdownImageRegex = /!\[.*?\]\(.*?\)/g;
  const preTagRegex = /<pre[\s\S]*?<\/pre>/g;
  const htmlAnchorTagRegex = /<a[\s\S]*?<\/a>/g;
  const markdownTextLinkRegex = /\[[^\]]+\]\([^)]+\)/g;
  const halfCodeBlockRegex = /```[\s\S]*?/g;
  // preview 옵션: 이미지 제거
  if (preview) {
    input = input
      .replace(halfCodeBlockRegex, "") // ```코드``` 제거
      .replace(preTagRegex, "") // <pre> 코드 제거
      .replace(imgTagRegex, "") // <img> 제거
      .replace(markdownImageRegex, "") // ![]() 제거
      .replace(htmlAnchorTagRegex, "") // <a>링크 제거
      .replace(markdownTextLinkRegex, ""); // [text](url) 제거
  }

  // 코드블럭 저장
  const codeBlocks: string[] = [];
  const codeBlockPlaceholder = "___CODE_BLOCK_PLACEHOLDER___";
  input = input.replace(codeBlockRegex, (m) => {
    codeBlocks.push(m);
    return codeBlockPlaceholder;
  });

  // 인라인 코드 저장
  const inlineCodes: string[] = [];
  const inlineCodePlaceholder = "___INLINE_CODE_PLACEHOLDER___";
  input = input.replace(inlineCodeRegex, (m) => {
    inlineCodes.push(m);
    return inlineCodePlaceholder;
  });

  // 마크다운 링크 저장
  const markdownLinks: string[] = [];
  const markdownLinkPlaceholder = "___MARKDOWN_LINK_PLACEHOLDER___";
  input = input.replace(markdownLinkRegex, (m) => {
    markdownLinks.push(m);
    return markdownLinkPlaceholder;
  });

  // <p> 안쪽 중괄호만 escape
  let temp = input.replace(pTagRegex, (full, open, content, close) => {
    const escapedContent = content
      .replace(/\{/g, "&#123;")
      .replace(/\}/g, "&#125;");
    return open + escapedContent + close;
  });

  // 태그 밖에 있는 /, {, } escape
  temp = temp.replace(/(<[^>]+>)|([^<]+)/g, (match, tag, text) => {
    if (tag) return tag;
    if (text) {
      return text
        .replace(/\//g, "")
        .replace(/\{/g, "&#123;")
        .replace(/\}/g, "&#125;");
    }
    return match;
  });

  // 저장했던 항목 복원
  for (const markdownLink of markdownLinks) {
    temp = temp.replace(markdownLinkPlaceholder, markdownLink);
  }
  for (const inlineCode of inlineCodes) {
    temp = temp.replace(inlineCodePlaceholder, inlineCode);
  }
  for (const codeBlock of codeBlocks) {
    temp = temp.replace(codeBlockPlaceholder, codeBlock);
  }

  return temp;
}

interface CustomMdxRemoteProps {
  content: string;
  components?: MDXComponents;
  options?: EvaluateOptions<Record<string, unknown>> | undefined;
  preview?: boolean;
}
const CustomMdxRemote = ({
  content,
  components,
  options,
  preview = false,
}: CustomMdxRemoteProps) => {
  const withStaticComponentOption: MDXComponents = {
    ...components,
    p: (props) => <span {...props} />,
  };
  const withStaticMdxOptions: EvaluateOptions<Record<string, unknown>> = {
    ...options,
    mdxOptions: {
      rehypePlugins: [
        [
          rehypeRaw,
          {
            passThrough: ["mdxJsxFlowElement", "mdxJsxTextElement"],
          },
        ],
        [rehypeSanitize, defaultSchema],
        rehypeHighlight,
      ],
    },
  };
  console.log(escapeOutsideCodeAndMarkdown(content, preview));
  return (
    <MDXRemote
      source={escapeOutsideCodeAndMarkdown(content, preview)}
      components={withStaticComponentOption}
      options={withStaticMdxOptions}
    />
  );
};

export default CustomMdxRemote;
