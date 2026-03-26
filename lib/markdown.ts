export function markdownToHtml(md: string): string {
  return md
    // Headings
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mt-6 mb-5">$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline links
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-emerald-600 hover:underline font-medium">$1</a>')
    // Unordered list items — collect into ul
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-gray-600 leading-relaxed list-disc">$1</li>')
    // Numbered list items
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-gray-600 leading-relaxed list-decimal">$1</li>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200" />')
    // Paragraphs (blank-line separated)
    .split(/\n\n+/)
    .map((block) => {
      if (block.startsWith('<h') || block.startsWith('<li') || block.startsWith('<hr')) return block;
      return `<p class="text-[15px] text-gray-600 leading-relaxed mb-4">${block.replace(/\n/g, ' ')}</p>`;
    })
    .join('\n');
}
