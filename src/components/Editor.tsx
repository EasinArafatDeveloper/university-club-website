"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-48 w-full bg-slate-50 dark:bg-slate-800 animate-pulse rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center">
      <span className="text-slate-400 text-sm">Loading Editor...</span>
    </div>
  ),
});

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "link",
  "image",
];

export default function Editor({ value, onChange, placeholder }: EditorProps) {
  return (
    <div className="quill-editor-container">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden"
      />
      <style jsx global>{`
        .quill-editor-container .ql-toolbar {
          border-top-left-radius: 0.75rem;
          border-top-right-radius: 0.75rem;
          border-color: #e2e8f0;
          background-color: #f8fafc;
        }
        .dark .quill-editor-container .ql-toolbar {
          border-color: #334155;
          background-color: #1e293b;
        }
        .quill-editor-container .ql-container {
          border-bottom-left-radius: 0.75rem;
          border-bottom-right-radius: 0.75rem;
          border-color: #e2e8f0;
          min-height: 200px;
          font-family: inherit;
        }
        .dark .quill-editor-container .ql-container {
          border-color: #334155;
        }
        .quill-editor-container .ql-editor {
          font-size: 1rem;
          color: #0f172a;
        }
        .dark .quill-editor-container .ql-editor {
          color: #f1f5f9;
        }
        .quill-editor-container .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: normal;
        }
      `}</style>
    </div>
  );
}
