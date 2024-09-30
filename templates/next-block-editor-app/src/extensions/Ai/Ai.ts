import { Extension } from '@tiptap/core'
import { streamOpenAIResponse } from './openAi'

export const AI = Extension.create({
    name: 'ai',

    addCommands() {
        return {
            aiSimplify: () => ({ state, editor }) => {
                const { selection } = state;
                const selectedText = state.doc.textBetween(selection.from, selection.to); // Get the selected text
                let insertPosition = selection.from; // Initialize insertion point

                const prompt = 'Simplify the following text: ' + selectedText; // Construct the prompt for AI

                // Stream the response and insert chunks progressively
                streamOpenAIResponse(prompt, (streamedText) => {
                    editor.commands.deleteSelection();
                    editor.commands.insertContentAt(insertPosition, streamedText);
                    insertPosition += streamedText.length;
                }).catch((error) => {
                    console.error('Error during streaming:', error);
                });

                return true;
            },

            aiEmojify: () => ({ state, editor }) => {
                const { selection } = state;
                const selectedText = state.doc.textBetween(selection.from, selection.to); // Get the selected text
                let insertPosition = selection.from; // Initialize insertion point

                const prompt = 'Convert the following text into emoji form: ' + selectedText; // Construct the prompt for AI

                // Stream the response and insert chunks progressively
                streamOpenAIResponse(prompt, (streamedText) => {
                    editor.commands.deleteSelection();
                    editor.commands.insertContentAt(insertPosition, streamedText);
                    insertPosition += streamedText.length;
                }).catch((error) => {
                    console.error('Error during streaming:', error);
                });

                return true;
            },

            aiComplete: () => ({ state, editor }) => {
                const { selection } = state;
                const selectedText = state.doc.textBetween(selection.from, selection.to); // Get the selected text
                let insertPosition = selection.from; // Initialize insertion point

                const prompt = 'Complete the following text: ' + selectedText; // Construct the prompt for AI

                // Stream the response and insert chunks progressively
                streamOpenAIResponse(prompt, (streamedText) => {
                    //editor.commands.deleteSelection();
                    editor.commands.insertContentAt(insertPosition, streamedText);
                    insertPosition += streamedText.length;
                }).catch((error) => {
                    console.error('Error during streaming:', error);
                });

                return true;
            },

            aiFixSpellingAndGrammar: () => ({ state, editor }) => {
                const { selection } = state;
                const selectedText = state.doc.textBetween(selection.from, selection.to); // Get the selected text
                let insertPosition = selection.from; // Initialize insertion point

                const prompt = 'Fix the spelling and grammar of the following text: ' + selectedText; // Construct the prompt for AI

                // Stream the response and insert chunks progressively
                streamOpenAIResponse(prompt, (streamedText) => {
                    editor.commands.deleteSelection();
                    editor.commands.insertContentAt(insertPosition, streamedText);
                    insertPosition += streamedText.length;
                }).catch((error) => {
                    console.error('Error during streaming:', error);
                });

                return true;
            },

            aiExtend: () => ({ state, editor }) => {
                const { selection } = state;
                const selectedText = state.doc.textBetween(selection.from, selection.to); // Get the selected text
                let insertPosition = selection.from; // Initialize insertion point

                const prompt = 'Extend the following text: ' + selectedText; // Construct the prompt for AI

                // Stream the response and insert chunks progressively
                streamOpenAIResponse(prompt, (streamedText) => {
                    editor.commands.deleteSelection();
                    editor.commands.insertContentAt(insertPosition, streamedText);
                    insertPosition += streamedText.length;
                }).catch((error) => {
                    console.error('Error during streaming:', error);
                });

                return true;
            },

            aiShorten: () => ({ state, editor }) => {
                const { selection } = state;
                const selectedText = state.doc.textBetween(selection.from, selection.to); // Get the selected text
                let insertPosition = selection.from; // Initialize insertion point

                const prompt = 'Shorten the following text: ' + selectedText; // Construct the prompt for AI

                // Stream the response and insert chunks progressively
                streamOpenAIResponse(prompt, (streamedText) => {
                    editor.commands.deleteSelection();
                    editor.commands.insertContentAt(insertPosition, streamedText);
                    insertPosition += streamedText.length;
                }).catch((error) => {
                    console.error('Error during streaming:', error);
                });

                return true;
            },

            aiTldr: () => ({ state, editor }) => {
                const { selection } = state;
                const selectedText = state.doc.textBetween(selection.from, selection.to); // Get the selected text
                let insertPosition = selection.from; // Initialize insertion point

                const prompt = 'Summarize the following text as a TL;DR: ' + selectedText; // Construct the prompt for AI

                // Stream the response and insert chunks progressively
                streamOpenAIResponse(prompt, (streamedText) => {
                    editor.commands.deleteSelection();
                    editor.commands.insertContentAt(insertPosition, streamedText);
                    insertPosition += streamedText.length;
                }).catch((error) => {
                    console.error('Error during streaming:', error);
                });

                return true;
            },

            aiAdjustTone: (tone: string) => ({ state, editor }) => {
                const { selection } = state;
                const selectedText = state.doc.textBetween(selection.from, selection.to); // Get the selected text
                let insertPosition = selection.from; // Initialize insertion point

                const prompt = `Adjust the tone of the following text to ${tone}: ` + selectedText; // Construct the prompt for AI

                // Stream the response and insert chunks progressively
                streamOpenAIResponse(prompt, (streamedText) => {
                    editor.commands.deleteSelection();
                    editor.commands.insertContentAt(insertPosition, streamedText);
                    insertPosition += streamedText.length;
                }).catch((error) => {
                    console.error('Error during streaming:', error);
                });

                return true;
            },

            aiTranslate: (language: string) => ({ state, editor }) => {
                const { selection } = state;
                const selectedText = state.doc.textBetween(selection.from, selection.to); // Get the selected text
                let insertPosition = selection.from; // Initialize insertion point

                const prompt = `Translate the following text to ${language}: ` + selectedText; // Construct the prompt for AI

                // Stream the response and insert chunks progressively
                streamOpenAIResponse(prompt, (streamedText) => {
                    editor.commands.deleteSelection();
                    editor.commands.insertContentAt(insertPosition, streamedText);
                    insertPosition += streamedText.length;
                }).catch((error) => {
                    console.error('Error during streaming:', error);
                });

                return true;
            },
        };
    },
});
