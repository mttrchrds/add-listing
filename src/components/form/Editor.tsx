import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "@emotion/styled";

const StyledEditor = styled.div`
  .ql-container {
    font-size: 16px;
  }
  .ql-container.ql-snow {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .ql-toolbar.ql-snow {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }
`;

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
  };

  return (
    <StyledEditor>
      <ReactQuill
        theme="snow"
        modules={modules}
        value={value}
        onChange={onChange}
      />
    </StyledEditor>
  );
};

export default Editor;
