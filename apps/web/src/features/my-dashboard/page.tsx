"use client";

import { FileText, ScrollText } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import NotesPurchaseCard from "./_components/notes-purchase-card";
import PyqPurchaseCard from "./_components/pyq-purchases-card";
import TopStats from "./_components/top-stats";
import {
	useGetAllNotesPurchased,
	useGetAllPyqsPurchased,
	useUserStats,
} from "./api";

const MyDashboardPage = () => {
	const [activeTab, setActiveTab] = useState<"notes" | "pyq">("notes");
	const { data: userStats, isLoading: isUserStatsLoading } = useUserStats();

	const { data: notesData = [], isLoading: isNotesLoading } =
		useGetAllNotesPurchased({
			enabled: activeTab === "notes",
		});

	const { data: pyqsData = [], isLoading: isPyqsLoading } =
		useGetAllPyqsPurchased({
			enabled: activeTab === "pyq",
		});

	return (
		<div className="flex flex-col gap-6">
			<TopStats isLoading={isUserStatsLoading} userStats={userStats} />

			<Tabs onValueChange={setActiveTab} value={activeTab}>
				<TabsList className="bg-[#F0EDE3]">
					<TabsTrigger className="gap-1.5" value="notes">
						<FileText className="h-3.5 w-3.5" />
						Notes
						{/* <span className="ml-1 rounded-full bg-[#1E2A4A]/10 px-1.5 text-xs">
							{notes.length}
						</span> */}
					</TabsTrigger>
					<TabsTrigger className="gap-1.5" value="pyq">
						<ScrollText className="h-3.5 w-3.5" />
						PYQs
						{/* <span className="ml-1 rounded-full bg-[#1E2A4A]/10 px-1.5 text-xs">
							{pyqs.length}
						</span> */}
					</TabsTrigger>
				</TabsList>

				<TabsContent className="mt-4 flex flex-col gap-3" value="notes">
					{isNotesLoading ? (
						<div className="flex h-32 items-center justify-center text-[#6B6455] text-sm">
							Loading...
						</div>
					) : notesData.length ? (
						notesData.map((data) => (
							<NotesPurchaseCard key={data.id} purchase={data} />
						))
					) : (
						<div className="flex h-32 items-center justify-center text-[#6B6455] text-sm">
							No notes purchased yet.
						</div>
					)}
				</TabsContent>

				<TabsContent className="mt-4 flex flex-col gap-3" value="pyq">
					{isPyqsLoading ? (
						<div className="flex h-32 items-center justify-center text-[#6B6455] text-sm">
							Loading...
						</div>
					) : pyqsData.length ? (
						pyqsData.map((data) => (
							<PyqPurchaseCard key={data.id} purchase={data} />
						))
					) : (
						<div className="flex h-32 items-center justify-center text-[#6B6455] text-sm">
							No PYQs purchased yet.
						</div>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default MyDashboardPage;
