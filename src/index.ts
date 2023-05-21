import { toString } from 'hast-util-to-string';
import { CONTINUE, SKIP, visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Element, Node } from 'hast';

const test = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((tagName) => ({
  type: 'element',
  tagName,
}));

const rehypeHeadingAnchor: Plugin<
  never[],
  Node<Element>,
  Node<Element>
> = () => {
  return (ast) => {
    visit(ast, test, (node, index, parent) => {
      if (index === null || parent === null) {
        return CONTINUE;
      }
      const id = node.properties?.id;
      const value = toString(node);

      if (!id || !value) {
        return;
      }

      const heading = { ...node };
      const anchor = {
        type: 'element',
        tagName: 'a',
        properties: {
          href: `#${id}`,
          className: ['heading-anchor'],
        },
        children: [heading],
      };

      parent.children.splice(index, 1, anchor);

      return SKIP;
    });
  };
};

export default rehypeHeadingAnchor;
