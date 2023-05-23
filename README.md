# rehype-heading-anchor

rehype plugin to add anchor tags to your headings

## install

```
npm install
```

## Usage

This plugin will wrap headings (h1, h2, h3, ... , h6) with anchor tags. For basic use, specifying the plugin should just work.

```js
import { rehype } from 'rehype';
import rehypeHeadingAnchor from 'rehype-heading-anchor';

const result = await rehype()
  .data('settings', { fragment: true })
  .use(rehypeHeadingAnchor)
  .process('<h1 id="hello-world">Hello World!</h1>');

console.log(result);
```

Running the example above will yield

```html
<a href="#hello-world"><h1 id="hello-world">Hello World!</h1></a>
```

Note that only headings with ids will be processed. Apply plugins such as [rehype-slug](https://github.com/rehypejs/rehype-slug) before this plugin to auto generate ids.

## API

```
unified().use(rehypeHeadingAnchor[, options])
```

`options.className` pass an array of string to add class names to the generated anchor tag

```js
import { rehype } from 'rehype';
import rehypeHeadingAnchor from 'rehype-heading-anchor';

const result = await rehype()
  .data('settings', { fragment: true })
  .use(rehypeHeadingAnchor, { className: ['custom-class'] })
  .process('<h1 id="hello-world">Hello World!</h1>');

console.log(result);
```

Running the example above will yield

```html
<a href="#hello-world">
  <h1 id="hello-world" className="custom-class">Hello World!</h1>
</a>
```

## License

MIT © Kazushi Konosu
