import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Mail, CheckCircle } from "lucide-react";

interface SavedTemplate {
  id: number;
  name: string;
  content: string;
  date: string;
  emailCompatibility?: {
    gmail: boolean;
    outlook: boolean;
  };
}

const Library = () => {
  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load saved templates from localStorage
    const loadTemplates = () => {
      const templates = localStorage.getItem("savedTemplates");
      if (templates) {
        setSavedTemplates(JSON.parse(templates));
      }
    };

    loadTemplates();
    // Add event listener for storage changes
    window.addEventListener('storage', loadTemplates);
    return () => window.removeEventListener('storage', loadTemplates);
  }, []);

  const checkEmailCompatibility = (content: string) => {
    // Basic compatibility checks
    const hasInlineStyles = content.includes('style=');
    const hasComplexSelectors = content.includes('@media') || content.includes('@import');
    const hasWebFonts = content.includes('@font-face');
    
    return {
      gmail: !hasComplexSelectors && !hasWebFonts,
      outlook: !hasInlineStyles && !hasComplexSelectors && !hasWebFonts
    };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/html") {
      setHtmlFile(file);
      const content = await file.text();
      const compatibility = checkEmailCompatibility(content);
      
      const newTemplate = {
        id: Date.now(),
        name: file.name,
        content: content,
        date: new Date().toLocaleDateString(),
        emailCompatibility: compatibility
      };
      
      // Save to localStorage and update state
      const updatedTemplates = [...savedTemplates, newTemplate];
      localStorage.setItem("savedTemplates", JSON.stringify(updatedTemplates));
      setSavedTemplates(updatedTemplates);
      
      // Trigger storage event for other tabs
      window.dispatchEvent(new Event('storage'));
      
      // Navigate to editor with content
      navigate(`/editor`, { state: { content, compatibility } });
      
      toast({
        title: "Template Uploaded",
        description: "Your template has been uploaded successfully.",
      });
    }
  };

  const handleTemplateClick = (template: SavedTemplate) => {
    navigate(`/editor`, { 
      state: { 
        content: template.content,
        compatibility: template.emailCompatibility 
      } 
    });
  };

  const exportToEmailClient = async (template: SavedTemplate, client: 'gmail' | 'outlook') => {
    // This is a mock function - in a real implementation, you would integrate with email client APIs
    toast({
      title: `Export to ${client}`,
      description: `Template "${template.name}" has been exported to ${client} as a draft.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">My Templates</h1>
          <p className="mt-4 text-lg text-gray-600">
            Manage your saved templates and upload new ones
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={() => navigate("/editor")} className="mb-4">
            <Plus className="mr-2 h-4 w-4" /> Create New Template
          </Button>
        </div>

        <Card className="mt-4 p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Template</h2>
          <div className="flex gap-4">
            <Input
              type="file"
              accept=".html"
              onChange={handleFileUpload}
              className="flex-1"
            />
          </div>
        </Card>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Saved Templates</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {savedTemplates.length > 0 ? (
              savedTemplates.map((template) => (
                <Card
                  key={template.id}
                  className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div onClick={() => handleTemplateClick(template)}>
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                    <p className="text-sm text-gray-500">Created: {template.date}</p>
                    {template.emailCompatibility && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className={`h-4 w-4 ${template.emailCompatibility.gmail ? 'text-green-500' : 'text-red-500'}`} />
                          <span className="text-sm">Gmail Compatible</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className={`h-4 w-4 ${template.emailCompatibility.outlook ? 'text-green-500' : 'text-red-500'}`} />
                          <span className="text-sm">Outlook Compatible</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => exportToEmailClient(template, 'gmail')}
                    >
                      <Mail className="mr-2 h-4 w-4" /> Export to Gmail
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => exportToEmailClient(template, 'outlook')}
                    >
                      <Mail className="mr-2 h-4 w-4" /> Export to Outlook
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-6 text-center">
                <p className="text-gray-500">No saved templates yet</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;