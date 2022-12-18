const draggableAttr = 'data-tauri-drag-region';
const draggableExAttr =
  draggableAttr +
  '--exception-' +
  [...Array(6)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
const disableArg = 'disable';

/** @type {(el: Element) => void} */
function markDraggableHierarchically(el) {
  if (el.hasAttribute(draggableExAttr)) {
    return;
  }

  el.toggleAttribute(draggableAttr, true);

  Array.from(el.children).forEach(markDraggableHierarchically);
}

/** @type {import('vue').Directive<Element, void>} */
const draggableDirective = {
  created(el, binding) {
    if (binding.arg === disableArg) {
      el.toggleAttribute(draggableExAttr, true);
    }
  },
  beforeMount(el, binding) {
    if (binding.arg !== disableArg) {
      markDraggableHierarchically(el);
    }
  },
  mounted(el, binding) {
    if (binding.arg === disableArg) {
      el.toggleAttribute(draggableExAttr, false);
    }
  },
};

/** @type {(app: import('vue').App, options: { directiveName?: string })} */
function install(app, options) {
  let directiveName = 'draggable';
  if (options && options.directiveName) {
    directiveName = options.directiveName;
  }

  app.directive(directiveName, draggableDirective);
}

/** @type {import('vue').Plugin} */
module.exports = install;
