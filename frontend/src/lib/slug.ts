// Helpers for readable URLs like /exercises/1-flat-bench-press
// The id stays at the front so lookups still go by id: names can change or repeat, ids can't.

// "Flat Bench Press " -> "flat-bench-press"
export function slugify(text: string): string {
    return text
        .normalize("NFKD")                 // split accented letters: "é" -> "e" + accent mark
        .replace(/[̀-ͯ]/g, "")   // drop the accent marks
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")       // anything that isn't a letter/number becomes "-"
        .replace(/^-+|-+$/g, "");          // trim leading/trailing "-"
}

// (1, "Flat Bench Press") -> "1-flat-bench-press"
export function toSlug(id: number, name: string): string {
    const nameSlug = slugify(name);
    return nameSlug ? `${id}-${nameSlug}` : String(id);
}

// "1-flat-bench-press" -> 1, and plain "1" -> 1 so old id-only links keep working
export function idFromSlug(slug: string | undefined): number {
    return parseInt(slug ?? "", 10);   // reads the leading number and ignores the rest; NaN if there isn't one
}
