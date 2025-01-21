import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { templates } from "./Templates";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"],
];

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      const template = templates.find((t) => t.id === parseInt(id));
      if (template) {
        setContent(`<h1>${template.name}</h1><p>${template.description}</p>`);
      }
    }
  }, [id]);

  const handleSave = () => {
    // Here you would typically save to a backend
    toast({
      title: "Template Saved",
      description: "Your template has been saved successfully.",
    });
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Email Template Editor</h2>
            <div className="space-x-2">
              <Button onClick={handleSave}>Save Template</Button>
              <Button variant="outline" onClick={handleDownload}>
                Download HTML
              </Button>
              <Button variant="secondary" onClick={() => navigate(-1)}>
                Back
              </Button>
            </div>
          </div>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={{
              toolbar: TOOLBAR_OPTIONS,
            }}
            className="bg-white min-h-[500px]"
          />
        </Card>
      </div>
    </div>
  );
};

export default Editor;