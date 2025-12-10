import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIAssistantBubble from "@/components/ai/AIAssistantBubble";
import { 
  CheckCircle2, 
  Sparkles,
  Download,
  FileText,
  FileDown,
  ArrowRight,
  RefreshCw,
  Eye,
  History
} from "lucide-react";

const enhancedBullets = [
  {
    original: "Managed team of developers",
    enhanced: "Led cross-functional team of 8 developers, implementing agile methodology that increased sprint velocity by 35% and reduced time-to-market by 20%"
  },
  {
    original: "Worked on project budgets",
    enhanced: "Managed $2.5M project budget with data-driven approach, delivering 15% under budget while exceeding all KPI targets"
  },
  {
    original: "Improved team communication",
    enhanced: "Established stakeholder management framework improving cross-team communication efficiency by 40%, resulting in 25% faster decision-making"
  }
];

const Enhanced = () => {
  const [isEnhancing, setIsEnhancing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [aiMessages, setAiMessages] = useState<Array<{id: string; text: string; type: "info" | "success" | "action"}>>([
    { id: "start", text: "Starting enhancement process... 🚀", type: "action" }
  ]);

  const steps = [
    "Analyzing content structure...",
    "Inserting missing keywords...",
    "Optimizing bullet points...",
    "Enhancing action verbs...",
    "Finalizing enhancements..."
  ];

  useEffect(() => {
    if (isEnhancing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 4;
          
          // Update step
          const newStep = Math.floor(newProgress / 20);
          if (newStep !== currentStep && newStep < steps.length) {
            setCurrentStep(newStep);
            setAiMessages([
              { id: `step-${newStep}`, text: steps[newStep], type: "action" as const }
            ]);
          }
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsEnhancing(false);
            setAiMessages([
              { id: "complete", text: "Your resume is enhanced and ready to download! Score improved from 72% to 94%! 🎉", type: "success" }
            ]);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isEnhancing, currentStep, steps]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">
                  {isEnhancing ? "Enhancing..." : "Step 3 of 3"}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                {isEnhancing ? "Enhancing Your Resume" : "Enhancement Complete!"}
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {isEnhancing 
                  ? "Our AI is optimizing your resume for maximum ATS compatibility"
                  : "Your resume has been enhanced with missing keywords and improved content"
                }
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {isEnhancing ? (
                <motion.div
                  key="enhancing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card variant="elevated" className="max-w-2xl mx-auto">
                    <CardContent className="p-8">
                      {/* Progress Circle */}
                      <div className="flex justify-center mb-8">
                        <div className="relative w-32 h-32">
                          <svg className="w-32 h-32 transform -rotate-90">
                            <circle
                              className="text-muted"
                              strokeWidth="8"
                              stroke="currentColor"
                              fill="transparent"
                              r="56"
                              cx="64"
                              cy="64"
                            />
                            <circle
                              className="text-primary transition-all duration-300"
                              strokeWidth="8"
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="56"
                              cx="64"
                              cy="64"
                              strokeDasharray={`${2 * Math.PI * 56}`}
                              strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold">{progress}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Current Step */}
                      <div className="text-center">
                        <p className="text-muted-foreground animate-pulse">
                          {steps[currentStep]}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* Score Improvement */}
                  <Card variant="elevated" className="mb-8 overflow-hidden">
                    <div className="gradient-bg p-8 text-center">
                      <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-primary-foreground/60 line-through">
                            72%
                          </div>
                          <div className="text-sm text-primary-foreground/60">Before</div>
                        </div>
                        <ArrowRight className="w-8 h-8 text-primary-foreground" />
                        <div className="text-center">
                          <div className="text-5xl font-bold text-primary-foreground">
                            94%
                          </div>
                          <div className="text-sm text-primary-foreground/80">After</div>
                        </div>
                      </div>
                      <p className="text-primary-foreground/80 mt-4">
                        +22% improvement in ATS compatibility
                      </p>
                    </div>
                  </Card>

                  {/* Enhanced Bullets Preview */}
                  <Card variant="elevated" className="mb-8">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-primary" />
                        Enhanced Content Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {enhancedBullets.map((bullet, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-3"
                        >
                          <div className="p-4 rounded-xl bg-muted/50 border border-border">
                            <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                              Original
                            </div>
                            <p className="text-sm text-muted-foreground line-through">
                              {bullet.original}
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-success/5 border border-success/20">
                            <div className="flex items-center gap-2 text-xs text-success mb-1 uppercase tracking-wide">
                              <CheckCircle2 className="w-3 h-3" />
                              Enhanced
                            </div>
                            <p className="text-sm">
                              {bullet.enhanced}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Download Options */}
                  <Card variant="gradient" className="p-8">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold mb-2">
                        Download Your Enhanced Resume
                      </h3>
                      <p className="text-muted-foreground">
                        Choose your preferred format
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Button variant="outline" size="lg" className="gap-2">
                        <FileText className="w-5 h-5" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="lg" className="gap-2">
                        <FileDown className="w-5 h-5" />
                        Download DOCX
                      </Button>
                    </div>

                    <div className="flex justify-center gap-4 mt-6 pt-6 border-t">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Eye className="w-4 h-4" />
                        Preview
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <History className="w-4 h-4" />
                        Version History
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Re-enhance
                      </Button>
                    </div>
                  </Card>

                  {/* Next Steps */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 text-center"
                  >
                    <p className="text-muted-foreground mb-4">
                      Ready to find matching jobs?
                    </p>
                    <Link to="/jobs">
                      <Button variant="hero" size="lg">
                        Find Matching Jobs
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
      <AIAssistantBubble messages={aiMessages} isProcessing={isEnhancing} />
    </div>
  );
};

export default Enhanced;
