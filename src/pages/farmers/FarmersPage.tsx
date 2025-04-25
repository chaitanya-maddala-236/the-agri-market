
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function FarmersPage() {
  const farmers = [
    {
      name: "Rajesh Kumar",
      location: "Punjab",
      image: "https://images.unsplash.com/photo-1555617171-a072c97e09a7?w=500",
      specialties: ["Organic Vegetables", "Fruits"],
      experience: "15 years"
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra",
      image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=500",
      specialties: ["Rice", "Wheat"],
      experience: "10 years"
    },
    {
      name: "Amit Patel",
      location: "Gujarat",
      image: "https://images.unsplash.com/photo-1595434091143-b375159b3bfc?w=500",
      specialties: ["Cotton", "Groundnuts"],
      experience: "20 years"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Our Farmers</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {farmers.map((farmer) => (
            <Card key={farmer.name} className="overflow-hidden">
              <img 
                src={farmer.image} 
                alt={farmer.name}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{farmer.name}</h2>
                <p className="text-gray-600 mb-2">📍 {farmer.location}</p>
                <p className="text-gray-600 mb-2">✨ {farmer.experience} of experience</p>
                <div className="flex flex-wrap gap-2">
                  {farmer.specialties.map((specialty) => (
                    <span 
                      key={specialty}
                      className="bg-agro-light text-agro-primary px-2 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
