# vue-tauri-draggable

A Vue 3 plugin to provide a directive to conveniently mark Tauri draggable elements

## Usage

```js
import vueTauriDraggable from 'vue-tauri-draggable';
// Or CommonJS way
// const vueTauriDraggable = require('vue-tauri-draggable');

app.use(vueTauriDraggable, /* optional */ {
  // Directive name can be changed here
  // directiveName: 'draggable'
});
```

In template

```html
<div v-draggable> <!-- Adds `data-tauri-drag-region` for all children -->
  <div v-draggable:disable> <!-- Opts-out -->
    <div v-draggable /> <!-- Opts-in again -->
  </div>
</div>
```

Each element with draggable directive will recursively add `data-tauri-drag-region` to all children until reaching elements with disabling directive when before mounting.

The directive is designed to be active only once to reduce overhead, since draggability of elements is not likely to change. Thus a refresh is needed to apply changes to the directive.

A CSS helper is also included to make draggable regions look more intuitive.

```css
@import 'vue-tauri-draggable/style.css';
```
