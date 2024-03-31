import { createFilter } from 'rollup-pluginutils';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';

export default function replaceTagsAndRemoveNonExistentProps() {
  const filter = createFilter('**/*.tsx', 'node_modules/**');

  return {
    name: 'replace-tags-and-remove-non-existent-props',

    transform(code, id) {
      if (!filter(id)) return;

      const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      });

      traverse.default(ast, {
        JSXOpeningElement(path) {
          if (['View', 'Text', 'Image', 'ScrollView'].includes(path.node.name.name)) {
            if (path.node.name.name === 'View') path.node.name.name = 'div';
            if (path.node.name.name === 'Text') path.node.name.name = 'span';
            if (path.node.name.name === 'Image') path.node.name.name = 'img';
            if (path.node.name.name === 'ScrollView') path.node.name.name = 'div';
            // 过滤并替换属性
            path.node.attributes = path.node.attributes.filter(attr => {
              if (!attr.name) return false;
              let propName = attr.name.name;
              if (propName === 'catchMove') return false; // 移除 'catchMove';
              if(propName === 'scrollIntoView') return false;
              if(propName === 'scrollX') return false;
              attr.value && replaceITouchEvent(attr.value);

              return true;
            });
          }
        },
        JSXClosingElement(path) {
          if (['View', 'Text', 'Image', 'ScrollView'].includes(path.node.name.name)) {
            if (path.node.name.name === 'View') path.node.name.name = 'div';
            if (path.node.name.name === 'Text') path.node.name.name = 'span';
            if (path.node.name.name === 'Image') path.node.name.name = 'img';
            if (path.node.name.name === 'ScrollView') path.node.name.name = 'div';
          }
        },
        CallExpression(path) {
          if (t.isIdentifier(path.node.callee) && ['onTouchMove', 'onTouchStart', 'onTouchEnd'].includes(path.node.callee.name)) {
            path.node.arguments = path.node.arguments.map(arg => replaceITouchEvent(arg));
          }
        },
        TSTypeReference(path) {
          path.replaceWith(replaceITouchEvent(path.node));
        },
        ArrowFunctionExpression(path) {
          path.node.params.forEach(param => {
            if (
              t.isTSTypeAnnotation(param.typeAnnotation) &&
              t.isTSTypeReference(param.typeAnnotation.typeAnnotation)
            ) {
              param.typeAnnotation.typeAnnotation = replaceITouchEvent(param.typeAnnotation.typeAnnotation);
            }
          });
        },
      });

      const output = generate.default(ast, {}, code);

      return {
        code: output.code,
        map: { mappings: '' }
      };
    },
  };
}

function replaceITouchEvent(node) {
  if (t.isTSTypeReference(node)) {
    if (node.typeName && t.isIdentifier(node.typeName) && node.typeName.name === 'ITouchEvent') {
      // 创建一个新的类型引用，使用 `React.TouchEvent` 作为类型名，并设置类型参数为 `HTMLDivElement`
      return t.tsTypeReference(
        t.identifier('React.TouchEvent'),
        t.tsTypeParameterInstantiation([
          t.tsTypeReference(t.identifier('HTMLDivElement'))
        ])
      );
    }
  }
  return node;
}
