
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Sample data for sales analytics
const monthlySalesData = [
  { name: 'Jan', sales: 4000, orders: 24 },
  { name: 'Feb', sales: 3000, orders: 18 },
  { name: 'Mar', sales: 5000, orders: 29 },
  { name: 'Apr', sales: 7000, orders: 35 },
  { name: 'May', sales: 6000, orders: 33 },
  { name: 'Jun', sales: 8000, orders: 42 },
];

const productPerformanceData = [
  { name: 'Tomatoes', sales: 12000, units: 240 },
  { name: 'Spinach', sales: 8000, units: 160 },
  { name: 'Potatoes', sales: 15000, units: 300 },
  { name: 'Rice', sales: 18000, units: 120 },
  { name: 'Mangoes', sales: 14000, units: 200 },
];

const customerLocationData = [
  { name: 'Mumbai', value: 35 },
  { name: 'Delhi', value: 25 },
  { name: 'Bangalore', value: 20 },
  { name: 'Pune', value: 15 },
  { name: 'Other', value: 5 },
];

export default function SalesAnalytics() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sales Analytics</CardTitle>
        <CardDescription>Track your sales performance and product trends</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="monthly">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="monthly">Monthly Sales</TabsTrigger>
            <TabsTrigger value="products">Product Performance</TabsTrigger>
            <TabsTrigger value="customers">Customer Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlySalesData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="sales" name="Sales (₹)" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="orders" name="Orders" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-gray-500">Total Revenue</div>
                  <div className="text-2xl font-bold">₹33,000</div>
                  <div className="text-xs text-green-500 mt-1">+12% from last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-gray-500">Total Orders</div>
                  <div className="text-2xl font-bold">181</div>
                  <div className="text-xs text-green-500 mt-1">+8% from last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-sm text-gray-500">Average Order Value</div>
                  <div className="text-2xl font-bold">₹182</div>
                  <div className="text-xs text-green-500 mt-1">+4% from last month</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="products">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="sales" name="Sales (₹)" fill="#8884d8" />
                  <Bar yAxisId="right" dataKey="units" name="Units Sold" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="font-medium">Top Selling Products</div>
              <div className="space-y-1">
                {productPerformanceData.slice().sort((a, b) => b.sales - a.sales).map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{index + 1}.</span>
                      <span>{product.name}</span>
                    </div>
                    <div className="text-sm text-gray-500">₹{product.sales.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="customers">
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <div className="font-medium mb-4">Customer Locations</div>
                <div className="space-y-3">
                  {customerLocationData.map(item => (
                    <div key={item.name} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.name}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-agro-primary h-2 rounded-full" 
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="font-medium mb-4">Customer Insights</div>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-gray-500">Repeat Customers</div>
                      <div className="text-xl font-bold">62%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-gray-500">Average Rating</div>
                      <div className="text-xl font-bold">4.7/5.0</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-gray-500">Customer Growth</div>
                      <div className="text-xl font-bold">+18%</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
