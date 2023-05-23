# rehype-heading-anchor

rehype plugin to add anchor tags to your headings

## install

```
npm install
```

## Usage

```js
import { rehype } from 'rehype';
import rehypeHeadingAnchor from '../src/index.js';
import rehypeSlug from 'rehype-slug';

const result = await rehype()
  .data('settings', { fragment: true })
  .use(rehypeHeadingAnchor)
  .process('<h1 id="hello-world">Hello World!</h1>');

console.log(result);
```

Running the example above will yield

```html
<a href="#hello-world" class="heading-anchor"><h1 id="hello-world">Hello World!</h1></a>
```

Note that only headings with ids will be processed. Using the plugin along with plugins such as [rehype-slug](https://github.com/rehypejs/rehype-slug) is recommended to auto generate ids.
