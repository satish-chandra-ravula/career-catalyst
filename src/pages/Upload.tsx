import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIAssistantBubble from "@/components/ai/AIAssistantBubble";
import { 
  Upload as UploadIcon, 
  FileText, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{id: string; text: string; type: "info" | "success" | "action"}>>([
    { id: "welcome", text: "Upload your resume and I'll analyze it for ATS compatibility! 📄", type: "info" }
  ]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  }, []);

  const validateAndSetFile = (selectedFile: File) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or DOCX file",
        variant: "destructive",
      });
      return;
    }

    if (selectedFile.size > maxSize) {
      toast({
        title: "File too large",
        description: "File size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    setAiMessages([
      { id: "file-received", text: `Great! I received "${selectedFile.name}". Now add a job description to analyze against! ✨`, type: "success" as const }
    ]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setAiMessages([
      { id: "file-removed", text: "No problem! Upload another resume when you're ready. 📄", type: "info" as const }
    ]);
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a resume first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAiMessages([
      { id: "scanning", text: "Scanning your resume... 🔍", type: "action" as const }
    ]);

    // Simulate analysis steps
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAiMessages([
      { id: "extracting", text: "Extracting skills and experience... 📊", type: "action" as const }
    ]);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setAiMessages([
      { id: "matching", text: "Matching against job requirements... 🎯", type: "action" as const }
    ]);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setAiMessages([
      { id: "complete", text: "Analysis complete! Found 5 areas for improvement. Let's enhance your resume! 🚀", type: "success" as const }
    ]);

    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAnalyzing(false);
    
    // Navigate to results (in real app, would pass analysis data)
    navigate("/analysis");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">
                  Step 1 of 3
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Upload Your Resume
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Upload your current resume and optionally add a job description 
                for targeted analysis
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Area */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Resume File
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AnimatePresence mode="wait">
                      {!file ? (
                        <motion.div
                          key="dropzone"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`
                            relative border-2 border-dashed rounded-2xl p-12 text-center
                            transition-all duration-300 cursor-pointer
                            ${isDragging 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50 hover:bg-muted/50'
                            }
                          `}
                        >
                          <input
                            type="file"
                            accept=".pdf,.docx"
                            onChange={handleFileInput}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                            <UploadIcon className="w-8 h-8 text-primary-foreground" />
                          </div>
                          <h3 className="font-semibold mb-2">
                            Drop your resume here
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Supports PDF and DOCX (max 5MB)
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="file-preview"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="border rounded-2xl p-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                              <CheckCircle2 className="w-6 h-6 text-success" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium truncate">{file.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {(file.size / 1024).toFixed(1)} KB • Ready to analyze
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={removeFile}
                              className="shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Job Description */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Job Description
                      <span className="text-xs font-normal text-muted-foreground">
                        (Optional)
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Paste the job description here for targeted analysis and keyword optimization..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="min-h-[200px] resize-none"
                    />
                    <p className="text-xs text-muted-foreground mt-3">
                      Adding a job description helps our AI identify missing keywords 
                      and optimize your resume for the specific role
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <Button
                variant="hero"
                size="xl"
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
                className="min-w-[240px]"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Resume
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
              {!file && (
                <p className="text-sm text-muted-foreground mt-3">
                  Upload a resume to continue
                </p>
              )}
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <Card variant="gradient" className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Pro Tips for Best Results</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Use your most recent resume version</li>
                      <li>• Include the full job description for targeted optimization</li>
                      <li>• Keep your resume under 2 pages for best ATS parsing</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <AIAssistantBubble messages={aiMessages} isProcessing={isAnalyzing} />
    </div>
  );
};

export default Upload;
