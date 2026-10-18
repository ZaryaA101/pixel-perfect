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
  it("includes valid PNG screenshots for both project showcases", () => {
    const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    for (const path of ["images/flightsight-homepage.png", "images/aws-ecs-deployment-redacted.png"]) {
      const image = readFileSync(`${process.cwd()}/public/${path}`);
      expect(image.subarray(0, pngSignature.length), path).toEqual(pngSignature);
    }
  });
  it("uses the official LinkedIn profile", () => {
    expect(site.linkedin).toBe("https://www.linkedin.com/in/zarya-amin-37a28333b");
  });
  it("uses the owner's GitHub profile and project repositories", () => {
    expect(site.github).toBe("https://github.com/ZaryaA101");
    expect(site.projects.cloud.repo).toBe("https://github.com/ZaryaA101/cloud-devops-portfolio");
    expect(site.projects.flightsight.repo).toBe("https://github.com/ZaryaA101/FlightSight");
  });
  it("states the current hosting and captions the AWS screenshot", () => {
    expect(site.projects.cloud.hostingNote).toBe("Current portfolio hosting: Cloudflare Pages");
    const source = readFileSync(`${process.cwd()}/src/routes/index.tsx`, "utf8");
    expect(source).toContain("AWS ECS Fargate deployment — October 2026 (task ID redacted)");
  });
  it("describes the AWS project as a deployed ECS Fargate application", () => {
    const source = readFileSync(`${process.cwd()}/src/routes/index.tsx`, "utf8");
    expect(source).toContain("Built and successfully deployed a Flask web application on AWS");
    expect(source).toContain("Amazon ECS Fargate");
    expect(source).not.toContain("served by the Flask app");
  });
});
