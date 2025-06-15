
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/useLanguage";
import { Star, Image, Video, MessageCircle, ThumbsUp, Flag } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  customerName: string;
  productName: string;
  rating: number;
  comment: string;
  images: string[];
  videos: string[];
  createdAt: string;
  helpful: number;
  businessResponse?: string;
  responseDate?: string;
}

export const ReviewSystem = () => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      customerName: "John Doe",
      productName: "Samsung Galaxy S24",
      rating: 5,
      comment: "Excellent phone! Delivered exactly as promised. The installment plan made it very affordable.",
      images: ["delivery_photo.jpg"],
      videos: [],
      createdAt: "2024-06-10",
      helpful: 12,
      businessResponse: "Thank you for your review! We're glad you're satisfied with your purchase.",
      responseDate: "2024-06-11"
    },
    {
      id: "2", 
      customerName: "Jane Smith",
      productName: "Office Chair",
      rating: 4,
      comment: "Good quality chair, delivery was on time. Only issue was packaging could be better.",
      images: [],
      videos: ["unboxing_video.mp4"],
      createdAt: "2024-06-08",
      helpful: 8
    }
  ]);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [responseText, setResponseText] = useState("");

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const handleResponse = (reviewId: string) => {
    if (!responseText.trim()) {
      toast.error("Please enter a response");
      return;
    }

    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { 
            ...review, 
            businessResponse: responseText,
            responseDate: new Date().toISOString().split('T')[0]
          }
        : review
    ));
    setResponseText("");
    setSelectedReview(null);
    toast.success("Response posted successfully");
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Customer Reviews
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <div className="flex items-center">
                  {renderStars(Math.round(averageRating))}
                  <span className="ml-2 font-bold">{averageRating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-muted-foreground">{reviews.length} reviews</p>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{review.customerName}</h4>
                      <Badge variant="outline">{review.productName}</Badge>
                    </div>
                    {renderStars(review.rating)}
                    <p className="text-xs text-muted-foreground mt-1">{review.createdAt}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground"
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      {review.helpful}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{review.comment}</p>

                {(review.images.length > 0 || review.videos.length > 0) && (
                  <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                    {review.images.length > 0 && (
                      <span className="flex items-center">
                        <Image className="h-3 w-3 mr-1" />
                        {review.images.length} photo(s)
                      </span>
                    )}
                    {review.videos.length > 0 && (
                      <span className="flex items-center">
                        <Video className="h-3 w-3 mr-1" />
                        {review.videos.length} video(s)
                      </span>
                    )}
                  </div>
                )}

                {review.businessResponse && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3">
                    <div className="flex items-center mb-1">
                      <MessageCircle className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-800">Business Response</span>
                      <span className="text-xs text-blue-600 ml-2">{review.responseDate}</span>
                    </div>
                    <p className="text-blue-700 text-sm">{review.businessResponse}</p>
                  </div>
                )}

                {!review.businessResponse && (
                  <div className="border-t pt-3">
                    {selectedReview === review.id ? (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Write your response to this review..."
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          className="text-sm"
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleResponse(review.id)}>
                            Post Response
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedReview(null);
                              setResponseText("");
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedReview(review.id)}
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Respond
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
