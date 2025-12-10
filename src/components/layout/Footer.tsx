import { Link } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold font-heading gradient-text">
                ATS PRO
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your AI-powered resume optimizer. Beat the bots, land your dream job.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/upload" className="hover:text-foreground transition-colors">
                  Resume Analysis
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-foreground transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-foreground transition-colors">
                  Job Finder
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Resume Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Career Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> for job seekers
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ATS PRO. All rights reserved.
          </p>
        </div>

        {/* Ethics Notice */}
        <div className="mt-6 p-4 rounded-2xl bg-warning/10 border border-warning/20">
          <p className="text-xs text-muted-foreground text-center">
            <strong className="text-warning">Note:</strong> Job scraping should be used responsibly. 
            Consider using official job APIs where available. This feature is opt-in and rate-limited.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
