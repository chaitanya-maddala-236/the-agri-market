
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPage() {
  const posts = [
    {
      title: "Sustainable Farming Practices for Better Yields",
      excerpt: "Learn about eco-friendly farming methods that can increase your crop yield while protecting the environment.",
      image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800",
      date: "April 20, 2025",
      author: "Dr. Anjali Singh"
    },
    {
      title: "Understanding Organic Certification",
      excerpt: "A comprehensive guide to getting your farm certified for organic production in India.",
      image: "https://images.unsplash.com/photo-1562591970-254bc62245c0?w=800",
      date: "April 18, 2025",
      author: "Rahul Verma"
    },
    {
      title: "Monsoon Farming Tips",
      excerpt: "Essential guidelines for managing your crops during the monsoon season.",
      image: "https://images.unsplash.com/photo-1582499571609-9b8611137e66?w=800",
      date: "April 15, 2025",
      author: "Meera Patel"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Farming Tips & News</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <div className="text-sm text-gray-600 mb-2">
                  {post.date} • By {post.author}
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
