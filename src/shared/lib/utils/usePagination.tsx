export type PaginationItem = number | "...";

export function getPagination(current: number, total: number, delta = 1): PaginationItem[] {
    if (total <= 1) return [1];
    if (total <= 7) {
        return Array.from({ length: total }, (_, index) => index + 1);
    }

    const pages: PaginationItem[] = [1];
    const sideCount = Math.max(1, delta);
    const edgeWindow = 5;
    const stableEdgeUntil = 4;

    let start = Math.max(2, current - sideCount);
    let end = Math.min(total - 1, current + sideCount);

    // Keep the same right-side window for pages 1..4.
    if (current <= stableEdgeUntil) {
        start = 2;
        end = Math.min(total - 1, 1 + edgeWindow);
    }

    // Symmetric behavior on the last pages.
    if (current >= total - (stableEdgeUntil - 1)) {
        start = Math.max(2, total - edgeWindow);
        end = total - 1;
    }

    if (start > 2) pages.push("...");

    for (let page = start; page <= end; page++) {
        pages.push(page);
    }

    if (end < total - 1) pages.push("...");

    pages.push(total);

    return pages;
}
