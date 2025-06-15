import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { ShoppingCart, Search, Filter, Clock, Info } from "lucide-react";
import { toast } from "sonner";
import { calculateTransactionFee, calculatePointsDiscount } from "@/utils/feeCalculation";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  maxInstallmentPeriod: number;
  imageUrl?: string;
}

import { PaymentOptions } from "@/components/PaymentOptions";

export const ProductCatalog = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [installmentPeriod, setInstallmentPeriod] = useState("12");
  const [usePointsDiscount, setUsePointsDiscount] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  
  // Mock user points - in real app this would come from user state
  const userPoints = 1250;
  const availableDiscount = calculatePointsDiscount(userPoints);
  
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
    { value: "vacation", label: "Vacation/Travel" },
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

  const calculateTotalCost = (product: Product) => {
    const transactionFee = calculateTransactionFee(product.price);
    const discount = usePointsDiscount ? availableDiscount : 0;
    return product.price + transactionFee - discount;
  };

  const handleBuyInstallment = (product: Product) => {
    const months = parseInt(installmentPeriod);
    const transactionFee = calculateTransactionFee(product.price);
    const discount = usePointsDiscount ? availableDiscount : 0;
    const totalCost = calculateTotalCost(product);
    const monthlyAmount = calculateMonthlyPayment(totalCost, months);
    
    setPaymentAmount(monthlyAmount);
    setShowPayment(true);
  };

  const handlePayNow = (product: Product) => {
    const transactionFee = calculateTransactionFee(product.price);
    const discount = usePointsDiscount ? availableDiscount : 0;
    const totalCost = product.price + transactionFee - discount;
    
    setPaymentAmount(totalCost);
    setShowPayment(true);
    setSelectedProduct(product);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    setSelectedProduct(null);
    toast.success("Purchase completed successfully!");
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
  };

  return (
    <div className="space-y-6">
      {/* Points Banner */}
      {userPoints > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-blue-800">InstaPay Points Available</h3>
                <p className="text-sm text-blue-600">
                  You have {userPoints} points worth KSH {availableDiscount} discount
                </p>
              </div>
              <div className="text-2xl font-bold text-green-600">
                KSH {availableDiscount}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
            {filteredProducts.map((product) => {
              const transactionFee = calculateTransactionFee(product.price);
              
              return (
                <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-2xl font-bold text-green-600">
                          KSH {product.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Info className="h-3 w-3 mr-1" />
                          + KSH {transactionFee} transaction fee
                        </p>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        Up to {product.maxInstallmentPeriod} {t.months}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handlePayNow(product)}
                        >
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
              );
            })}
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

              {availableDiscount > 0 && (
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="useDiscount"
                    checked={usePointsDiscount}
                    onChange={(e) => setUsePointsDiscount(e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="useDiscount">
                    Use KSH {availableDiscount} InstaPay points discount
                  </Label>
                </div>
              )}
              
              <div className="p-4 bg-blue-50 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Product Price:</span>
                  <span>KSH {selectedProduct.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Transaction Fee:</span>
                  <span>KSH {calculateTransactionFee(selectedProduct.price)}</span>
                </div>
                {usePointsDiscount && availableDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>InstaPay Discount:</span>
                    <span>- KSH {availableDiscount}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t.monthlyPayment}:</span>
                  <span className="text-xl font-bold text-blue-600">
                    KSH {calculateMonthlyPayment(calculateTotalCost(selectedProduct), parseInt(installmentPeriod)).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Total: KSH {calculateTotalCost(selectedProduct).toLocaleString()} over {installmentPeriod} months
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

      {showPayment && (
        <PaymentOptions
          amount={paymentAmount}
          onPaymentSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  );
};
