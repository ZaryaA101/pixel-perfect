import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CopyEmailButton } from "@/components/portfolio/CopyEmailButton";

const email = "zaryaamin101@gmail.com";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("CopyEmailButton", () => {
  it("copies the email and announces success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<CopyEmailButton email={email} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy Email" }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith(email));
    expect(await screen.findByRole("status")).toHaveTextContent("Email copied");
  });

  it("copies the email from the hero text-link control and announces Copied!", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<CopyEmailButton email={email} variant="link" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy Email" }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith(email));
    expect(await screen.findByRole("status")).toHaveTextContent("Copied!");
  });

  it("uses the copy fallback and announces success when clipboard access is rejected", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("Clipboard unavailable")) },
    });
    const execCommand = vi.fn().mockReturnValue(true);
    Object.defineProperty(document, "execCommand", { configurable: true, value: execCommand });

    render(<CopyEmailButton email={email} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy Email" }));

    await waitFor(() => expect(execCommand).toHaveBeenCalledWith("copy"));
    expect(await screen.findByRole("status")).toHaveTextContent("Email copied");
  });

  it("announces a recoverable message if copying is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("Clipboard unavailable")) },
    });
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: vi.fn().mockReturnValue(false),
    });

    render(<CopyEmailButton email={email} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy Email" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Unable to copy email. Please select the email address to copy.",
    );
  });
});
