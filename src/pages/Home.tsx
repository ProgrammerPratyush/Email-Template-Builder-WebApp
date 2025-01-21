import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to the Email Builder! 🚀
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Create stunning and professional email templates effortlessly.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            ✨ What can you do here?
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Pre-designed Templates
              </h3>
              <p className="text-gray-500 mb-4">
                Choose from a variety of ready-to-use templates.
              </p>
              <Link to="/templates">
                <Button className="w-full">Browse Templates</Button>
              </Link>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Easy Customization
              </h3>
              <p className="text-gray-500 mb-4">
                Edit and enhance templates with our intuitive editor.
              </p>
              <Link to="/templates">
                <Button className="w-full">Start Editing</Button>
              </Link>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Start from Scratch
              </h3>
              <p className="text-gray-500 mb-4">
                Bring your creative ideas to life.
              </p>
              <Link to="/editor">
                <Button className="w-full">Create New</Button>
              </Link>
            </Card>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Whether you're designing a marketing email, a newsletter, or an
            announcement, our tools make it simple for anyone to create impactful
            emails—no coding required!
          </p>
          <p className="mt-4 text-lg font-semibold text-gray-900">
            Get started today and craft emails that stand out!
          </p>
          <Link to="/templates">
            <Button size="lg" className="mt-8">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;