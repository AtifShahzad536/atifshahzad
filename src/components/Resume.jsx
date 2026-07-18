import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { FaRegFilePdf } from 'react-icons/fa';

// PDF resume file
const RESUME_PDF = '/resume.pdf';

// Simple card component
const Card = ({ children, className = '' }) => (
  <div className={`bg-card/80 backdrop-blur-sm border border-border/20 rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);

const ResumeSection = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = RESUME_PDF;
      link.download = 'Atif_Shahzad_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
    }, 1000);
  };

  return (
    <section id="resume" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-3xl text-primary">
              <FaRegFilePdf />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">My Resume</h2>
            <p className="text-muted-foreground mb-8">Download or view my professional resume</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                disabled={isDownloading}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isDownloading 
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:shadow-primary/20'
                }`}
              >
                {isDownloading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Downloading...</span>
                  </>
                ) : (
                  <>
                    <FiDownload className="text-lg" />
                    <span>Download PDF</span>
                  </>
                )}
              </motion.button>
              
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={RESUME_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border/20 text-foreground font-medium rounded-xl hover:bg-card/80 transition-colors"
              >
                <FiArrowRight className="text-lg" />
                <span>View in Browser</span>
              </motion.a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;