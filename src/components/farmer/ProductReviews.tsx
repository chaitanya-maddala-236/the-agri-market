
import { useState } from "react";
import { Star, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { reviews } from "@/data/reviews";
import { Review } from "@/data/types";

interface ProductReviewsProps {
  productId: string;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [productReviews, setProductReviews] = useState<Review[]>(
    reviews.filter(review => review.productId === productId)
  );
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set());

  // Calculate average rating
  const averageRating = productReviews.length > 0 
    ? productReviews.reduce((acc, review) => acc + review.rating, 0) / productReviews.length
    : 0;
    
  // Rating breakdown
  const ratingCounts = [0, 0, 0, 0, 0]; // 5-star to 1-star counts
  productReviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[5 - review.rating]++;
    }
  });

  const markHelpful = (reviewId: string) => {
    const newHelpfulReviews = new Set(helpfulReviews);
    newHelpfulReviews.add(reviewId);
    setHelpfulReviews(newHelpfulReviews);
  };
    
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
        
        <div className="flex flex-col sm:flex-row gap-6 mt-4">
          {/* Average Rating Display */}
          <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-gray-800">{averageRating.toFixed(1)}</div>
            <div className="flex items-center my-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(averageRating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">Based on {productReviews.length} reviews</div>
          </div>
          
          {/* Rating Breakdown */}
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating, index) => {
              const count = ratingCounts[5 - rating];
              const percentage = productReviews.length > 0 
                ? (count / productReviews.length) * 100
                : 0;
              
              return (
                <div key={rating} className="flex items-center mb-1">
                  <div className="flex items-center w-12">
                    <span>{rating}</span>
                    <Star size={14} className="ml-0.5 text-amber-400 fill-amber-400" />
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2 flex-1">
                    <div 
                      className="bg-amber-400 h-2.5 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-xs text-gray-500">
                    {count} ({Math.round(percentage)}%)
                  </div>
                </div>
              );
            })}
          </div>
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
            <p className="text-gray-700 mb-2">{review.comment}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs flex items-center gap-1"
              disabled={helpfulReviews.has(review.id)}
              onClick={() => markHelpful(review.id)}
            >
              <ThumbsUp size={14} />
              {helpfulReviews.has(review.id) ? "Marked as helpful" : "Mark as helpful"}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
