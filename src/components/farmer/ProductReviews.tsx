
import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { reviews } from "@/data/reviews";
import { Review } from "@/data/types";

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [productReviews, setProductReviews] = useState<Review[]>(
    reviews.filter(review => review.productId === productId)
  );

  // Calculate average rating
  const averageRating = productReviews.length > 0 
    ? productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length
    : 0;
    
  if (productReviews.length === 0) {
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
            {productReviews.length} {productReviews.length === 1 ? 'Review' : 'Reviews'}
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
        {productReviews.map(review => (
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
