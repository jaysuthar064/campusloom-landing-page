import { usePageContent } from '../lib/usePageContent'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Container from '../components/ui/Container'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SmartLink from '../components/ui/SmartLink'
import ScrollProgress from '../components/ui/ScrollProgress'
import { Clock, ArrowRight, Sparkles } from 'lucide-react'

export default function BlogPage() {
  const { sections: home } = usePageContent('home')

  const hero = {
    eyebrow: 'SMARTSHALA BLOG & RESOURCES',
    heading: 'Insights for Modern',
    heading_highlight: 'School Leaders.',
    subheading:
      'Expert guides, best practices, and actionable insights on school management, automation, attendance tracking, and education technology in India.',
  }

  const articles = [
    {
      title: 'How Modern Schools in India Cut Administrative Overhead by 70%',
      category: 'School Operations',
      readTime: '5 min read',
      excerpt:
        'Traditional paperwork and manual fee collection drain valuable staff hours. Here is how leading schools streamlined operations with centralized ERP systems.',
      date: 'September 2026',
    },
    {
      title: 'Best Practices for Seamless Parent-Teacher Communication in 2026',
      category: 'Parent Engagement',
      readTime: '4 min read',
      excerpt:
        'Moving beyond unorganized WhatsApp groups: how automated notifications and dedicated school apps build trust with parents.',
      date: 'September 2026',
    },
    {
      title: 'The School Principal’s Guide to Digital Fee Management & Reconciliation',
      category: 'Finance & Accounts',
      readTime: '6 min read',
      excerpt:
        'Defaulter tracking, instant receipt generation, and real-time bank reconciliation without manual tallying.',
      date: 'September 2026',
    },
  ]

  return (
    <>
      <ScrollProgress />
      <Navbar content={home?.navbar} />
      <main>
        <PageHero content={hero} />

        <section className="py-16 lg:py-24">
          <Container>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="lift flex flex-col justify-between rounded-2xl border border-hairline/80 bg-white p-7">
                    <div>
                      <div className="flex items-center justify-between text-[13px] text-muted">
                        <span className="rounded-full bg-tint px-3 py-1 font-semibold text-brand">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="mt-4 text-[19px] font-bold leading-snug text-ink">
                        {article.title}
                      </h3>
                      <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                      <span className="text-[13px] text-muted">{article.date}</span>
                      <SmartLink
                        to="/book-demo"
                        className="flex items-center gap-1 text-[14px] font-semibold text-brand hover:underline"
                      >
                        Read Guide <ArrowRight size={15} />
                      </SmartLink>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-16 rounded-3xl border border-brand/20 bg-brand-soft/40 p-8 text-center lg:p-12">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand shadow-sm">
                <Sparkles size={24} />
              </span>
              <h2 className="mt-4 text-[24px] font-bold text-ink">More Articles Coming Soon</h2>
              <p className="mx-auto mt-2 max-w-xl text-[15.5px] text-muted">
                Our editorial team is actively curating comprehensive guides for educators, administrators, and academic directors.
              </p>
              <div className="mt-6">
                <SmartLink
                  to="/book-demo"
                  className="press inline-flex h-11.5 items-center justify-center rounded-xl bg-brand px-6 text-[14.5px] font-semibold text-white hover:bg-brand-hover"
                >
                  Book a Free Demo
                </SmartLink>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer content={home?.footer} />
    </>
  )
}
