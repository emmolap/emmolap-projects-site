import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchFormProps {
  onSearch: (username: string) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const username = value.trim();
    if (!username) return;
    onSearch(username);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex w-full max-w-md gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search a GitHub user"
        aria-label="GitHub username"
      />
      <Button type="submit" size="icon" aria-label="Search">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
