
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface LanguageState {
  language: 'en' | 'sw';
  version: number; // Force re-renders
  setLanguage: (lang: 'en' | 'sw') => void;
  t: typeof translations.en;
}

const translations = {
  en: {
    appName: "Pesa Smart Plan Kenya",
    appDescription: "Pay in installments, save smart, grow your business",
    customer: "Customer",
    business: "Business",
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    name: "Name",
    phone: "Phone Number",
    businessName: "Business Name",
    logout: "Logout",
    dashboard: "Dashboard",
    products: "Products",
    customers: "Customers",
    analytics: "Analytics",
    savings: "Savings",
    installments: "Installments",
    emergency: "Emergency Fund",
    profile: "Profile",
    addProduct: "Add Product",
    productName: "Product Name",
    price: "Price (KSH)",
    category: "Category",
    maxInstallmentPeriod: "Max Installment Period (months)",
    electronics: "Electronics",
    furniture: "Furniture",
    clothing: "Clothing",
    land: "Land/Property",
    other: "Other",
    save: "Save",
    cancel: "Cancel",
    totalSavings: "Total Savings",
    availableEmergency: "Available for Emergency",
    currentInstallments: "Current Installments",
    savingsPeriod: "Savings Period",
    months: "months",
    payNow: "Pay Now",
    buyOnInstallment: "Buy on Installment",
    selectPeriod: "Select Payment Period",
    monthlyPayment: "Monthly Payment",
    emergencyWithdraw: "Emergency Withdraw",
    amount: "Amount",
    reason: "Reason",
    withdraw: "Withdraw",
    progress: "Progress",
    congratulations: "Congratulations on your savings progress!",
    keepGoing: "Keep going! You're doing great!",
    almostThere: "Almost there! Stay focused on your goals!",
    dailyEncouragement: "Daily Encouragement",
    goalProgress: "Goal Progress",
    monthlyTarget: "Monthly Target",
    thisMonth: "This Month",
    addToSavings: "Add to Savings",
    activePlatments: "Active payments",
    savingsGoal: "Savings goal",
    businessIdentity: "Business Identity",
    verified: "Verified",
    businessId: "Unique Business ID",
    shareId: "Share this ID with customers for easy identification",
    businessAccount: "Business Account",
    customerAccount: "Customer Account",
    manageProducts: "Manage your products and grow your business",
    saveSmart: "Save smart and buy on flexible installments",
    backToOptions: "← Back to options",
    activeProducts: "Active products",
    totalCustomers: "Total customers",
    revenue: "Revenue",
    verificationCode: "Verification Code",
    enterCode: "Enter the code sent to your email/phone",
    resendCode: "Resend Code",
    verify: "Verify",
    sendingCode: "Sending code...",
    verifying: "Verifying...",
    // Hero section translations
    heroTitle: "Smart Installment Payments for all Products and Services",
    heroDescription: "Pay for goods and services in installments while building your savings. Perfect for businesses and customers.",
    forBusiness: "For Business",
    forCustomers: "For Customers",
    // Feature cards translations
    forBusinessesTitle: "For Businesses",
    forBusinessesDesc: "Increase sales by offering flexible payment options to your customers",
    manageProductsFeature: "Manage products and payment terms",
    trackInstallments: "Track customer installments",
    analyticsReporting: "Analytics and reporting",
    smsNotifications: "Automated SMS notifications",
    registerBusiness: "Register Business",
    forCustomersTitle: "For Customers",
    forCustomersDesc: "Buy what you need today and pay over time while saving for the future",
    flexiblePayments: "Flexible installment payments",
    buildSavings: "Build savings automatically",
    emergencyAccess: "Emergency fund access (2%)",
    paymentReminders: "Payment reminders via SMS",
    registerCustomer: "Register as Customer",
    // Features section translations
    flexibleInstallmentsTitle: "Flexible Installments",
    buildSavingsTitle: "Build Savings",
    emergencyAccessTitle: "Emergency Access",
    smsRemindersTitle: "SMS Reminders",
  },
  sw: {
    appName: "Pesa Smart Plan Kenya",
    appDescription: "Lipa kwa awamu, okoa kwa busara, kua biashara yako",
    customer: "Mteja",
    business: "Biashara",
    login: "Ingia",
    register: "Jisajili",
    email: "Barua pepe",
    password: "Nywila",
    name: "Jina",
    phone: "Namba ya Simu",
    businessName: "Jina la Biashara",
    logout: "Toka",
    dashboard: "Dashibodi",
    products: "Bidhaa",
    customers: "Wateja",
    analytics: "Uchambuzi",
    savings: "Akiba",
    installments: "Malipo ya Awamu",
    emergency: "Fedha za Dharura",
    profile: "Wasifu",
    addProduct: "Ongeza Bidhaa",
    productName: "Jina la Bidhaa",
    price: "Bei (KSH)",
    category: "Jamii",
    maxInstallmentPeriod: "Muda wa Juu wa Malipo ya Awamu (miezi)",
    electronics: "Vifaa vya Umeme",
    furniture: "Fanicha",
    clothing: "Nguo",
    land: "Ardhi/Mali",
    other: "Nyingine",
    save: "Hifadhi",
    cancel: "Futa",
    totalSavings: "Jumla ya Akiba",
    availableEmergency: "Inapatikana kwa Dharura",
    currentInstallments: "Malipo ya Awamu ya Sasa",
    savingsPeriod: "Muda wa Kuhifadhi",
    months: "miezi",
    payNow: "Lipa Sasa",
    buyOnInstallment: "Nunua kwa Awamu",
    selectPeriod: "Chagua Muda wa Malipo",
    monthlyPayment: "Malipo ya Kila Mwezi",
    emergencyWithdraw: "Toa Fedha za Dharura",
    amount: "Kiasi",
    reason: "Sababu",
    withdraw: "Toa",
    progress: "Maendeleo",
    congratulations: "Hongera kwa maendeleo yako ya akiba!",
    keepGoing: "Endelea! Unafanya vizuri!",
    almostThere: "Karibu kumaliza! Zingatia malengo yako!",
    dailyEncouragement: "Msaada wa Kila Siku",
    goalProgress: "Maendeleo ya Lengo",
    monthlyTarget: "Lengo la Kila Mwezi",
    thisMonth: "Mwezi Huu",
    addToSavings: "Ongeza kwenye Akiba",
    activePlatments: "Malipo yanayoendelea",
    savingsGoal: "Lengo la akiba",
    businessIdentity: "Utambulisho wa Biashara",
    verified: "Imethibitishwa",
    businessId: "Namba ya Kipekee ya Biashara",
    shareId: "Shiriki namba hii na wateja kwa utambuzi rahisi",
    businessAccount: "Akaunti ya Biashara",
    customerAccount: "Akaunti ya Mteja",
    manageProducts: "Simamia bidhaa zako na kukuza biashara yako",
    saveSmart: "Okoa kwa busara na nunua kwa malipo ya awamu",
    backToOptions: "← Rudi kwenye chaguzi",
    activeProducts: "Bidhaa zinazoendelea",
    totalCustomers: "Jumla ya wateja",
    revenue: "Mapato",
    verificationCode: "Namba ya Uthibitisho",
    enterCode: "Ingiza namba iliyotumwa kwa barua pepe/simu yako",
    resendCode: "Tuma Tena Namba",
    verify: "Thibitisha",
    sendingCode: "Inatuma namba...",
    verifying: "Inathibitisha...",
    // Hero section translations
    heroTitle: "Malipo ya Kisasa ya Awamu kwa Bidhaa na Huduma Zote",
    heroDescription: "Lipa bidhaa na huduma kwa awamu huku ukijenga akiba zako. Inafaa kwa biashara na wateja.",
    forBusiness: "Kwa Biashara",
    forCustomers: "Kwa Wateja",
    // Feature cards translations
    forBusinessesTitle: "Kwa Biashara",
    forBusinessesDesc: "Ongeza mauzo kwa kutoa chaguzi za malipo za kufaa kwa wateja wako",
    manageProductsFeature: "Simamia bidhaa na masharti ya malipo",
    trackInstallments: "Fuatilia malipo ya awamu ya wateja",
    analyticsReporting: "Uchambuzi na ripoti",
    smsNotifications: "Arifa za SMS za kiotomatiki",
    registerBusiness: "Sajili Biashara",
    forCustomersTitle: "Kwa Wateja",
    forCustomersDesc: "Nunua unachohitaji leo na ulipe kwa muda huku ukiokoa kwa mustakabali",
    flexiblePayments: "Malipo ya awamu yanayofaa",
    buildSavings: "Jenga akiba kiotomatiki",
    emergencyAccess: "Upatikanaji wa fedha za dharura (2%)",
    paymentReminders: "Mikumbusko ya malipo kupitia SMS",
    registerCustomer: "Jisajili kama Mteja",
    // Features section translations
    flexibleInstallmentsTitle: "Malipo ya Awamu Yanayofaa",
    buildSavingsTitle: "Jenga Akiba",
    emergencyAccessTitle: "Upatikanaji wa Dharura",
    smsRemindersTitle: "Mikumbusko ya SMS",
  }
};

export const useLanguage = create<LanguageState>()(
  subscribeWithSelector((set, get) => ({
    language: 'en',
    version: 0,
    t: translations.en,
    setLanguage: (lang) => {
      console.log('Language change requested:', lang);
      console.log('Current language:', get().language);
      
      if (get().language === lang) {
        console.log('Language already set to:', lang);
        return;
      }
      
      console.log('Will update translations to:', lang);
      
      const newState = {
        language: lang,
        version: get().version + 1, // Increment version to force re-renders
        t: translations[lang]
      };
      
      console.log('New state set:', newState);
      set(newState);
      
      // Verify the change
      setTimeout(() => {
        const currentState = get();
        console.log('Language after update:', currentState.language);
        console.log('Version after update:', currentState.version);
        console.log('Sample translation after update:', currentState.t.customer);
      }, 100);
    },
  }))
);
