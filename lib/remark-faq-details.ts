import { FAQ_TITLE } from "@/lib/blog-faq";

/** The few mdast fields this plugin reads; @types/mdast isn't a direct dependency. */
type MdNode = {
  type: string;
  depth?: number;
  value?: string;
  children?: MdNode[];
  data?: { hName?: string };
};

function text(node: MdNode): string {
  return node.value ?? (node.children ?? []).map(text).join("");
}

/** Same stop rule as extractFaq: a horizontal rule, or a paragraph that is only bold or only italic. */
function endsFaq(node: MdNode): boolean {
  if (node.type === "thematicBreak") return true;
  const only = node.type === "paragraph" && node.children?.length === 1 ? node.children[0] : null;
  return only?.type === "strong" || only?.type === "emphasis";
}

/**
 * Turns each H3 question in a post's FAQ section, with its answer, into
 * <details><summary><h3>…</h3></summary>…</details>, the collapsible pattern
 * the Conflict page uses. The answers stay in the server-rendered HTML, so
 * search and answer engines read them whether or not they are open, and the
 * FAQPage schema (extractFaq) still reads the same markdown.
 */
export function remarkFaqDetails() {
  return (tree: MdNode) => {
    const children: MdNode[] = [];
    let inFaq = false;
    let item: MdNode | null = null;

    for (const node of tree.children ?? []) {
      if (node.type === "heading" && (node.depth ?? 0) <= 2) {
        item = null;
        inFaq = node.depth === 2 && FAQ_TITLE.test(text(node));
      } else if (inFaq && endsFaq(node)) {
        item = null;
        inFaq = false;
      } else if (inFaq && node.type === "heading" && node.depth === 3) {
        item = {
          type: "faqItem",
          data: { hName: "details" },
          children: [{ type: "faqQuestion", data: { hName: "summary" }, children: [node] }],
        };
        children.push(item);
        continue;
      } else if (item) {
        item.children!.push(node);
        continue;
      }
      children.push(node);
    }
    tree.children = children;
  };
}
