
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEncouragementMessages } from "@/hooks/useEncouragementMessages";
import { Heart, Quote } from "lucide-react";

export const EncouragementCard = () => {
  const message = useEncouragementMessages();

  if (!message) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Heart className="h-5 w-5 mr-2 text-red-500" />
          Daily Encouragement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-start">
            <Quote className="h-4 w-4 text-blue-500 mr-2 mt-1 flex-shrink-0" />
            <p className="text-gray-700 italic leading-relaxed">
              "{message.message}"
            </p>
          </div>
          {message.author && (
            <p className="text-sm text-gray-500 text-right">
              — {message.author}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
