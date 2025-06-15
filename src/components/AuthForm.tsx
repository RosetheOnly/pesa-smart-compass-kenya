
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";

interface AuthFormProps {
  userType: "customer" | "business";
  onAuthenticated: () => void;
}

export const AuthForm = ({ userType, onAuthenticated }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    businessName: "",
  });
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    toast.success(`${isLogin ? t.login : t.register} successful!`);
    onAuthenticated();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <>
          <div>
            <Label htmlFor="name">{t.name}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">{t.phone}</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+254..."
              required
            />
          </div>
          {userType === "business" && (
            <div>
              <Label htmlFor="businessName">{t.businessName}</Label>
              <Input
                id="businessName"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required
              />
            </div>
          )}
        </>
      )}
      
      <div>
        <Label htmlFor="email">{t.email}</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="password">{t.password}</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        {isLogin ? t.login : t.register}
      </Button>

      <Button
        type="button"
        variant="link"
        onClick={() => setIsLogin(!isLogin)}
        className="w-full"
      >
        {isLogin ? t.register : t.login}
      </Button>
    </form>
  );
};
