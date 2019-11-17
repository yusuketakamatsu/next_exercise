import React from 'react';
import MyLayout from '../components/MyLayout';
import marked from 'marked';
// import Highlight from 'react-highlight';
import dynamic from 'next/dynamic';

const Highlight = dynamic(() => import('react-highlight'));

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true
});

export default function withPost(options) {
  return class PostPage extends React.Component {
    renderMarkdown() {
      if (/~~~/.test(options.content)) {
        return (
          <div>
            <Highlight innnerHtml>{marked(options.content)}</Highlight>
          </div>
        );
      }

      return <div dangerouslySetInnerHTML={{ __html: marked(options.content)}} />;
    }

    render() {
      return (
        <MyLayout>
          <h1>{options.title}</h1>
          {this.renderMarkdown()}
        </MyLayout>
      );
    };
  };
};
