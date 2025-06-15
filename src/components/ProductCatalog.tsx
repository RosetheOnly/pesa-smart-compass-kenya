
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { ShoppingCart, Search, Filter, Clock } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  maxInstallmentPeriod: number;
  imageUrl?: string;
}

export const ProductCatalog = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [installmentPeriod, setInstallmentPeriod] = useState("12");
  
  const products: Product[] = [
    { id: "1", name: "Samsung Galaxy S24", price: 85000, category: "electronics", maxInstallmentPeriod: 24 },
    { id: "2", name: "iPhone 15", price: 120000, category: "electronics", maxInstallmentPeriod: 24 },
    { id: "3", name: "Office Chair", price: 15000, category: "furniture", maxInstallmentPeriod: 12 },
    { id: "4", name: "Dining Table", price: 35000, category: "furniture", maxInstallmentPeriod: 18 },
    { id: "5", name: "Plot in Kiambu", price: 2500000, category: "land", maxInstallmentPeriod: 60 },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: t.electronics },
    { value: "furniture", label: t.furniture },
    { value: "clothing", label: t.clothing },
    { value: "land", label: t.land },
    { value: "other", label: t.other },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const calculateMonthlyPayment = (price: number, months: number) => {
    return Math.ceil(price / months);
  };

  const handleBuyInstallment = (product: Product) => {
    const months = parseInt(installmentPeriod);
    const monthlyAmount = calculateMonthlyPayment(product.price, months);
    
    toast.success(
      `Installment plan created! Pay KSH ${monthlyAmount.toLocaleString()} monthly for ${months} months.`
    );
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Product Catalog
          </CardTitle>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-10 px-3 py-2 border rounded-md"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-2xl font-bold text-green-600">
                        KSH {product.price.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      Up to {product.maxInstallmentPeriod} {t.months}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        {t.payNow}
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {t.buyOnInstallment}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedProduct && (
        <Card>
          <CardHeader>
            <CardTitle>Installment Plan - {selectedProduct.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="period">{t.selectPeriod}</Label>
                <select
                  id="period"
                  value={installmentPeriod}
                  onChange={(e) => setInstallmentPeriod(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  {Array.from({ length: selectedProduct.maxInstallmentPeriod }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {month} {t.months}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t.monthlyPayment}:</span>
                  <span className="text-xl font-bold text-blue-600">
                    KSH {calculateMonthlyPayment(selectedProduct.price, parseInt(installmentPeriod)).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Total: KSH {selectedProduct.price.toLocaleString()} over {installmentPeriod} months
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={() => handleBuyInstallment(selectedProduct)} className="flex-1">
                  Confirm Installment Plan
                </Button>
                <Button variant="outline" onClick={() => setSelectedProduct(null)} className="flex-1">
                  {t.cancel}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
