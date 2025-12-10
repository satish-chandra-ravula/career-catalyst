import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIAssistantBubble from "@/components/ai/AIAssistantBubble";
import { 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Layout,
  Eye
} from "lucide-react";

const templates = [
  {
    id: "professional",
    name: "Professional Classic",
    description: "Clean, traditional layout perfect for corporate roles",
    preview: "linear-gradient(135deg, hsl(220 15% 95%) 0%, hsl(220 20% 90%) 100%)",
    features: ["ATS-optimized", "Clean sections", "Professional fonts"],
    popular: true,
  },
  {
    id: "modern",
    name: "Modern Minimal",
    description: "Contemporary design with a focus on readability",
    preview: "linear-gradient(135deg, hsl(240 20% 98%) 0%, hsl(245 30% 95%) 100%)",
    features: ["Two-column layout", "Skills highlight", "Modern typography"],
    popular: false,
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated template for senior positions",
    preview: "linear-gradient(135deg, hsl(215 25% 92%) 0%, hsl(220 20% 88%) 100%)",
    features: ["Leadership focus", "Achievement blocks", "Elegant design"],
    popular: false,
  },
  {
    id: "creative",
    name: "Creative Pro",
    description: "Stand out while staying ATS-friendly",
    preview: "linear-gradient(135deg, hsl(280 20% 96%) 0%, hsl(320 15% 94%) 100%)",
    features: ["Unique sections", "Visual hierarchy", "Personality plus"],
    popular: false,
  },
];

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [aiMessages] = useState([
    { id: "templates", text: "Choose a template that matches your industry. All are ATS-optimized! 🎨", type: "info" as const }
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border mb-6">
                <Layout className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">
                  Step 2 of 3
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Choose Your Template
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                All templates are ATS-optimized and designed to get past automated screening
              </p>
            </motion.div>

            {/* Templates Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    variant="elevated"
                    className={`cursor-pointer transition-all duration-300 hover-lift overflow-hidden ${
                      selectedTemplate === template.id
                        ? "ring-2 ring-primary shadow-glow"
                        : ""
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    {/* Preview Area */}
                    <div
                      className="h-48 relative"
                      style={{ background: template.preview }}
                    >
                      {template.popular && (
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          Most Popular
                        </div>
                      )}
                      {selectedTemplate === template.id && (
                        <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                      
                      {/* Mock Resume Preview */}
                      <div className="absolute inset-4 bg-card rounded-lg shadow-md p-4 overflow-hidden">
                        <div className="space-y-2">
                          <div className="h-3 w-32 bg-foreground/20 rounded" />
                          <div className="h-2 w-24 bg-foreground/10 rounded" />
                          <div className="mt-4 space-y-1.5">
                            <div className="h-2 w-full bg-foreground/5 rounded" />
                            <div className="h-2 w-4/5 bg-foreground/5 rounded" />
                            <div className="h-2 w-3/4 bg-foreground/5 rounded" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">
                        {template.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-2 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button variant="outline" size="lg" disabled={!selectedTemplate}>
                <Eye className="w-4 h-4" />
                Preview Template
              </Button>
              <Link to="/enhanced">
                <Button 
                  variant="hero" 
                  size="lg" 
                  disabled={!selectedTemplate}
                >
                  <Sparkles className="w-4 h-4" />
                  Apply & Enhance
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            {!selectedTemplate && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Select a template to continue
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <AIAssistantBubble messages={aiMessages} />
    </div>
  );
};

export default Templates;
