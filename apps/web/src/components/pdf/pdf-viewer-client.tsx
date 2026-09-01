"use client";

import {
	ChevronLeft,
	ChevronRight,
	Maximize2,
	Minimize2,
	Minus,
	Plus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
	src: string;
}

export default function PdfViewer({ src }: PdfViewerProps) {
	const viewerRef = useRef<HTMLElement>(null);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [numPages, setNumPages] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
	const [zoom, setZoom] = useState(1);
	const [viewerWidth, setViewerWidth] = useState(0);

	useEffect(() => {
		const viewer = viewerRef.current;
		if (!viewer) return;

		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (!entry) return;
			setViewerWidth(Math.floor(entry.contentRect.width));
		});
		resizeObserver.observe(viewer);

		return () => resizeObserver.disconnect();
	}, []);

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(document.fullscreenElement === viewerRef.current);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);

		return () => {
			document.removeEventListener("fullscreenchange", handleFullscreenChange);
		};
	}, []);

	const toggleFullscreen = async () => {
		try {
			if (!document.fullscreenElement) {
				await viewerRef.current?.requestFullscreen();
			} else {
				await document.exitFullscreen();
			}
		} catch (error) {
			console.error("Failed to toggle fullscreen:", error);
		}
	};

	const pageWidth = Math.max(280, (viewerWidth - 32) * zoom);

	return (
		<section
			className={`flex min-w-0 flex-col overflow-hidden bg-muted/30 shadow-sm ${
				isFullscreen
					? "h-screen w-screen rounded-none border-0"
					: "rounded-xl border"
			}`}
			ref={viewerRef}
		>
			<div className="flex flex-wrap items-center justify-between gap-3 border-b bg-background px-3 py-2">
				<div className="flex items-center gap-1">
					<button
						aria-label="Previous page"
						className="inline-flex size-8 items-center justify-center rounded-md border text-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
						disabled={pageNumber <= 1}
						onClick={() => setPageNumber((page) => Math.max(1, page - 1))}
						type="button"
					>
						<ChevronLeft className="size-4" />
					</button>
					<span className="min-w-20 text-center text-muted-foreground text-sm tabular-nums">
						{numPages ? `${pageNumber} / ${numPages}` : "- / -"}
					</span>
					<button
						aria-label="Next page"
						className="inline-flex size-8 items-center justify-center rounded-md border text-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
						disabled={!numPages || pageNumber >= numPages}
						onClick={() =>
							setPageNumber((page) => Math.min(numPages, page + 1))
						}
						type="button"
					>
						<ChevronRight className="size-4" />
					</button>
				</div>

				<div className="flex items-center gap-2">
					<button
						aria-label="Zoom out"
						className="inline-flex size-8 items-center justify-center rounded-md border text-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
						disabled={zoom <= 0.75}
						onClick={() => setZoom((value) => Math.max(0.75, value - 0.25))}
						type="button"
					>
						<Minus className="size-4" />
					</button>

					<span className="min-w-14 text-center text-muted-foreground text-sm tabular-nums">
						{Math.round(zoom * 100)}%
					</span>

					<button
						aria-label="Zoom in"
						className="inline-flex size-8 items-center justify-center rounded-md border text-sm transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
						disabled={zoom >= 2}
						onClick={() => setZoom((value) => Math.min(2, value + 0.25))}
						type="button"
					>
						<Plus className="size-4" />
					</button>

					<button
						aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
						className="inline-flex size-8 items-center justify-center rounded-md border text-sm transition-colors hover:bg-muted"
						onClick={toggleFullscreen}
						type="button"
					>
						{isFullscreen ? (
							<Minimize2 className="size-4" />
						) : (
							<Maximize2 className="size-4" />
						)}
					</button>
				</div>
			</div>

			<div
				className={`min-h-96 flex-1 overflow-auto p-4 ${
					isFullscreen ? "min-h-0" : "max-h-[70vh]"
				}`}
			>
				<div className="flex min-w-full justify-center">
					<Document
						file={src}
						onLoadSuccess={({ numPages: loadedPages }) => {
							setNumPages(loadedPages);
							setPageNumber((page) => Math.min(page, loadedPages));
						}}
					>
						<div className="pointer-events-none select-none overflow-hidden rounded-sm border bg-white shadow-md">
							<Page
								pageNumber={pageNumber}
								renderAnnotationLayer={false}
								renderTextLayer={false}
								width={pageWidth}
							/>
						</div>
					</Document>
				</div>
			</div>
		</section>
	);
}
