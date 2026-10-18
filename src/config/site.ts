/**
 * Central site configuration — edit links here.
 * Leave a value as `null` until you have the real URL; the matching button
 * is hidden automatically. Never put secrets in this file.
 */
export const site = {
  name: "Zarya Amin",
  email: "zaryaamin101@gmail.com",
  linkedin: "https://www.linkedin.com/in/zarya-amin-37a28333b",
  github: "https://github.com/ZaryaA101" as string | null,
  resume: "/Zarya_Amin_Resume.pdf",
  portrait: "/images/Zarya_Amin_Graduation.webp",
  projects: {
    cloud: {
      repo: "https://github.com/ZaryaA101/cloud-devops-portfolio" as string | null,
      // PLACEHOLDER: public URL of the deployed site
      live: null as string | null,
      hostingNote: "Current portfolio hosting: Cloudflare Pages" as string | null,
    },
    flightsight: {
      repo: "https://github.com/ZaryaA101/FlightSight" as string | null,
      // PLACEHOLDER: live demo URL
      live: null as string | null,
    },
  },
};
