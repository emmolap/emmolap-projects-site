import { useState } from "react";
import { Box, Flex, IconButton, Text, Textarea } from "@chakra-ui/react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Note } from "../types/note";

interface NoteCardProps {
  note: Note;
  startEditing?: boolean;
  onChange: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, startEditing = false, onChange, onDelete }: NoteCardProps) {
  const [editing, setEditing] = useState(startEditing || note.text === "");

  return (
    <Flex
      direction="column"
      bg="white"
      h="400px"
      boxShadow="0 0 10px 4px rgba(0, 0, 0, 0.1)"
      overflow="hidden"
    >
      <Flex bg="#9ec862" justify="space-between" align="center" px={3} py={1}>
        <Text color="white" fontSize="xs">
          {new Date(note.updatedAt).toLocaleDateString()}
        </Text>
        <Flex gap={1}>
          <IconButton
            aria-label={editing ? "Preview note" : "Edit note"}
            variant="ghost"
            size="sm"
            color="white"
            _hover={{ bg: "whiteAlpha.300" }}
            onClick={() => setEditing((prev) => !prev)}
          >
            {editing ? <Eye size={16} /> : <Pencil size={16} />}
          </IconButton>
          <IconButton
            aria-label="Delete note"
            variant="ghost"
            size="sm"
            color="white"
            _hover={{ bg: "whiteAlpha.300" }}
            onClick={() => onDelete(note.id)}
          >
            <Trash2 size={16} />
          </IconButton>
        </Flex>
      </Flex>

      {editing ? (
        <Textarea
          value={note.text}
          onChange={(e) => onChange(note.id, e.target.value)}
          placeholder="Write your note... Markdown is supported."
          flex="1"
          resize="none"
          border="none"
          borderRadius="0"
          fontSize="lg"
          p={4}
          _focusVisible={{ outline: "none", boxShadow: "none" }}
          autoFocus
        />
      ) : (
        <Box
          flex="1"
          overflow="auto"
          bg="#eee"
          p={4}
          css={{
            "& h1, & h2, & h3": { fontWeight: 600, margin: "0.5rem 0" },
            "& h1": { fontSize: "1.5rem" },
            "& h2": { fontSize: "1.25rem" },
            "& p": { margin: "0.5rem 0" },
            "& ul, & ol": { paddingLeft: "1.5rem", margin: "0.5rem 0" },
            "& code": { background: "#ddd", padding: "0 4px", borderRadius: "3px" },
            "& a": { color: "#2b6cb0", textDecoration: "underline" },
          }}
        >
          <ReactMarkdown>{note.text || "*Empty note*"}</ReactMarkdown>
        </Box>
      )}
    </Flex>
  );
}
