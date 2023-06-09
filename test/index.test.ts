import { it, expect } from 'vitest';
import { rehype } from 'rehype';
import rehypeHeadingAnchor from '../src/index.js';
import rehypeSlug from 'rehype-slug';

it('should add an anchor tag to every heading', async () => {
  const processor = rehype()
    .data('settings', { fragment: true })
    .use(rehypeSlug)
    .use(rehypeHeadingAnchor);

  await Promise.all(
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(async (tag) => {
      const result = await processor.process(`<${tag}>Hello world</${tag}>`);
      expect(result.toString()).toBe(
        `<a href="#hello-world"><${tag} id="hello-world">Hello world</${tag}></a>`,
      );
    }),
  );
});

it('should ignore anchor tags without headings', async () => {
  const processor = rehype()
    .data('settings', { fragment: true })
    .use(rehypeHeadingAnchor);

  await Promise.all(
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(async (tag) => {
      const result = await processor.process(`<${tag}>Hello world</${tag}>`);
      expect(result.toString()).toBe(`<${tag}>Hello world</${tag}>`);
    }),
  );
});

it('should add specify the className when option is specified', async () => {
  const processor = rehype()
    .data('settings', { fragment: true })
    .use(rehypeSlug)
    .use(rehypeHeadingAnchor, { className: ['heading-anchor'] });

  await Promise.all(
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(async (tag) => {
      const result = await processor.process(`<${tag}>Hello world</${tag}>`);
      expect(result.toString()).toBe(
        `<a href="#hello-world" class="heading-anchor"><${tag} id="hello-world">Hello world</${tag}></a>`,
      );
    }),
  );
});

it('should add multiple classnames when the option is specified', async () => {
  const processor = rehype()
    .data('settings', { fragment: true })
    .use(rehypeSlug)
    .use(rehypeHeadingAnchor, { className: ['custom', 'name'] });

  await Promise.all(
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map(async (tag) => {
      const result = await processor.process(`<${tag}>Hello world</${tag}>`);
      expect(result.toString()).toBe(
        `<a href="#hello-world" class="custom name"><${tag} id="hello-world">Hello world</${tag}></a>`,
      );
    }),
  );
});
