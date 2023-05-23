import { toString } from 'hast-util-to-string';
import { CONTINUE, SKIP, visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Element, Node } from 'hast';

const test = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((tagName) => ({
  type: 'element',
  tagName,
}));

const rehypeHeadingAnchor: Plugin<
  { className: string[] }[] | never[],
  Node<Element>,
  Node<Element>
> = (...parameters) => {
  const className =
    parameters.length > 0 &&
    Array.isArray(parameters[0].className) &&
    parameters[0].className.every((item) => typeof item === 'string')
      ? parameters[0].className.filter((item) => !!item)
      : [];

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
          ...(className.length > 0 ? { className } : {}),
        },
        children: [heading],
      };

      parent.children.splice(index, 1, anchor);

      return SKIP;
    });
  };
};

export default rehypeHeadingAnchor;
