
// Transaction fee algorithm: KSH 1-15 based on product value
export const calculateTransactionFee = (productValue: number): number => {
  if (productValue <= 0) return 1;
  
  // Progressive fee structure
  if (productValue <= 5000) return 1; // KSH 1 for items up to 5,000
  if (productValue <= 15000) return 3; // KSH 3 for items up to 15,000
  if (productValue <= 50000) return 5; // KSH 5 for items up to 50,000
  if (productValue <= 100000) return 8; // KSH 8 for items up to 100,000
  if (productValue <= 500000) return 12; // KSH 12 for items up to 500,000
  
  return 15; // KSH 15 for items above 500,000
};

// InstaPay points to discount conversion (capped at KSH 5)
export const calculatePointsDiscount = (instaPayPoints: number): number => {
  // 100 points = KSH 1 discount, max KSH 5 discount
  const discountAmount = Math.floor(instaPayPoints / 100);
  return Math.min(discountAmount, 5); // Cap at KSH 5
};

// Calculate points earned from referrals
export const calculatePointsFromReferral = (referralType: 'signup' | 'purchase', purchaseAmount?: number): number => {
  if (referralType === 'signup') {
    return 200; // 200 points for each successful referral signup
  }
  
  if (referralType === 'purchase' && purchaseAmount) {
    // 1 point per KSH 100 spent by referred user
    return Math.floor(purchaseAmount / 100);
  }
  
  return 0;
};
