"use client";

import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("./pdf-viewer-client"), {
	ssr: false,
});

export default PdfViewer;
