import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const templates = [
  {
    id: 1,
    name: "Business Invitation",
    description: "Professional template for business events and meetings",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    category: "Business",
  },
  {
    id: 2,
    name: "Newsletter",
    description: "Clean and modern newsletter template",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    category: "Marketing",
  },
  {
    id: 3,
    name: "Product Launch",
    description: "Announce your new product with style",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    category: "Marketing",
  },
  {
    id: 4,
    name: "Welcome Email",
    description: "Warm welcome message for new subscribers",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    category: "Onboarding",
  },
  {
    id: 5,
    name: "Event Announcement",
    description: "Promote your upcoming events",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    category: "Events",
  },
  {
    id: 6,
    name: "Thank You",
    description: "Express gratitude to your customers",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Customer Service",
  },
  {
    id: 7,
    name: "Feedback Request",
    description: "Gather customer feedback effectively",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    category: "Customer Service",
  },
  {
    id: 8,
    name: "Holiday Special",
    description: "Seasonal greetings and promotions",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "Marketing",
  },
  {
    id: 9,
    name: "Company Update",
    description: "Keep your team informed",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    category: "Internal",
  },
  {
    id: 10,
    name: "Promotional Offer",
    description: "Showcase your special deals",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "Marketing",
  },
];

const Templates = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Email Templates</h1>
          <p className="mt-4 text-lg text-gray-600">
            Choose from our collection of professional email templates
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={template.image}
                alt={template.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <span className="inline-block px-2 py-1 text-xs font-semibold text-primary bg-blue-50 rounded-full">
                  {template.category}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                  {template.name}
                </h3>
                <p className="mt-2 text-gray-600">{template.description}</p>
                <Link to={`/editor/${template.id}`}>
                  <Button className="mt-4 w-full">Use Template</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;