import { toast } from "@/components/ui/toast";

function getErrorMessage(error, fallback) {
  if (typeof error === "string" && error.trim()) return error;
  if (error?.message) return error.message;
  return fallback;
}

export function showSuccessToast(title, description) {
  toast.add({ title, description, type: "success" });
}

export function showErrorToast(title, error, fallback = "Please try again.") {
  toast.add({
    title,
    description: getErrorMessage(error, fallback),
    type: "error",
  });
}
