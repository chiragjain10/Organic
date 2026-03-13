
import Hero from './Hero'
import BrandTrust from './About'
import CategorySection from './Category'
import PromoBanner from './Banner'
import ScienceSection from './Science'
import TestimonialSection from './Testemonials'
import Newsletter from './News'
import ProductGrid from './ProductGrid'
import SEO from '../../components/SEO'

function Home() {
  return (
    <>
     <SEO
       title="Leaf Burst | Premium Superfoods & Herbal Products"
       description="Discover organic powders, herbal blends, and daily nutrition crafted with Ayurvedic wisdom. Shop clean, lab-tested formulations for real wellness."
       canonical={typeof window !== 'undefined' ? `${window.location.origin}/` : undefined}
       image="/img/a1.jpeg"
       jsonLd={{
         "@context": "https://schema.org",
         "@type": "WebSite",
         "name": "Leaf Burst",
         "url": typeof window !== 'undefined' ? window.location.origin : "https://example.com",
         "potentialAction": {
           "@type": "SearchAction",
           "target": `${typeof window !== 'undefined' ? window.location.origin : "https://example.com"}/shop?q={search_term_string}`,
           "query-input": "required name=search_term_string"
         }
       }}
     />
     <Hero/>
     <BrandTrust/>
     <CategorySection/>
     <ProductGrid/>
     <PromoBanner/>
     <ScienceSection/>
     <TestimonialSection/>
     <Newsletter/>
    </>
  )
}

export default Home
