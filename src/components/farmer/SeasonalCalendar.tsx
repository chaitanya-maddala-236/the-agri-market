
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface CropSeason {
  cropName: string;
  sowingMonths: number[];
  harvestingMonths: number[];
  category: string;
}

// Data for common Indian crops and their seasonal information
const cropSeasons: CropSeason[] = [
  { 
    cropName: "Rice", 
    sowingMonths: [5, 6, 7], // Jun-Jul-Aug
    harvestingMonths: [10, 11], // Nov-Dec
    category: "Grains"
  },
  { 
    cropName: "Wheat", 
    sowingMonths: [9, 10, 11], // Oct-Nov-Dec
    harvestingMonths: [2, 3, 4], // Mar-Apr-May
    category: "Grains"
  },
  { 
    cropName: "Tomatoes", 
    sowingMonths: [0, 1, 7, 8], // Jan-Feb & Aug-Sep
    harvestingMonths: [3, 4, 5, 10, 11], // Apr-May-Jun & Nov-Dec
    category: "Vegetables"
  },
  { 
    cropName: "Spinach", 
    sowingMonths: [8, 9, 10], // Sep-Oct-Nov
    harvestingMonths: [0, 1, 2, 11], // Dec-Jan-Feb-Mar
    category: "Vegetables"
  },
  { 
    cropName: "Potatoes", 
    sowingMonths: [8, 9], // Sep-Oct
    harvestingMonths: [0, 1], // Jan-Feb
    category: "Vegetables"
  },
  { 
    cropName: "Okra", 
    sowingMonths: [2, 3, 4, 5], // Mar-Apr-May-Jun
    harvestingMonths: [5, 6, 7, 8], // Jun-Jul-Aug-Sep
    category: "Vegetables"
  },
  { 
    cropName: "Mangoes", 
    sowingMonths: [], // Perennial
    harvestingMonths: [3, 4, 5], // Apr-May-Jun
    category: "Fruits"
  },
  { 
    cropName: "Chillies", 
    sowingMonths: [5, 6], // Jun-Jul
    harvestingMonths: [8, 9, 10, 11], // Sep-Oct-Nov-Dec
    category: "Vegetables"
  },
  { 
    cropName: "Turmeric", 
    sowingMonths: [4, 5], // May-Jun
    harvestingMonths: [0, 1], // Jan-Feb
    category: "Spices"
  }
];

const monthNames = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const categories = Array.from(new Set(cropSeasons.map(crop => crop.category)));

export default function SeasonalCalendar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const currentMonth = new Date().getMonth();
  
  // Filter crops based on selected category
  const filteredCrops = selectedCategory === "All"
    ? cropSeasons
    : cropSeasons.filter(crop => crop.category === selectedCategory);
  
  // Get crops that can be sown this month
  const cropsToSowNow = filteredCrops.filter(crop => 
    crop.sowingMonths.includes(currentMonth)
  );
  
  // Get crops that can be harvested this month
  const cropsToHarvestNow = filteredCrops.filter(crop => 
    crop.harvestingMonths.includes(currentMonth)
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Calendar className="mr-2 text-agro-primary" size={20} />
          <h3 className="text-lg font-semibold">Seasonal Crop Calendar</h3>
        </div>
        <Badge variant="outline" className="px-2 py-1">
          Current Month: {monthNames[currentMonth]}
        </Badge>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="now" className="mb-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="now">What to Plant Now</TabsTrigger>
            <TabsTrigger value="harvest">Ready to Harvest</TabsTrigger>
            <TabsTrigger value="all">All Crops</TabsTrigger>
          </TabsList>
          
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Filter by Category:</div>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedCategory === "All" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory("All")}
              >
                All
              </Badge>
              {categories.map(category => (
                <Badge 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          <TabsContent value="now">
            {cropsToSowNow.length > 0 ? (
              <div className="space-y-2">
                {cropsToSowNow.map(crop => (
                  <div key={crop.cropName} className="flex items-center justify-between bg-agro-light/30 rounded-md p-3">
                    <div>
                      <div className="font-medium">{crop.cropName}</div>
                      <div className="text-sm text-gray-500">{crop.category}</div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Sowing:</span> {crop.sowingMonths.map(m => monthNames[m].substring(0, 3)).join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No crops found for sowing in {monthNames[currentMonth]} with the selected filter.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="harvest">
            {cropsToHarvestNow.length > 0 ? (
              <div className="space-y-2">
                {cropsToHarvestNow.map(crop => (
                  <div key={crop.cropName} className="flex items-center justify-between bg-amber-50 rounded-md p-3">
                    <div>
                      <div className="font-medium">{crop.cropName}</div>
                      <div className="text-sm text-gray-500">{crop.category}</div>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Harvesting:</span> {crop.harvestingMonths.map(m => monthNames[m].substring(0, 3)).join(", ")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No crops ready for harvesting in {monthNames[currentMonth]} with the selected filter.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="all">
            <div className="space-y-2">
              {filteredCrops.map(crop => (
                <div key={crop.cropName} className="grid grid-cols-3 gap-2 bg-gray-50 rounded-md p-3">
                  <div className="font-medium">{crop.cropName} <span className="text-xs text-gray-500">({crop.category})</span></div>
                  <div className="text-sm">
                    <span className="font-medium">Sowing:</span> {crop.sowingMonths.length > 0 ? 
                      crop.sowingMonths.map(m => monthNames[m].substring(0, 3)).join(", ") : 
                      "Perennial"}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Harvesting:</span> {crop.harvestingMonths.map(m => monthNames[m].substring(0, 3)).join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
