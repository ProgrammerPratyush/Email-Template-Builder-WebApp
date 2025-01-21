import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Library = () => {
  const [htmlFile, setHtmlFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/html") {
      setHtmlFile(file);
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

        <Card className="mt-8 p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Template</h2>
          <div className="flex gap-4">
            <Input
              type="file"
              accept=".html"
              onChange={handleFileUpload}
              className="flex-1"
            />
            <Button disabled={!htmlFile}>Upload</Button>
          </div>
        </Card>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Saved Templates</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for saved templates */}
            <Card className="p-6 text-center">
              <p className="text-gray-500">No saved templates yet</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;