import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIAssistantBubble from "@/components/ai/AIAssistantBubble";
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles,
  ArrowRight,
  Download,
  FileText,
  Target,
  Zap,
  TrendingUp
} from "lucide-react";

// Mock analysis data
const analysisData = {
  score: 72,
  sections: {
    format: { score: 85, status: "good" },
    keywords: { score: 65, status: "warning" },
    experience: { score: 78, status: "good" },
    skills: { score: 60, status: "warning" },
    education: { score: 90, status: "good" },
  },
  missingKeywords: [
    "agile methodology",
    "cross-functional teams",
    "data-driven",
    "stakeholder management",
    "KPI tracking"
  ],
  foundKeywords: [
    "project management",
    "team leadership",
    "budget management",
    "communication",
    "problem solving"
  ],
  suggestions: [
    {
      type: "critical",
      title: "Add missing keywords",
      description: "Your resume is missing 5 keywords from the job description that are commonly filtered by ATS systems."
    },
    {
      type: "warning",
      title: "Quantify achievements",
      description: "Add specific numbers and metrics to your experience bullets to increase impact."
    },
    {
      type: "tip",
      title: "Optimize skill section",
      description: "Reorganize your skills to match the order they appear in the job description."
    }
  ]
};

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-success";
  if (score >= 60) return "text-warning";
  return "text-destructive";
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return "Great";
  if (score >= 60) return "Good";
  if (score >= 40) return "Needs Work";
  return "Poor";
};

const Analysis = () => {
  const [aiMessages] = useState([
    { id: "analysis", text: "I found 5 missing keywords and 3 areas for improvement. Let me enhance your resume! ✨", type: "info" as const }
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
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">
                  Analysis Complete
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Your ATS Score
              </h1>
            </motion.div>

            {/* Score Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card variant="elevated" className="overflow-hidden">
                <div className="gradient-bg p-8 text-center">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary-foreground/20 mb-4">
                    <div className="text-5xl font-bold text-primary-foreground">
                      {analysisData.score}
                    </div>
                  </div>
                  <div className="text-xl font-medium text-primary-foreground mb-2">
                    {getScoreLabel(analysisData.score)} Match
                  </div>
                  <p className="text-primary-foreground/80 max-w-md mx-auto">
                    Your resume matches {analysisData.score}% of the job requirements. 
                    Let's enhance it to reach 90%+
                  </p>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(analysisData.sections).map(([key, value]) => (
                      <div key={key} className="text-center p-4 rounded-xl bg-muted/50">
                        <div className={`text-2xl font-bold ${getScoreColor(value.score)}`}>
                          {value.score}%
                        </div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Keywords Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card variant="elevated" className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Keyword Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Missing Keywords */}
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-4">
                          <XCircle className="w-4 h-4 text-destructive" />
                          Missing Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.missingKeywords.map((keyword) => (
                            <span
                              key={keyword}
                              className="px-3 py-1.5 rounded-full text-sm bg-destructive/10 text-destructive border border-destructive/20"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Found Keywords */}
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-4">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          Found Keywords
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisData.foundKeywords.map((keyword) => (
                            <span
                              key={keyword}
                              className="px-3 py-1.5 rounded-full text-sm bg-success/10 text-success border border-success/20"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Suggestions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="elevated" className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {analysisData.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border ${
                          suggestion.type === "critical"
                            ? "bg-destructive/5 border-destructive/20"
                            : suggestion.type === "warning"
                            ? "bg-warning/5 border-warning/20"
                            : "bg-primary/5 border-primary/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {suggestion.type === "critical" ? (
                            <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                          ) : suggestion.type === "warning" ? (
                            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                          ) : (
                            <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          )}
                          <div>
                            <h4 className="font-medium text-sm">{suggestion.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {suggestion.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Card variant="gradient" className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Ready to Enhance Your Resume?
                    </h3>
                    <p className="text-muted-foreground">
                      Our AI will automatically add missing keywords and optimize your content
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Link to="/templates">
                      <Button variant="outline" size="lg">
                        <FileText className="w-4 h-4" />
                        Choose Template
                      </Button>
                    </Link>
                    <Link to="/enhanced">
                      <Button variant="hero" size="lg">
                        <Sparkles className="w-4 h-4" />
                        Enhance Now
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <AIAssistantBubble messages={aiMessages} />
    </div>
  );
};

export default Analysis;
