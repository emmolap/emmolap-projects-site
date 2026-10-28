import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Input,
  Portal,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import NoteCard from "./components/NoteCard";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Note } from "./types/note";

export default function App() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes-app:v1", []);
  const [search, setSearch] = useState("");
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [newNoteId, setNewNoteId] = useState<string | null>(null);

  const visibleNotes = useMemo(() => {
    const term = search.trim().toLowerCase();
    return notes
      .filter((note) => note.text.toLowerCase().includes(term))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes, search]);

  function addNote() {
    const note: Note = { id: crypto.randomUUID(), text: "", updatedAt: Date.now() };
    setNotes((prev) => [note, ...prev]);
    setNewNoteId(note.id);
    setSearch("");
  }

  function updateNote(id: string, text: string) {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, text, updatedAt: Date.now() } : note))
    );
  }

  function confirmDelete() {
    if (noteToDelete) {
      setNotes((prev) => prev.filter((note) => note.id !== noteToDelete));
    }
    setNoteToDelete(null);
  }

  return (
    <Box minH="100vh" bg="#7bdaf3" fontFamily="'Poppins', sans-serif" p={{ base: 4, md: 8 }}>
      <Flex
        justify="space-between"
        align="center"
        gap={4}
        wrap="wrap"
        mb={8}
      >
        <Heading size="2xl" color="gray.800">
          Notes
        </Heading>
        <Flex gap={3} flex={{ base: "1 1 100%", md: "0 1 auto" }}>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes"
            aria-label="Search notes"
            bg="white"
            color="gray.800"
            minW={{ md: "260px" }}
          />
          <Button bg="#9ec862" color="white" _hover={{ bg: "#8bb552" }} onClick={addNote}>
            <Plus size={16} /> Add note
          </Button>
        </Flex>
      </Flex>

      {visibleNotes.length === 0 ? (
        <Text color="gray.700" textAlign="center" mt={16}>
          {notes.length === 0
            ? "No notes yet. Click \"Add note\" to create your first one."
            : "No notes match your search."}
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
          {visibleNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              startEditing={note.id === newNoteId}
              onChange={updateNote}
              onDelete={setNoteToDelete}
            />
          ))}
        </SimpleGrid>
      )}

      <Dialog.Root
        role="alertdialog"
        open={noteToDelete !== null}
        onOpenChange={(e) => {
          if (!e.open) setNoteToDelete(null);
        }}
        lazyMount
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete this note?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text>This can't be undone.</Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button colorPalette="red" onClick={confirmDelete}>
                  Delete
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}
