const fs = require("node:fs");
const path = require("node:path");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

function readMarkdown(fileName) {
  const filePath = path.join(__dirname, "..", "content", fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  return raw.replace(/^---\s*[\r\n]+[\s\S]*?[\r\n]+---\s*[\r\n]*/, "");
}

module.exports = {
  title: "Pieter Samyn | Senior Software Engineer",
  description:
    "Pieter Samyn's professional splash page with engineering highlights, current focus, and contact links.",
  eyebrow: "About",
  proofline:
    "Senior Software Engineer at Transics (ZF) since 2020 | Cloud modernization | .NET & cloud speaker",
  skills: [".NET", "Cloud Native", "Terraform", "CI/CD", "Observability"],
  sections: {
    hero: md.render(readMarkdown("hero.md")),
    highlights: md.render(readMarkdown("highlights.md")),
    now: md.render(readMarkdown("now.md")),
  },
  elsewhere: [
    {
      label: "Previous website",
      text: "legacy.samyne.be",
      href: "https://legacy.samyne.be/",
      note:
        "A restored archive of my music show and festival photography work, kept online as a tribute to that chapter and the people behind it.",
    },
    // {
    //   label: "Blog",
    //   text: "Long-form engineering deep dives",
    //   note: "Coming soon",
    // },
  ],
  contacts: [
    {
      type: "email",
      label: "Email",
      text: "pieter@samyne.be",
      href: "mailto:pieter@samyne.be",
    },
    {
      type: "linkedin",
      label: "LinkedIn",
      text: "linkedin.com/in/samyne",
      href: "https://www.linkedin.com/in/samyne/",
    },
    {
      type: "github",
      label: "GitHub",
      text: "github.com/PhbsSmn",
      href: "https://github.com/PhbsSmn",
    },
    {
      type: "resume",
      label: "Resume",
      text: "Download resume",
      href: "downloads/cv-pieter-2026.pdf",
    },
    {
      type: "speaker",
      label: "Speaker profile",
      text: "sessionize.com/pieter-samyn",
      href: "https://sessionize.com/pieter-samyn",
    },
    {
      type: "languages",
      label: "Languages",
      text: "Dutch and English",
    },
  ],
};