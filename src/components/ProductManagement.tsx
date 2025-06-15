
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  maxInstallmentPeriod: number;
}

export const ProductManagement = () => {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "Samsung Galaxy S24", price: 85000, category: "electronics", maxInstallmentPeriod: 24 },
    { id: "2", name: "Office Chair", price: 15000, category: "furniture", maxInstallmentPeriod: 12 },
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "electronics",
    maxInstallmentPeriod: "12"
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error("Please fill all required fields");
      return;
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseInt(newProduct.price),
      category: newProduct.category,
      maxInstallmentPeriod: parseInt(newProduct.maxInstallmentPeriod)
    };

    setProducts([...products, product]);
    setNewProduct({ name: "", price: "", category: "electronics", maxInstallmentPeriod: "12" });
    setIsAdding(false);
    toast.success("Product added successfully!");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.products}</CardTitle>
        <Button onClick={() => setIsAdding(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {t.addProduct}
        </Button>
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="space-y-4 mb-6 p-4 border rounded-lg">
            <div>
              <Label htmlFor="productName">{t.productName}</Label>
              <Input
                id="productName"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="price">{t.price}</Label>
              <Input
                id="price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="category">{t.category}</Label>
              <select
                id="category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="electronics">{t.electronics}</option>
                <option value="furniture">{t.furniture}</option>
                <option value="clothing">{t.clothing}</option>
                <option value="land">{t.land}</option>
                <option value="other">{t.other}</option>
              </select>
            </div>
            <div>
              <Label htmlFor="maxPeriod">{t.maxInstallmentPeriod}</Label>
              <Input
                id="maxPeriod"
                type="number"
                value={newProduct.maxInstallmentPeriod}
                onChange={(e) => setNewProduct({ ...newProduct, maxInstallmentPeriod: e.target.value })}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddProduct}>{t.save}</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>{t.cancel}</Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  KSH {product.price.toLocaleString()} • {product.maxInstallmentPeriod} {t.months} max
                </p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
