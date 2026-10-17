import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { btn } from "@/components/portfolio/ui";

async function copyEmail(email: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(email);
      return true;
    }
  } catch {
    // Fall back for browsers or pages where clipboard access is unavailable.
  }

  const textarea = document.createElement("textarea");
  textarea.value = email;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    textarea.remove();
  }
}

export function CopyEmailButton({
  email,
  variant = "primary",
}: {
  email: string;
  variant?: "primary" | "link";
}) {
  const [status, setStatus] = useState<"copied" | "failed" | "">("");

  useEffect(() => {
    if (!status) return;
    const timeout = window.setTimeout(() => setStatus(""), 2500);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const handleCopy = async () => {
    setStatus((await copyEmail(email)) ? "copied" : "failed");
  };
  const successMessage = variant === "link" ? "Copied!" : "Email copied";
  const className =
    variant === "link"
      ? "link-underline inline-flex cursor-pointer border-0 bg-transparent p-0 text-sm font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      : btn.primary;

  return (
    <>
      <button type="button" className={className} onClick={handleCopy}>
        {variant === "primary" && <Copy className="h-4 w-4" aria-hidden="true" />}
        Copy Email
      </button>
      <span
        className={`text-sm ${status === "copied" ? "text-primary" : "text-muted-foreground"}`}
        role="status"
        aria-live="polite"
      >
        {status === "copied"
          ? successMessage
          : status === "failed"
            ? "Unable to copy email. Please select the email address to copy."
            : ""}
      </span>
    </>
  );
}
