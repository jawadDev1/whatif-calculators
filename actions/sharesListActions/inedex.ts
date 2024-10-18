'use server';

import { searchShares } from "@/services/sharelistServices";

export const SEARCH_SHARES = async (query: string) => {
    const res = await searchShares(query);

    return await res.json();
}