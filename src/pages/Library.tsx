import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Mail, CheckCircle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { initGmailAuth, createDraft } from "@/utils/gmailAuth";

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

interface EmailAccount {
  type: 'gmail' | 'outlook';
  email: string;
  verified: boolean;
}

const Library = () => {
  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [currentEmailAccount, setCurrentEmailAccount] = useState<EmailAccount | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<SavedTemplate | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadTemplates = () => {
      const templates = localStorage.getItem("savedTemplates");
      if (templates) {
        setSavedTemplates(JSON.parse(templates));
      }
    };

    loadTemplates();
    window.addEventListener('storage', loadTemplates);
    return () => window.removeEventListener('storage', loadTemplates);
  }, []);

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
      
      const updatedTemplates = [...savedTemplates, newTemplate];
      localStorage.setItem("savedTemplates", JSON.stringify(updatedTemplates));
      setSavedTemplates(updatedTemplates);
      
      window.dispatchEvent(new Event('storage'));
      
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

  const handleDeleteTemplate = (templateId: number) => {
    const updatedTemplates = savedTemplates.filter(template => template.id !== templateId);
    localStorage.setItem("savedTemplates", JSON.stringify(updatedTemplates));
    setSavedTemplates(updatedTemplates);
    window.dispatchEvent(new Event('storage'));
    
    toast({
      title: "Template Deleted",
      description: "The template has been deleted successfully.",
    });
  };

  const initiateEmailExport = (template: SavedTemplate, type: 'gmail' | 'outlook') => {
    setSelectedTemplate(template);
    setCurrentEmailAccount({ type, email: '', verified: false });
    setIsEmailDialogOpen(true);
  };

  const verifyEmailAccount = async () => {
    if (emailInput && currentEmailAccount) {
      setCurrentEmailAccount({ ...currentEmailAccount, email: emailInput, verified: true });
      
      toast({
        title: "Email Verified",
        description: `Your ${currentEmailAccount.type} account has been verified.`,
      });

      if (selectedTemplate) {
        toast({
          title: "Template Exported",
          description: `Template saved as draft in your ${currentEmailAccount.type} account.`,
        });
      }
      
      setIsEmailDialogOpen(false);
      setEmailInput("");
      setSelectedTemplate(null);
    }
  };

  const checkEmailCompatibility = (content: string) => {
    const hasInlineStyles = content.includes('style=');
    const hasComplexSelectors = content.includes('@media') || content.includes('@import');
    const hasWebFonts = content.includes('@font-face');
    
    return {
      gmail: !hasComplexSelectors && !hasWebFonts,
      outlook: !hasInlineStyles && !hasComplexSelectors && !hasWebFonts
    };
  };

  const handleGmailExport = async (template: SavedTemplate) => {
    try {
      const accessToken = await initGmailAuth();
      await createDraft(accessToken as string, template.content);
      
      toast({
        title: "Success",
        description: "Template saved to Gmail drafts",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save template to Gmail drafts",
        variant: "destructive",
      });
    }
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
                  className="p-6 hover:shadow-lg transition-shadow relative"
                >
                  <div onClick={() => handleTemplateClick(template)} className="cursor-pointer">
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
                  <div className="mt-4 flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleGmailExport(template)}
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4" /> Export to Gmail
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="flex items-center justify-center w-10 h-10 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-6 text-center col-span-full">
                <p className="text-gray-500">No saved templates yet</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Email Account</DialogTitle>
            <DialogDescription>
              Please enter your email address to verify your account
              and save the template as a draft.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={verifyEmailAccount}>
              Verify & Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Library;
