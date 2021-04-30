import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';

import './App.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

class App extends Component {
  constructor() {
    super();
    this.state = {
      html: '',
      css: '',
    };
  }

  componentDidUpdate() {
    this.runCode();
  }


  runCode = () => {
    const { html, css } = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible">
        <title>Document</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    const { html, css } = this.state;
    const codeMirrorOptions = {
      theme: 'material',
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
    };

    return (
      <div className="App">
        <div className="top"></div>
        <section className="playground">
           <div className="code-editor html-code">
           <di className="editor-header">HTML</di>
           <CodeMirror
             value={html}
             options={{
               mode: 'htmlmixed',
               theme:'dracula',
               lineNumbers:true,
             }}
             onBeforeChange={(editor, data, html) => {
               this.setState({ html });
             }}
           />
         </div> 
         <div className="code-editor css-code">
         <div className="editor-header">CSS</div>
         <CodeMirror
           value={css}
           options={{
             mode: 'css',
             lineNumbers:true
           }}
           onBeforeChange={(editor, data, css) => {
             this.setState({ css });
           }}
         />
       </div> 
          
        </section>
        <section className="result">
        <div className="editor-header">Live Preview
           
        </div>
          <iframe title="result" className="iframe" ref="iframe" />
        </section>
      </div>
    );
  }
}

export default App;