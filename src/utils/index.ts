/** Formats seconds into "Xh Ymin" */
export function formatDuration(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours === 0) return `${minutes}min`;
    return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
}

/** Formats a price in BRL. 0 = "Grátis" */
export function formatPrice(price: number): string {
    if (price === 0) return "Grátis";
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(price);
}

/** Truncates a string to maxLength characters */
export function truncate(str: string, maxLength: number): string {
    return str.length <= maxLength ? str : str.slice(0, maxLength - 3) + "...";
}

/** Returns star rating display */
export function starsFromRating(rating: number): string {
    const full = Math.round(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
}

/** Converts a title to a URL-friendly slug */
export function slugify(title: string): string {
    return title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}