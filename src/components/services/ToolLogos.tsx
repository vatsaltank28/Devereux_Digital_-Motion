import { toolsForService, type Tool } from "@/data/tools";
import { ServiceSection } from "./ServiceSection";

/** Near-black brand marks (OpenAI, TikTok, ElevenLabs…) follow the text colour so they read in both themes. */
function isDark(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 60;
}

export function ToolMark({ tool, size = 28 }: { tool: Tool; size?: number }) {
  const color = isDark(tool.hex) ? "currentColor" : tool.hex;
  if (tool.d) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill={color} aria-hidden="true">
        <path d={tool.d} />
      </svg>
    );
  }
  return <span aria-hidden="true" className="tool-glyph" style={{ color }}>{tool.text}</span>;
}

/** Software and platforms used for a service: official brand marks in a compact grid. */
export function ToolLogos({ slug }: { slug: string }) {
  const tools = toolsForService(slug);
  if (tools.length === 0) return null;
  return (
    <ServiceSection id="tools" label="Toolkit" title="Platforms we work with">
      <ul className="tool-grid">
        {tools.map((t) => (
          <li key={t.name} className="tool-item">
            <span className="tool-tile"><ToolMark tool={t} /></span>
            <span className="tool-name">{t.name}</span>
          </li>
        ))}
      </ul>
    </ServiceSection>
  );
}
