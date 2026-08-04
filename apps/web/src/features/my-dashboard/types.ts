import type { RouterOutputs } from "~/trpc/react";

export type PURCHASED_NOTE_TYPE =
	RouterOutputs["notesPurchases"]["getAllPurchasesByUser"][number];

export type PURCHASED_PYQ_TYPE =
	RouterOutputs["pyqPurchases"]["getAllPurchasesByUser"][number];

export type USER_STATS_TYPE = RouterOutputs["auth"]["getStatsByUser"];
