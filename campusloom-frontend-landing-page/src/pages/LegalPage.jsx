import React, { useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default function LegalPage({ type }) {
  const { content } = useContent();
  const legalData = content?.legal || {};
  
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
  const htmlContent = type === 'privacy' ? legalData.privacy : legalData.terms;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen pt-20 pb-32 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#EBF3FF] to-transparent z-0 opacity-60"></div>
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-br from-[#3B82F6] to-[#F97316] rounded-full blur-[120px] opacity-[0.07] z-0"></div>
      
      <div className="container-main max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#3B82F6] mb-8 font-medium transition-colors bg-white py-2 px-4 rounded-full shadow-sm border border-[#E8E8E8] w-max">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </Link>
        
        <div className="bg-white rounded-[2rem] p-8 md:p-14 lg:p-20 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-[#E8E8E8]/60 relative overflow-hidden">
          
          <div className="text-center mb-10 border-b border-[#E8E8E8] pb-10">
            <div className="flex justify-center mb-6">
              <img src="/legal-shield.png" alt="Legal Shield" className="w-24 h-24 object-contain drop-shadow-sm" />
            </div>
            <h1 className="text-[clamp(32px,5vw,56px)] font-bold text-[#1A1A1A] font-['Bricolage_Grotesque'] tracking-tight mb-6">
              {title}
            </h1>
            
            <div className="flex justify-center mb-8">
              <div className="h-1 w-20 bg-gradient-to-r from-[#3B82F6] to-[#F97316] rounded-full"></div>
            </div>

            <p className="text-[#6B6B6B] text-lg font-medium">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          
          {htmlContent ? (
            <div className="max-w-none mx-auto text-[#4A4A4A] text-lg leading-relaxed font-['Inter']">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                rehypePlugins={[rehypeRaw]}
                components={{
                  h1: ({node, ...props}) => <h1 className="text-4xl md:text-5xl font-bold font-['Bricolage_Grotesque'] text-[#1A1A1A] mt-16 mb-8 pb-4 border-b border-[#E8E8E8]" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-3xl md:text-4xl font-bold font-['Bricolage_Grotesque'] text-[#1A1A1A] mt-12 mb-6" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-2xl font-bold font-['Bricolage_Grotesque'] text-[#3B82F6] mt-10 mb-4" {...props} />,
                  p: ({node, ...props}) => <p className="mb-6 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-8 space-y-2 marker:text-[#3B82F6]" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-8 space-y-2 marker:text-[#3B82F6]" {...props} />,
                  li: ({node, ...props}) => <li className="" {...props} />,
                  a: ({node, ...props}) => <a className="text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors underline underline-offset-4" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-semibold text-[#1A1A1A]" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#F97316] bg-[#FFF7ED] p-6 rounded-r-xl my-8 italic text-[#6B6B6B]" {...props} />,
                  hr: ({node, ...props}) => <hr className="my-12 border-[#E8E8E8]" {...props} />,
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-10 rounded-xl border border-[#E8E8E8] shadow-sm">
                      <table className="w-full text-left border-collapse min-w-[800px]" {...props} />
                    </div>
                  ),
                  thead: ({node, ...props}) => <thead className="bg-[#F8FAFC] border-b border-[#E8E8E8]" {...props} />,
                  th: ({node, ...props}) => <th className="p-5 font-semibold text-[#1A1A1A] text-sm tracking-wide uppercase border-r border-[#E8E8E8] last:border-r-0" {...props} />,
                  tbody: ({node, ...props}) => <tbody className="divide-y divide-[#E8E8E8]" {...props} />,
                  tr: ({node, ...props}) => <tr className="hover:bg-[#FAFAFA] transition-colors" {...props} />,
                  td: ({node, ...props}) => <td className="p-5 align-top text-sm border-r border-[#E8E8E8] last:border-r-0" {...props} />
                }}
              >
                {htmlContent}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-center py-20 text-[#6B6B6B] bg-[#FAFAFA] rounded-2xl border border-dashed border-[#CCCCCC]">
              Content not found. Please check your WordPress Headless CMS settings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
