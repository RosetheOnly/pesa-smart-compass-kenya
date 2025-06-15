
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { Star, Upload, Image, Video, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  productName: string;
  rating: number;
  comment: string;
  images: string[];
  videos: string[];
  createdAt: Date;
  status: "pending" | "approved" | "rejected";
}

interface ChatMessage {
  id: string;
  content: string;
  sender: "customer" | "support";
  timestamp: Date;
}

export const ReviewInterface = () => {
  const { t } = useLanguage();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      productName: "Samsung Galaxy S24",
      rating: 5,
      comment: "Excellent phone! The installment plan made it very affordable.",
      images: [],
      videos: [],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "approved"
    }
  ]);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Thank you for your review! Is there anything specific you'd like to discuss about your purchase?",
      sender: "support",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const products = [
    "Samsung Galaxy S24",
    "iPhone 15",
    "Office Chair",
    "Dining Table",
    "Plot in Kiambu"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + uploadedFiles.length > 5) {
      toast.error("Maximum 5 files allowed");
      return;
    }
    setUploadedFiles(prev => [...prev, ...files]);
    toast.success(`${files.length} file(s) uploaded`);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitReview = () => {
    if (!selectedProduct || rating === 0 || !comment.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      productName: selectedProduct,
      rating,
      comment,
      images: uploadedFiles.filter(f => f.type.startsWith('image')).map(f => f.name),
      videos: uploadedFiles.filter(f => f.type.startsWith('video')).map(f => f.name),
      createdAt: new Date(),
      status: "pending"
    };

    setReviews(prev => [newReview, ...prev]);
    
    // Reset form
    setSelectedProduct("");
    setRating(0);
    setComment("");
    setUploadedFiles([]);
    
    toast.success("Review submitted successfully! It will be reviewed before publishing.");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "customer",
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate support response
    setTimeout(() => {
      const supportResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message. Our team will get back to you shortly with assistance.",
        sender: "support",
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, supportResponse]);
    }, 2000);
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= currentRating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && setRating(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Submit New Review */}
      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Product</label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rating *</label>
            {renderStars(rating, true)}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Review *</label>
            <Textarea
              placeholder="Tell us about your experience with this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Add Photos/Videos (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload images or videos (Max 5 files)
                </p>
              </label>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center space-x-2">
                      {file.type.startsWith('image') ? (
                        <Image className="h-4 w-4" />
                      ) : (
                        <Video className="h-4 w-4" />
                      )}
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button onClick={handleSubmitReview} className="w-full">
            Submit Review
          </Button>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{review.productName}</h4>
                    {renderStars(review.rating)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={review.status === "approved" ? "default" : "secondary"}>
                      {review.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedReview(selectedReview === review.id ? null : review.id)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  {review.images.length > 0 && (
                    <span className="flex items-center">
                      <Image className="h-3 w-3 mr-1" />
                      {review.images.length} image(s)
                    </span>
                  )}
                  {review.videos.length > 0 && (
                    <span className="flex items-center">
                      <Video className="h-3 w-3 mr-1" />
                      {review.videos.length} video(s)
                    </span>
                  )}
                  <span>{review.createdAt.toLocaleDateString()}</span>
                </div>

                {/* Chat Interface */}
                {selectedReview === review.id && (
                  <div className="mt-4 border-t pt-4">
                    <div className="bg-gray-50 rounded-lg p-3 max-h-60 overflow-y-auto mb-3">
                      <div className="space-y-2">
                        {chatMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] p-2 rounded-lg text-sm ${
                                message.sender === "customer"
                                  ? "bg-blue-600 text-white"
                                  : "bg-white text-gray-900"
                              }`}
                            >
                              {message.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="text-sm"
                      />
                      <Button size="sm" onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
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
