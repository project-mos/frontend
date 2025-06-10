import {
  EvaluateOptions,
  MDXComponents,
  MDXRemote,
} from "next-mdx-remote-client/rsc";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

function escapeCurlyBracesOutsideCodeBlocksAndInlineCode(input: string) {
  const codeBlockRegex = /```[\s\S]*?```/g; // 코드블럭 잡기
  const inlineCodeRegex = /`[^`]*`/g; // 인라인 백틱 코드 잡기
  const pTagRegex = /(<p>)([\s\S]*?)(<\/p>)/g; // <p> 태그 잡기

  // 1. 코드블럭 먼저 임시 토큰으로 치환
  const codeBlocks: unknown[] = [];
  const codeBlockPlaceholder = "___CODE_BLOCK_PLACEHOLDER___";
  let temp = input.replace(codeBlockRegex, (m) => {
    codeBlocks.push(m);
    return codeBlockPlaceholder;
  });

  // 2. 인라인 백틱 코드 임시 토큰으로 치환
  const inlineCodes: string[] = [];
  const inlineCodePlaceholder = "___INLINE_CODE_PLACEHOLDER___";
  temp = temp.replace(inlineCodeRegex, (m) => {
    inlineCodes.push(m);
    return inlineCodePlaceholder;
  });

  // 3. <p> 태그 내 중괄호만 변환
  const escaped = temp.replace(pTagRegex, (full, open, content, close) => {
    // content 내 중괄호만 변환
    const escapedContent = content
      .replace(/\{/g, "&#123;")
      .replace(/\}/g, "&#125;");
    return open + escapedContent + close;
  });

  // 4. 인라인 코드 원복
  let output = escaped;
  for (const inlineCode of inlineCodes) {
    output = output.replace(inlineCodePlaceholder, inlineCode);
  }

  // 5. 코드블럭 원복
  for (const codeBlock of codeBlocks) {
    output = output.replace(codeBlockPlaceholder, codeBlock as string);
  }

  return output;
}

interface CustomMdxRemoteProps {
  content: string;
  components?: MDXComponents;
  options?: EvaluateOptions<Record<string, unknown>> | undefined;
}
const CustomMdxRemote = ({
  content,
  components,
  options,
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
          rehypeHighlight,
          rehypeRaw,
          {
            passThrough: ["mdxJsxFlowElement", "mdxJsxTextElement"],
          },
          rehypeSanitize,
        ],
      ],
    },
  };
  return (
    <MDXRemote
      source={escapeCurlyBracesOutsideCodeBlocksAndInlineCode(content)}
      components={withStaticComponentOption}
      options={withStaticMdxOptions}
    />
  );
};

export default CustomMdxRemote;
