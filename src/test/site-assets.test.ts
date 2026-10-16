import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { site } from "@/config/site";

describe("Owner's portfolio assets", () => {
  it("serves the resume at the requested local path", () => {
    expect(site.resume).toBe("/Zarya_Amin_Resume.pdf");
  });
  it("keeps the exact uploaded PDF unchanged", () => {
    const pdf = readFileSync(`${process.cwd()}/public/Zarya_Amin_Resume.pdf`);
    expect(createHash("sha256").update(pdf).digest("hex")).toBe("f01accf84a037eddda55587632c4c566d09474df054cecde54645268bd21811f");
  });
  it("uses the official LinkedIn profile", () => {
    expect(site.linkedin).toBe("https://www.linkedin.com/in/zarya-amin-37a28333b");
  });
});