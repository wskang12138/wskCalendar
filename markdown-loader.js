/* eslint-disable import/no-commonjs */
const marked = require('marked');
const hljs = require('highlight.js');

module.exports = content => {
  const __jsx = content.match(/```jsx[\s\S]*```/g)?.[0]?.replaceAll(/```jsx|```/g, '') || 'export const Jsx = () => <></>;';
  const __html = marked.marked(content, {
    // 设置代码高亮
    highlight: function (code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  });
  return `
    ${__jsx}
    export const __html = ` + '`' + __html + '`;' +
    'export const __code = `' + __jsx + '`;';
}