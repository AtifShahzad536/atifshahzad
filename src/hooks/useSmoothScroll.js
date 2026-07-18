import { useEffect } from 'react';

export const useSmoothScroll = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleSmoothScroll = (e) => {
      // Check if the click is on an anchor link
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href === '#' || !href.startsWith('#')) return;

      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth',
        });
      }
    };

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add click event listener for anchor links
    document.addEventListener('click', handleSmoothScroll);

    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);
};
