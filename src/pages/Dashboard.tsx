import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIAssistantBubble from "@/components/ai/AIAssistantBubble";
import { 
  FileText, 
  TrendingUp, 
  Target, 
  Briefcase,
  Plus,
  Clock,
  Download,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar
} from "recharts";

// Mock data
const scoreHistory = [
  { date: "Jan 1", score: 45 },
  { date: "Jan 8", score: 52 },
  { date: "Jan 15", score: 61 },
  { date: "Jan 22", score: 72 },
  { date: "Jan 29", score: 78 },
  { date: "Feb 5", score: 85 },
  { date: "Feb 12", score: 94 },
];

const skillGaps = [
  { skill: "Technical", current: 85, required: 90 },
  { skill: "Leadership", current: 78, required: 85 },
  { skill: "Communication", current: 90, required: 88 },
  { skill: "Analytics", current: 65, required: 80 },
  { skill: "Agile", current: 70, required: 85 },
];

const jobMatchData = [
  { range: "90-100%", count: 3 },
  { range: "80-89%", count: 7 },
  { range: "70-79%", count: 12 },
  { range: "60-69%", count: 8 },
  { range: "50-59%", count: 4 },
];

const recentResumes = [
  { id: 1, name: "Software_Engineer_Resume_v3.pdf", score: 94, date: "2 hours ago" },
  { id: 2, name: "Project_Manager_Resume.docx", score: 72, date: "Yesterday" },
  { id: 3, name: "Resume_2024_Final.pdf", score: 45, date: "3 days ago" },
];

const savedJobs = [
  { id: 1, title: "Senior Project Manager", company: "TechCorp", match: 92 },
  { id: 2, title: "Technical Program Manager", company: "Innovation Labs", match: 88 },
  { id: 3, title: "Product Manager", company: "StartupXYZ", match: 85 },
];

const Dashboard = () => {
  const stats = [
    { icon: FileText, label: "Resumes", value: "3", color: "text-primary" },
    { icon: TrendingUp, label: "Avg Score", value: "94%", color: "text-success" },
    { icon: Target, label: "Job Matches", value: "34", color: "text-warning" },
    { icon: Briefcase, label: "Applications", value: "12", color: "text-accent" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container px-4">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
            >
              <div>
                <h1 className="text-3xl font-bold font-heading mb-2">
                  Welcome back! 👋
                </h1>
                <p className="text-muted-foreground">
                  Here's your resume optimization overview
                </p>
              </div>
              <Link to="/upload">
                <Button variant="hero">
                  <Plus className="w-4 h-4" />
                  New Resume
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="elevated" className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-primary/10 ${stat.color}`}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Score Trend Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      ATS Score Trend
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={scoreHistory}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            dataKey="date" 
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                          />
                          <YAxis 
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            domain={[0, 100]}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "0.75rem",
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="score" 
                            stroke="hsl(var(--primary))"
                            strokeWidth={3}
                            dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skill Gaps Radar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="elevated" className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Skill Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={skillGaps}>
                          <PolarGrid stroke="hsl(var(--border))" />
                          <PolarAngleAxis 
                            dataKey="skill" 
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                          />
                          <PolarRadiusAxis 
                            angle={30} 
                            domain={[0, 100]}
                            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                          />
                          <Radar
                            name="Required"
                            dataKey="required"
                            stroke="hsl(var(--muted-foreground))"
                            fill="hsl(var(--muted))"
                            fillOpacity={0.3}
                          />
                          <Radar
                            name="Current"
                            dataKey="current"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.4}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Resumes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card variant="elevated" className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      Recent Resumes
                    </CardTitle>
                    <Link to="/upload">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentResumes.map((resume) => (
                      <div 
                        key={resume.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{resume.name}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {resume.date}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`font-bold ${
                            resume.score >= 80 ? "text-success" : 
                            resume.score >= 60 ? "text-warning" : "text-destructive"
                          }`}>
                            {resume.score}%
                          </span>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Saved Jobs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card variant="elevated" className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Saved Jobs
                    </CardTitle>
                    <Link to="/jobs">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {savedJobs.map((job) => (
                      <div 
                        key={job.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{job.title}</p>
                          <p className="text-xs text-muted-foreground">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-success">{job.match}%</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Job Match Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card variant="elevated" className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Match Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={jobMatchData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis 
                            type="category" 
                            dataKey="range" 
                            stroke="hsl(var(--muted-foreground))" 
                            fontSize={11}
                            width={60}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "0.75rem",
                            }}
                          />
                          <Bar 
                            dataKey="count" 
                            fill="hsl(var(--primary))"
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <AIAssistantBubble />
    </div>
  );
};

export default Dashboard;
