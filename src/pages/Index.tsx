import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIAssistantBubble from "@/components/ai/AIAssistantBubble";
import { 
  FileText, 
  Sparkles, 
  Target, 
  BarChart3, 
  Download, 
  Search,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Resume Parsing",
    description: "AI extracts and structures your resume content automatically",
  },
  {
    icon: Target,
    title: "ATS Score Analysis",
    description: "See how well your resume matches job descriptions",
  },
  {
    icon: Sparkles,
    title: "AI Enhancement",
    description: "Automatically optimize your resume with powerful keywords",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track your score improvements and skill gaps over time",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description: "Download optimized resumes in PDF or DOCX",
  },
  {
    icon: Search,
    title: "Smart Job Finder",
    description: "Find matching jobs with AI-powered recommendations",
  },
];

const stats = [
  { value: "95%", label: "ATS Pass Rate" },
  { value: "50K+", label: "Resumes Optimized" },
  { value: "3x", label: "More Interviews" },
];

const steps = [
  { step: 1, title: "Upload Resume", description: "Drop your PDF or DOCX file" },
  { step: 2, title: "Get Analysis", description: "AI scans for ATS compatibility" },
  { step: 3, title: "Enhance", description: "Apply AI-powered improvements" },
  { step: 4, title: "Download", description: "Get your optimized resume" },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Background decoration */}
          <div className="absolute inset-0 gradient-hero-bg" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          
          <div className="container relative px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border mb-6">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-secondary-foreground">
                    AI-Powered Resume Optimization
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight mb-6"
              >
                Beat the Bots.{" "}
                <span className="gradient-text">Land Your Dream Job.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
              >
                Stop getting rejected by ATS systems. Our AI analyzes, enhances, 
                and optimizes your resume to pass automated screenings and impress recruiters.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/upload">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    <FileText className="w-5 h-5" />
                    Upload Your Resume
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    View Dashboard
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get your optimized resume in four simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {steps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="elevated" className="text-center h-full hover-lift">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-primary-foreground">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Everything You Need to{" "}
                <span className="gradient-text">Get Hired</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive tools to optimize your resume and accelerate your job search
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="elevated" className="h-full hover-lift group">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                  Why Choose{" "}
                  <span className="gradient-text">ATS PRO?</span>
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: Zap, text: "Instant AI-powered analysis and optimization" },
                    { icon: Shield, text: "Your data is secure and never shared" },
                    { icon: TrendingUp, text: "Proven to increase interview rates by 3x" },
                    { icon: CheckCircle2, text: "Works with all major ATS systems" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-success/10 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-success" />
                      </div>
                      <span className="text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card variant="gradient" className="p-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold gradient-text mb-2">87%</div>
                    <p className="text-lg font-medium mb-4">
                      of resumes are rejected by ATS
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      Don't let automated systems stand between you and your dream job.
                      Our AI ensures your resume gets seen by human recruiters.
                    </p>
                    <Link to="/upload">
                      <Button variant="hero" size="lg">
                        Optimize My Resume
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <Card variant="elevated" className="p-12 gradient-hero-bg">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                  Ready to Land More Interviews?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Join thousands of job seekers who've optimized their resumes with ATS PRO
                </p>
                <Link to="/signup">
                  <Button variant="hero" size="xl">
                    Get Started for Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <AIAssistantBubble />
    </div>
  );
};

export default Index;
