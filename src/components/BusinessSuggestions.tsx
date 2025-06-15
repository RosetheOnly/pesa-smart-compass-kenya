
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { Store, MapPin, Star, Phone, Mail, ExternalLink } from "lucide-react";

interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  phone?: string;
  email?: string;
  description: string;
  productCount: number;
  verified: boolean;
}

export const BusinessSuggestions = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock businesses data - in real app this would come from API
  const businesses: Business[] = [
    {
      id: "1",
      name: "TechZone Electronics",
      category: "electronics",
      rating: 4.8,
      location: "Nairobi, Kenya",
      phone: "+254712345678",
      email: "info@techzone.co.ke",
      description: "Premium electronics store with latest smartphones, laptops, and accessories",
      productCount: 150,
      verified: true
    },
    {
      id: "2",
      name: "Home Comfort Furniture",
      category: "furniture",
      rating: 4.6,
      location: "Mombasa, Kenya",
      phone: "+254722334455",
      email: "sales@homecomfort.co.ke",
      description: "Quality furniture for your home and office needs",
      productCount: 89,
      verified: true
    },
    {
      id: "3",
      name: "Fashion Forward",
      category: "clothing",
      rating: 4.5,
      location: "Kisumu, Kenya",
      phone: "+254733445566",
      description: "Trendy clothing for men, women, and children",
      productCount: 220,
      verified: false
    },
    {
      id: "4",
      name: "Prime Properties",
      category: "land",
      rating: 4.9,
      location: "Kiambu, Kenya",
      phone: "+254744556677",
      email: "info@primeproperties.co.ke",
      description: "Premium land and property investments in growing areas",
      productCount: 45,
      verified: true
    },
    {
      id: "5",
      name: "Global Gadgets",
      category: "electronics",
      rating: 4.7,
      location: "Nakuru, Kenya",
      phone: "+254755667788",
      description: "Latest gadgets and electronics from around the world",
      productCount: 95,
      verified: true
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: t.electronics },
    { value: "furniture", label: t.furniture },
    { value: "clothing", label: t.clothing },
    { value: "land", label: t.land },
    { value: "other", label: t.other },
  ];

  const filteredBusinesses = businesses.filter(business => {
    return selectedCategory === "all" || business.category === selectedCategory;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Store className="h-5 w-5 mr-2" />
            Suggested Businesses
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBusinesses.map((business) => (
              <Card key={business.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{business.name}</h3>
                          {business.verified && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          {renderStars(business.rating)}
                          <span className="text-sm text-muted-foreground ml-1">
                            ({business.rating})
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{business.description}</p>

                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {business.location}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {business.productCount} products available
                      </span>
                      <Badge variant="outline">{categories.find(c => c.value === business.category)?.label}</Badge>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      {business.phone && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      )}
                      {business.email && (
                        <Button size="sm" variant="outline" className="flex-1">
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>
                      )}
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Store
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-8">
              <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No businesses found in this category. Try selecting a different category.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <h4 className="font-medium text-blue-800">Why shop with suggested businesses?</h4>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Verified businesses have been reviewed for quality and reliability</li>
                <li>• Access to installment payment plans for all products</li>
                <li>• Earn InstaPay points on every purchase</li>
                <li>• Customer support and protection for all transactions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
