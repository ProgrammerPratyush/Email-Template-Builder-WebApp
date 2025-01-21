import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { templates } from "./Templates";
import { Mail, AlertTriangle } from "lucide-react";

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"],
];

interface EmailCompatibility {
  gmail: boolean;
  outlook: boolean;
}

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const [compatibility, setCompatibility] = useState<EmailCompatibility>({
    gmail: true,
    outlook: true
  });

  useEffect(() => {
    if (location.state?.content) {
      setContent(location.state.content);
      if (location.state.compatibility) {
        setCompatibility(location.state.compatibility);
      }
    } else if (id) {
      const template = templates.find((t) => t.id === parseInt(id));
      if (template) {
        const templateContent = `
          <h1>${template.name}</h1>
          <p>${template.description}</p>
          <img src="${template.image}" alt="${template.name}" style="max-width: 100%; height: auto; margin: 20px 0;" />
          <p>Category: ${template.category}</p>
        `;
        setContent(templateContent);
      }
    }
  }, [id, location.state]);

  const checkEmailCompatibility = (content: string) => {
    const hasInlineStyles = content.includes('style=');
    const hasComplexSelectors = content.includes('@media') || content.includes('@import');
    const hasWebFonts = content.includes('@font-face');
    
    return {
      gmail: !hasComplexSelectors && !hasWebFonts,
      outlook: !hasInlineStyles && !hasComplexSelectors && !hasWebFonts
    };
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setCompatibility(checkEmailCompatibility(newContent));
  };

  const handleSave = () => {
    const savedTemplates = JSON.parse(localStorage.getItem("savedTemplates") || "[]");
    const newTemplate = {
      id: Date.now(),
      name: `Template ${savedTemplates.length + 1}`,
      content: content,
      date: new Date().toLocaleDateString(),
      emailCompatibility: compatibility
    };
    
    localStorage.setItem("savedTemplates", JSON.stringify([...savedTemplates, newTemplate]));
    
    // Trigger storage event for other tabs
    window.dispatchEvent(new Event('storage'));
    
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

          <div className="mb-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Email Client Compatibility</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className={`h-5 w-5 ${compatibility.gmail ? 'text-green-500' : 'text-red-500'}`} />
                <span>Gmail: {compatibility.gmail ? 'Compatible' : 'Issues detected'}</span>
                {!compatibility.gmail && (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Mail className={`h-5 w-5 ${compatibility.outlook ? 'text-green-500' : 'text-red-500'}`} />
                <span>Outlook: {compatibility.outlook ? 'Compatible' : 'Issues detected'}</span>
                {!compatibility.outlook && (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                )}
              </div>
            </div>
          </div>

          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
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