import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate and format the time remaining until a deadline
 * @param deadline - The deadline timestamp (can be Unix timestamp in seconds or Date)
 * @returns Formatted string like "4 days left", "2 hours left", "5 minutes left", "Expired"
 */
export function getTimeRemaining(deadline: number | bigint | Date): {
  timeLeft: string;
  isExpired: boolean;
  isUrgent: boolean; // Less than 1 day remaining
  isCritical: boolean; // Less than 1 hour remaining
} {
  // Convert deadline to Date object
  let deadlineDate: Date;

  if (deadline instanceof Date) {
    deadlineDate = deadline;
  } else {
    // Handle both Unix timestamps in seconds and milliseconds
    const timestamp =
      typeof deadline === "bigint" ? Number(deadline) : deadline;
    // If timestamp is in seconds (typical for blockchain), convert to milliseconds
    deadlineDate = new Date(timestamp < 1e12 ? timestamp * 1000 : timestamp);
  }

  const now = new Date();
  const timeDifference = deadlineDate.getTime() - now.getTime();

  // If deadline has passed
  if (timeDifference <= 0) {
    return {
      timeLeft: "Expired",
      isExpired: true,
      isUrgent: false,
      isCritical: false,
    };
  }

  // Calculate time units
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  let timeLeft: string;

  // Format based on the largest meaningful unit
  if (months > 0) {
    timeLeft = `${months} month${months === 1 ? "" : "s"} left`;
  } else if (weeks > 0) {
    timeLeft = `${weeks} week${weeks === 1 ? "" : "s"} left`;
  } else if (days > 0) {
    timeLeft = `${days} day${days === 1 ? "" : "s"} left`;
  } else if (hours > 0) {
    timeLeft = `${hours} hour${hours === 1 ? "" : "s"} left`;
  } else if (minutes > 0) {
    timeLeft = `${minutes} minute${minutes === 1 ? "" : "s"} left`;
  } else {
    timeLeft = `${seconds} second${seconds === 1 ? "" : "s"} left`;
  }

  return {
    timeLeft,
    isExpired: false,
    isUrgent: days < 1, // Less than 1 day
    isCritical: hours < 1, // Less than 1 hour
  };
}
