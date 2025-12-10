import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AIAssistantBubble from "@/components/ai/AIAssistantBubble";
import { 
  Search,
  MapPin,
  Building2,
  Clock,
  ExternalLink,
  Bookmark,
  Sparkles,
  Filter,
  TrendingUp
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Senior Project Manager",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    remote: true,
    postedDate: "2 days ago",
    matchScore: 92,
    salary: "$120k - $150k",
    source: "LinkedIn"
  },
  {
    id: 2,
    title: "Technical Program Manager",
    company: "Innovation Labs",
    location: "New York, NY",
    remote: true,
    postedDate: "1 day ago",
    matchScore: 88,
    salary: "$130k - $160k",
    source: "LinkedIn"
  },
  {
    id: 3,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Austin, TX",
    remote: false,
    postedDate: "3 days ago",
    matchScore: 85,
    salary: "$110k - $140k",
    source: "RemoteOK"
  },
  {
    id: 4,
    title: "Agile Project Manager",
    company: "Enterprise Solutions",
    location: "Chicago, IL",
    remote: true,
    postedDate: "5 hours ago",
    matchScore: 82,
    salary: "$100k - $130k",
    source: "Naukri"
  },
  {
    id: 5,
    title: "IT Project Manager",
    company: "Global Tech",
    location: "Remote",
    remote: true,
    postedDate: "1 week ago",
    matchScore: 78,
    salary: "$95k - $125k",
    source: "LinkedIn"
  }
];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("Project Manager");
  const [location, setLocation] = useState("");
  const [timeFilter, setTimeFilter] = useState("7d");
  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [aiMessages] = useState([
    { id: "jobs", text: "I found 5 jobs matching your enhanced resume. Your top match is 92%! 🎯", type: "success" as const }
  ]);

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getMatchColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-muted-foreground";
  };

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1500);
  };

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
                <Search className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-secondary-foreground">
                  Smart Job Finder
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Find Your Perfect Match
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                AI-powered job matching based on your enhanced resume
              </p>
            </motion.div>

            {/* Search Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <Card variant="elevated">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Job title or keywords"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={timeFilter} onValueChange={setTimeFilter}>
                      <SelectTrigger>
                        <Clock className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Posted within" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">Last 24 hours</SelectItem>
                        <SelectItem value="7d">Last 7 days</SelectItem>
                        <SelectItem value="14d">Last 14 days</SelectItem>
                        <SelectItem value="30d">Last 30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Filter className="w-4 h-4" />
                      More Filters
                    </Button>
                    <Button 
                      variant="hero" 
                      onClick={handleSearch}
                      disabled={isSearching}
                    >
                      {isSearching ? "Searching..." : "Search Jobs"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Found <strong className="text-foreground">{mockJobs.length}</strong> matching jobs
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-success" />
                Sorted by match score
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {mockJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card variant="elevated" className="hover-lift">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Match Score */}
                        <div className="shrink-0 text-center md:w-24">
                          <div className={`text-3xl font-bold ${getMatchColor(job.matchScore)}`}>
                            {job.matchScore}%
                          </div>
                          <div className="text-xs text-muted-foreground">Match</div>
                          <Progress 
                            value={job.matchScore} 
                            className="h-1.5 mt-2"
                          />
                        </div>

                        {/* Job Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">
                                {job.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-4 h-4" />
                                  {job.company}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {job.postedDate}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs">
                                  {job.salary}
                                </span>
                                {job.remote && (
                                  <span className="px-2 py-1 rounded-lg bg-success/10 text-success text-xs">
                                    Remote
                                  </span>
                                )}
                                <span className="px-2 py-1 rounded-lg bg-muted text-muted-foreground text-xs">
                                  via {job.source}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex md:flex-col gap-2 shrink-0">
                          <Button variant="hero" size="sm" className="gap-2">
                            Apply
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                          <Button
                            variant={savedJobs.includes(job.id) ? "soft" : "outline"}
                            size="sm"
                            onClick={() => toggleSaveJob(job.id)}
                          >
                            <Bookmark 
                              className={`w-4 h-4 ${
                                savedJobs.includes(job.id) ? "fill-current" : ""
                              }`} 
                            />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <Button variant="outline" size="lg">
                Load More Jobs
              </Button>
            </motion.div>

            {/* Ethics Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <Card variant="gradient" className="p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    <strong>Responsible Job Search:</strong> Job data is sourced from public job boards. 
                    Consider using official job APIs where available. This feature is rate-limited 
                    to ensure responsible usage.
                  </p>
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

export default Jobs;
