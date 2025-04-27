
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";

interface Farmer {
  name: string;
  location: string;
  image: string;
  specialties: string[];
  experience: string;
  landSize: string;
  rating: number;
}

export default function FarmersPage() {
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [landSizeFilter, setLandSizeFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const farmers: Farmer[] = [
    {
      name: "Rajesh Kumar",
      location: "Punjab",
      image: "https://images.unsplash.com/photo-1555617171-a072c97e09a7?w=500",
      specialties: ["Organic Vegetables", "Fruits"],
      experience: "15 years",
      landSize: "50 acres",
      rating: 4.8
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra",
      image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=500",
      specialties: ["Rice", "Wheat"],
      experience: "10 years",
      landSize: "30 acres",
      rating: 4.5
    },
    {
      name: "Amit Patel",
      location: "Gujarat",
      image: "https://images.unsplash.com/photo-1595434091143-b375159b3bfc?w=500",
      specialties: ["Cotton", "Groundnuts"],
      experience: "20 years",
      landSize: "75 acres",
      rating: 4.9
    }
  ];

  const filteredFarmers = farmers.filter(farmer => {
    const matchesLocation = !locationFilter || farmer.location === locationFilter;
    const matchesLandSize = !landSizeFilter || farmer.landSize === landSizeFilter;
    const matchesSearch = !searchQuery || 
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesLocation && matchesLandSize && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold">Our Farmers</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Bar */}
            <div className="space-y-2">
              <Label htmlFor="search">Search Farmers</Label>
              <Input
                id="search"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <Label>Filter by Location</Label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Punjab">Punjab</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Gujarat">Gujarat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Land Size Filter */}
            <div className="space-y-2">
              <Label>Filter by Land Size</Label>
              <Select value={landSizeFilter} onValueChange={setLandSizeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select land size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="30 acres">30 acres</SelectItem>
                  <SelectItem value="50 acres">50 acres</SelectItem>
                  <SelectItem value="75 acres">75 acres</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
            <Card key={farmer.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={farmer.image} 
                alt={farmer.name}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold">{farmer.name}</h2>
                  <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                    ⭐ {farmer.rating}
                  </div>
                </div>

                <div className="flex items-center text-gray-600 space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{farmer.location}</span>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-600">✨ {farmer.experience} of experience</p>
                  <p className="text-gray-600">🌾 {farmer.landSize} of farmland</p>
                  
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
