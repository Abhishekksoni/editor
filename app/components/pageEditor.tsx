"use client";

import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import { PaginationPlus, PAGE_SIZES } from "tiptap-pagination-plus";
import { useState } from "react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  FileDown,
  Undo,
  Redo,
  Highlighter,
  Palette,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function PaginatedEditor() {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pageSize, setPageSize] = useState("LETTER");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Color,
      PaginationPlus.configure({
        pageHeight: 1056,
        pageWidth: 816,
        pageGap: 10,
        pageGapBorderSize: 0,
        pageGapBorderColor: "transparent",
        pageBreakBackground: "#F3F4F6",
        // footerRight: "",
        // footerLeft: "",
        // headerRight: "",
        // headerLeft: "",
        marginTop: 96,
        marginBottom: 96,
        marginLeft: 96,
        marginRight: 96,
        contentMarginTop: 0,
        contentMarginBottom: 0,
      }),
    ],
    content: `
      <h1>Legal Document Cover Letter</h1>
      <p style="text-align: right"><strong>Date:</strong> January 9, 2026</p>
      
      <p>United States Citizenship and Immigration Services<br>
      California Service Center<br>
      24000 Avila Road, 2nd Floor, Room 2312<br>
      Laguna Niguel, CA 92677</p>
      
      <p><strong>RE: I-140 Petition for [Beneficiary Name]</strong></p>
      
      <p>Dear USCIS Officer,</p>
      
      <p>We respectfully submit this I-140 Immigrant Petition for Alien Workers on behalf of [Beneficiary Name]. This petition demonstrates that the beneficiary meets all requirements for classification under the Employment-Based Second Preference category as a professional holding an advanced degree.</p>
      
      <h2>I. Introduction and Overview</h2>
      
      <p>The petitioner, [Company Name], is a leading technology company specializing in artificial intelligence and machine learning solutions. The company seeks to permanently employ [Beneficiary Name] in the position of Senior Software Engineer, a role that requires advanced technical expertise and an advanced degree.</p>
      
      <p>This petition is accompanied by extensive documentation establishing that:</p>
      
      <ul>
        <li>The beneficiary possesses the required advanced degree (Master's degree in Computer Science)</li>
        <li>The position requires an advanced degree as a minimum qualification</li>
        <li>The petitioner has the ability to pay the proffered wage</li>
        <li>The beneficiary meets all position requirements and possesses exceptional qualifications</li>
      </ul>
      
      <h2>II. Beneficiary Qualifications</h2>
      
      <p>The beneficiary holds a Master of Science degree in Computer Science from [University Name], completed in [Year]. Additionally, the beneficiary has over 8 years of progressive experience in software development, with particular expertise in:</p>
      
      <ol>
        <li>Distributed systems architecture and design</li>
        <li>Machine learning algorithm development and deployment</li>
        <li>Cloud infrastructure management and optimization</li>
        <li>Team leadership and technical mentorship</li>
      </ol>
      
      <p>The beneficiary's academic credentials and professional experience clearly exceed the minimum requirements for the proffered position. Detailed documentation of educational qualifications and work experience is provided in the supporting exhibits.</p>
      
      <h2>III. Position Requirements and Job Duties</h2>
      
      <p>The position of Senior Software Engineer requires an advanced degree in Computer Science or a related field as a minimum qualification. This is consistent with industry standards for senior-level engineering positions at technology companies of similar scale and complexity.</p>
      
      <p>The primary job duties include:</p>
      
      <ul>
        <li>Designing and implementing scalable distributed systems to handle millions of concurrent users</li>
        <li>Leading technical architecture decisions for critical infrastructure components</li>
        <li>Developing and optimizing machine learning models for production environments</li>
        <li>Mentoring junior engineers and conducting technical code reviews</li>
        <li>Collaborating with cross-functional teams to define technical requirements and specifications</li>
      </ul>
      
      <p>These duties require the theoretical and practical application of advanced computer science principles that can only be obtained through completion of an advanced degree program.</p>
      
      <h2>IV. Ability to Pay</h2>
      
      <p>The petitioner has demonstrated financial capability to pay the proffered wage of $[Amount] annually. This has been established through submission of audited financial statements, federal tax returns, and annual reports showing consistent profitability and substantial assets.</p>
      
      <p>The company's annual revenue exceeds $[Amount], with net income of $[Amount] in the most recent fiscal year. The company employs over [Number] individuals and maintains substantial cash reserves sufficient to meet all current and future wage obligations.</p>
      
      <h2>V. Conclusion</h2>
      
      <p>Based on the foregoing, we respectfully request that USCIS approve this I-140 petition. The beneficiary clearly meets all statutory and regulatory requirements for the requested classification. The petitioner has demonstrated both the need for the beneficiary's services and the ability to pay the proffered wage.</p>
      
      <p>Should you require any additional information or documentation, please do not hesitate to contact our office. We appreciate your time and consideration of this petition.</p>
      
      <p>Respectfully submitted,</p>
      
      <p><br><br>
      _________________________<br>
      [Attorney Name]<br>
      [Law Firm Name]<br>
      [Bar Number]</p>
    `,
    editorProps: {
      attributes: {
        class: "focus:outline-none prose prose-sm max-w-none",
      },
    },
  });

  // Use useEditorState to track active states
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      if (!ctx.editor) {
        return {
          isBold: false,
          isItalic: false,
          isUnderline: false,
          isHeading1: false,
          isHeading2: false,
          isBulletList: false,
          isOrderedList: false,
          isAlignLeft: false,
          isAlignCenter: false,
          isAlignRight: false,
          isAlignJustify: false,
        };
      }
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isAlignLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
        isAlignCenter: ctx.editor.isActive({ textAlign: "center" }) ?? false,
        isAlignRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
        isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }) ?? false,
      };
    },
  }) ?? {
    isBold: false,
    isItalic: false,
    isUnderline: false,
    isHeading1: false,
    isHeading2: false,
    isBulletList: false,
    isOrderedList: false,
    isAlignLeft: false,
    isAlignCenter: false,
    isAlignRight: false,
    isAlignJustify: false,
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePageSizeChange = (size: 'A4' | 'A3' | 'A5' | 'LETTER' | 'LEGAL' | 'TABLOID') => {
    if (!editor) return;
    setPageSize(size);
    editor.chain().focus().updatePageSize(PAGE_SIZES[size]).run();
  };


  if (!editor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-gray-500 text-lg">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-screen justify-center bg-gray-100 ">
      {/* Glass Toolbar */}
      <div className="sticky top-4 z-50 mx-4 mt-4">
        <div className="backdrop-blur-xl bg-white/80 border border-white/20 shadow-xl rounded-2xl">
          <div className="px-6 py-3">
            <div className="flex items-center gap-1 flex-wrap">
              {/* Undo/Redo */}
              <Toggle
                size="sm"
                pressed={false}
                onPressedChange={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                aria-label="Undo"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <Undo className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={false}
                onPressedChange={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                aria-label="Redo"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <Redo className="h-4 w-4" />
              </Toggle>

              <Separator orientation="vertical" className="h-6 mx-1" />

              {/* Text Formatting */}
              <Toggle
                size="sm"
                pressed={editorState.isBold}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
                aria-label="Bold"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <Bold className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editorState.isItalic}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                aria-label="Italic"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <Italic className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editorState.isUnderline}
                onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
                aria-label="Underline"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <span className="text-sm font-bold underline">U</span>
              </Toggle>

              <Separator orientation="vertical" className="h-6 mx-1" />

              {/* Headings */}
              <Toggle
                size="sm"
                pressed={editorState.isHeading1}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                aria-label="Heading 1"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <Heading1 className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editorState.isHeading2}
                onPressedChange={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                aria-label="Heading 2"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <Heading2 className="h-4 w-4" />
              </Toggle>

              <Separator orientation="vertical" className="h-6 mx-1" />

              {/* Lists */}
              <Toggle
                size="sm"
                pressed={editorState.isBulletList}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
                aria-label="Bullet List"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <List className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editorState.isOrderedList}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
                aria-label="Numbered List"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <ListOrdered className="h-4 w-4" />
              </Toggle>

              <Separator orientation="vertical" className="h-6 mx-1" />

              {/* Text Alignment */}
              <Toggle
                size="sm"
                pressed={editorState.isAlignLeft}
                onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
                aria-label="Align Left"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <AlignLeft className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editorState.isAlignCenter}
                onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
                aria-label="Align Center"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <AlignCenter className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editorState.isAlignRight}
                onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
                aria-label="Align Right"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <AlignRight className="h-4 w-4" />
              </Toggle>
              <Toggle
                size="sm"
                pressed={editorState.isAlignJustify}
                onPressedChange={() => editor.chain().focus().setTextAlign("justify").run()}
                aria-label="Justify"
                className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700"
              >
                <AlignJustify className="h-4 w-4" />
              </Toggle>

              <Separator orientation="vertical" className="h-6 mx-1" />


              <Separator orientation="vertical" className="h-6 mx-1" />

              {/* Page Size Selector */}
              <Select value={pageSize} onValueChange={handlePageSizeChange}>
                <SelectTrigger className="w-32 h-9 bg-white/50 border-gray-200/50">
                  <SelectValue placeholder="Page Size" />
                </SelectTrigger>
                <SelectContent className="backdrop-blur-xl bg-white/95 border-white/20">
                  <SelectItem value="LETTER">Letter</SelectItem>
                  <SelectItem value="A4">A4</SelectItem>
                  <SelectItem value="LEGAL">Legal</SelectItem>
                  <SelectItem value="A3">A3</SelectItem>
                  <SelectItem value="A5">A5</SelectItem>
                  <SelectItem value="TABLOID">Tabloid</SelectItem>
                </SelectContent>
              </Select>

              <Separator orientation="vertical" className="h-6 mx-1" />

              {/* Export Button */}
              <Button
                onClick={handlePrint}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <FileDown className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="py-10 px-4 flex justify-center ">
        <div className="max-w-6xl mx-auto bg-white ">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
 @media print {
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }
          .sticky,
          button,
          select {
            display: none !important;
          }
          .py-10 {
            padding: 0 !important;
          }
          .px-4 {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .page-break {
            page-break-before: always;
          }

        }

        .ProseMirror {
          outline: none;
        }

        .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin-top: 0.67em;
          margin-bottom: 0.67em;
        }

        .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin-top: 0.75em;
          margin-bottom: 0.75em;
        }

        .ProseMirror p {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }

        .ProseMirror ul,
        .ProseMirror ol {
          padding-left: 2em;
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }

        .ProseMirror ul {
          list-style-type: disc;
        }

        .ProseMirror ol {
          list-style-type: decimal;
        }

        .ProseMirror li {
          margin-bottom: 0.25em;
        }

        .ProseMirror mark {
          background-color: #fef08a;
          padding: 0.125em 0.25em;
          border-radius: 0.125em;
          display: flex;
          align-items: center;
          justify-content: center;
        }
          
      `}</style>
    </div>
  );
}

export default PaginatedEditor;