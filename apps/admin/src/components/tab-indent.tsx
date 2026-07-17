import { Extension } from "@tiptap/core";

const TabIndent = Extension.create({
	name: "tabIndent",

	addKeyboardShortcuts() {
		return {
			Tab: () => {
				// If inside a list, let the default list-indent behavior (sinkListItem) handle it
				if (
					this.editor.isActive("listItem") ||
					this.editor.isActive("bulletList") ||
					this.editor.isActive("orderedList")
				) {
					return false; // fall through to StarterKit's list Tab handler
				}
				// Otherwise insert an indent
				return this.editor.commands.insertContent("\u00A0\u00A0\u00A0\u00A0"); // 4 non-breaking spaces
			},
			"Shift-Tab": () => {
				if (
					this.editor.isActive("listItem") ||
					this.editor.isActive("bulletList") ||
					this.editor.isActive("orderedList")
				) {
					return false;
				}
				return true; // just prevent default (no-op) outside lists
			},
		};
	},
});

export default TabIndent;
