
import { create } from 'zustand';
import { toast } from 'sonner';

interface UserAccount {
  id: string;
  email: string;
  phone: string;
  name: string;
  type: "customer" | "business";
  businessName?: string;
  isVerified: boolean;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
  createdAt: Date;
}

interface AccountState {
  accounts: UserAccount[];
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  checkEmailExists: (email: string) => boolean;
  checkPhoneExists: (phone: string) => boolean;
  getUserByEmail: (email: string) => UserAccount | null;
  createAccount: (accountData: Omit<UserAccount, 'id' | 'createdAt' | 'isVerified'>) => string;
  verifyAccount: (accountId: string) => void;
  authenticateUser: (email: string, password: string) => UserAccount | null;
  switchAccount: (accountId: string) => void;
  logout: () => void;
}

export const useAccountManagement = create<AccountState>((set, get) => ({
  accounts: [],
  currentUser: null,
  isAuthenticated: false,

  checkEmailExists: (email: string) => {
    return get().accounts.some(account => account.email.toLowerCase() === email.toLowerCase());
  },

  checkPhoneExists: (phone: string) => {
    return get().accounts.some(account => account.phone === phone);
  },

  getUserByEmail: (email: string) => {
    return get().accounts.find(account => account.email.toLowerCase() === email.toLowerCase()) || null;
  },

  createAccount: (accountData) => {
    const accounts = get().accounts;
    const existingUser = accounts.find(acc => acc.email.toLowerCase() === accountData.email.toLowerCase());
    
    // Check if email is already used for this account type
    if (existingUser && existingUser.type === accountData.type) {
      throw new Error(`This email is already registered as a ${accountData.type} account`);
    }

    const newAccount: UserAccount = {
      ...accountData,
      id: `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      isVerified: false,
    };

    set(state => ({
      accounts: [...state.accounts, newAccount]
    }));

    console.log('Account created:', newAccount);
    return newAccount.id;
  },

  verifyAccount: (accountId: string) => {
    set(state => ({
      accounts: state.accounts.map(account => 
        account.id === accountId 
          ? { ...account, isVerified: true, verifiedEmail: true, verifiedPhone: true }
          : account
      )
    }));
    
    const account = get().accounts.find(acc => acc.id === accountId);
    if (account) {
      set({ currentUser: account, isAuthenticated: true });
      toast.success(`Welcome ${account.name}! Your ${account.type} account is now verified.`);
    }
  },

  authenticateUser: (email: string, password: string) => {
    const user = get().getUserByEmail(email);
    if (user && user.isVerified) {
      set({ currentUser: user, isAuthenticated: true });
      return user;
    }
    return null;
  },

  switchAccount: (accountId: string) => {
    const account = get().accounts.find(acc => acc.id === accountId);
    if (account && account.isVerified) {
      set({ currentUser: account });
      toast.success(`Switched to ${account.type} account`);
    }
  },

  logout: () => {
    set({ currentUser: null, isAuthenticated: false });
  },
}));
