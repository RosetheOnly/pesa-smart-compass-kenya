
import { useState, useEffect } from 'react';

interface EncouragementMessage {
  id: number;
  message: string;
  author?: string;
}

const encouragementMessages: EncouragementMessage[] = [
  {
    id: 1,
    message: "Every small step you take towards your savings goal is a victory worth celebrating!",
    author: "Financial Wisdom"
  },
  {
    id: 2,
    message: "The habit of saving is itself an education; it fosters every virtue, teaches self-denial, cultivates the sense of order, trains to forethought.",
    author: "T.T. Munger"
  },
  {
    id: 3,
    message: "Your future self will thank you for every penny you save today. Keep going!",
    author: "InstallmentPay Team"
  },
  {
    id: 4,
    message: "Success is the sum of small efforts repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    id: 5,
    message: "You're not just saving money, you're building your dreams one coin at a time.",
    author: "Financial Wisdom"
  },
  {
    id: 6,
    message: "The secret to getting ahead is getting started. You've already begun your journey!",
    author: "Mark Twain"
  },
  {
    id: 7,
    message: "Every payment you make on time builds not just your credit, but your character.",
    author: "InstallmentPay Team"
  },
  {
    id: 8,
    message: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln"
  },
  {
    id: 9,
    message: "Your savings account is a reflection of your commitment to your future.",
    author: "Financial Wisdom"
  },
  {
    id: 10,
    message: "Financial peace isn't the acquisition of stuff. It's learning to live on less than you make.",
    author: "Dave Ramsey"
  },
  {
    id: 11,
    message: "You're doing amazing! Your consistent saving habits are creating a brighter future.",
    author: "InstallmentPay Team"
  },
  {
    id: 12,
    message: "The real measure of your wealth is how much you'd be worth if you lost all your money.",
    author: "Benjamin Franklin"
  }
];

export const useEncouragementMessages = () => {
  const [currentMessage, setCurrentMessage] = useState<EncouragementMessage | null>(null);

  useEffect(() => {
    const getMessageForToday = () => {
      const today = new Date();
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const messageIndex = dayOfYear % encouragementMessages.length;
      return encouragementMessages[messageIndex];
    };

    const message = getMessageForToday();
    setCurrentMessage(message);

    // Check for message update every hour
    const interval = setInterval(() => {
      const newMessage = getMessageForToday();
      if (newMessage.id !== currentMessage?.id) {
        setCurrentMessage(newMessage);
      }
    }, 60 * 60 * 1000); // 1 hour

    return () => clearInterval(interval);
  }, [currentMessage]);

  return currentMessage;
};
