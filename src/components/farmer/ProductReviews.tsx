
import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
}

// Dummy reviews data - in a real app, this would come from an API
const dummyReviews: Review[] = [
  {
    id: "r1",
    productId: "p1",
    customerId: "c1",
    customerName: "Priya Desai",
    rating: 5,
    comment: "The tomatoes were incredibly fresh and flavorful. Will definitely buy again!",
    date: "2023-07-15"
  },
  {
    id: "r2",
    productId: "p1",
    customerId: "c2",
    customerName: "Amit Kumar",
    rating: 4,
    comment: "Good quality, though a few were slightly bruised during delivery.",
    date: "2023-07-12"
  },
  {
    id: "r3",
    productId: "p2",
    customerId: "c3",
    customerName: "Sunita Verma",
    rating: 5,
    comment: "The spinach was very fresh and clean. Perfect for my salad!",
    date: "2023-07-10"
  },
  {
    id: "r4",
    productId: "p8",
    customerId: "c1",
    customerName: "Priya Desai",
    rating: 5,
    comment: "This ghee is pure and authentic. Just like homemade!",
    date: "2023-06-28"
  },
  {
    id: "r5",
    productId: "p8",
    customerId: "c2",
    customerName: "Amit Kumar",
    rating: 4,
    comment: "Good quality ghee with rich aroma.",
    date: "2023-06-25"
  }
];

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(
    dummyReviews.filter(review => review.productId === productId)
  );

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;
    
  if (reviews.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">No reviews yet for this product.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
          <Badge variant="outline" className="px-2 py-1">
            {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
          </Badge>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={i < Math.floor(averageRating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="font-medium">{averageRating.toFixed(1)}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="font-medium">{review.customerName}</div>
                <span className="mx-2 text-gray-300">•</span>
                <div className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
