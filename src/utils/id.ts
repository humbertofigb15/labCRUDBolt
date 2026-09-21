export function generateUserId(existingIds: string[]): string {
  const numbers = existingIds
    .map((id) => {
      const match = id.match(/USR-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    })
    .filter((n) => !isNaN(n));

  const max = numbers.length > 0 ? Math.max(...numbers) : 0;
  return `USR-${String(max + 1).padStart(3, "0")}`;
}
