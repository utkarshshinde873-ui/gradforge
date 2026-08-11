/**
 * Smart Title Case Formatter:
 * Converts raw string into clean Title Case (e.g. "software engineer" -> "Software Engineer").
 * Preserves uppercase acronyms like "AWS", "UI/UX", "JS", "C++", "API", "GPA", "MH", "SQL", "HTML", "CSS".
 */
export function formatTitleCase(str: string): string {
  if (!str || typeof str !== "string") return str || "";

  const acronyms = new Set([
    "AWS", "UI", "UX", "API", "REST", "SQL", "JS", "TS", "CSS", "HTML",
    "PHP", "SEO", "ATS", "AI", "ML", "GPU", "CPU", "MH", "CA", "NY",
    "USA", "UK", "BS", "MS", "BA", "MA", "PHD", "GPA", "AWS/GCP", "GCP", "IT"
  ]);

  return str
    .split(/(\s+)/)
    .map(chunk => {
      if (!chunk.trim()) return chunk;

      // Handle slash-separated acronyms e.g. "UI/UX"
      if (chunk.includes("/")) {
        return chunk
          .split("/")
          .map(part => {
            const upper = part.toUpperCase();
            if (acronyms.has(upper)) return upper;
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          })
          .join("/");
      }

      // Handle hyphenated words e.g. "full-stack" -> "Full-Stack"
      if (chunk.includes("-")) {
        return chunk
          .split("-")
          .map(part => {
            if (!part) return "";
            const upper = part.toUpperCase();
            if (acronyms.has(upper)) return upper;
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          })
          .join("-");
      }

      const cleanStr = chunk.replace(/[^a-zA-Z0-9#+]/g, "");
      const upperClean = cleanStr.toUpperCase();

      if (acronyms.has(upperClean)) {
        return chunk.replace(cleanStr, upperClean);
      }

      // Preserve special programming symbols like "C++", "C#"
      if (upperClean === "C++" || upperClean === "C#") {
        return upperClean;
      }

      return chunk.charAt(0).toUpperCase() + chunk.slice(1).toLowerCase();
    })
    .join("");
}

/**
 * Smart Sentence Case Formatter:
 * Capitalizes the first letter of sentences and bullet points in summaries & descriptions.
 */
export function formatSentenceCase(str: string): string {
  if (!str || typeof str !== "string") return str || "";

  return str
    .split("\n")
    .map(line => {
      if (!line.trim()) return line;

      const trimmed = line.trimStart();
      const leadingSpace = line.slice(0, line.length - trimmed.length);

      // Handle bullet lists like "- ", "• ", "1. "
      const bulletMatch = trimmed.match(/^([•\-\*\d+\.]\s*)(.*)/);
      if (bulletMatch) {
        const marker = bulletMatch[1];
        const content = bulletMatch[2];
        if (content) {
          const formattedContent = content.charAt(0).toUpperCase() + content.slice(1);
          return leadingSpace + marker + formattedContent;
        }
      }

      // Capitalize first character of sentence
      return leadingSpace + trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
    })
    .join("\n");
}
