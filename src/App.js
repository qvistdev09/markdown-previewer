import React from 'react';
import marked from 'marked';
import DOMPurify from 'dompurify';

const renderer = new marked.Renderer();
renderer.image = function () {
  return `<img alt="${arguments[2]}" src="${arguments[0]}" class="img-fluid" >`;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawInput: defaultText,
      markedContent: DOMPurify.sanitize(
        marked(defaultText, { gfm: true, breaks: true, renderer: renderer})
      ),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      rawInput: event.target.value,
      markedContent: DOMPurify.sanitize(
        marked(event.target.value, { gfm: true, breaks: true, renderer: renderer })
      ),
    });
  }

  render() {
    return (
      <div className="container-fluid p-4">
        <h1 className="text-center display-6 q-header">
          Markdown previewer
          <small className="text-muted"> by <a href="https://github.com/qvistdev09" target="_blank" rel="noopener noreferrer">qvistdev09</a></small>
          </h1>
        <hr />
        <div className="row">
          <InputContainer
            header="Input window"
            handleChange={this.handleChange}
            rawInput={this.state.rawInput}
          />
          <PreviewContainer
            header="Preview window"
            markedContent={this.state.markedContent}
          />
        </div>
      </div>
    );
  }
}

function InputContainer(props) {
  return (
    <div className="col-sm">
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white"><i className="fas fa-info-circle"></i>{" " + props.header}</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="editor">Write your markdown here</label>
              <textarea
                className="form-control"
                id="editor"
                rows="15"
                onChange={props.handleChange}
                value={props.rawInput}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function PreviewContainer(props) {
  return (
    <div className="col-sm">
      <div className="card shadow-sm">
        <div className="card-header bg-secondary text-white"><i className="fas fa-images"></i>{" " + props.header}</div>
        <div className="card-body">
          <div
            id="preview"
            dangerouslySetInnerHTML={{ __html: props.markedContent }}
          />
        </div>
      </div>
    </div>
  );
}

const defaultText = `# This is a header
## And this is a sub-header!

You can also input [links](https://www.freecodecamp.com)

As well as nifty code stuff, \`<div>like this!</div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

1. List items are a thing too!
1. So go ahead and use those.
1. You can start each one with a 1

> We all love block quotes!
> They make things look fancy.
> So let's quote things. All the time. In blocks!

Images can be embedded too:

![React Logo w/ Text](https://goo.gl/Umyytc)

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

`;

export default App;
