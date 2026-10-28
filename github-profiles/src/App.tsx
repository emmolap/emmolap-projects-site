import { useState } from "react";
import SearchForm from "@/components/SearchForm";
import ProfileCard from "@/components/ProfileCard";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import { useGithubUser } from "@/hooks/useGithubUser";

export default function App() {
  const [username, setUsername] = useState("facebook");
  const { user, repos, loading, error } = useGithubUser(username);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <SearchForm onSearch={setUsername} />

      {loading && <ProfileSkeleton />}

      {!loading && error && (
        <p role="alert" className="rounded-md bg-card px-4 py-3 text-destructive">
          {error}
        </p>
      )}

      {!loading && !error && user && <ProfileCard user={user} repos={repos} />}
    </main>
  );
}
